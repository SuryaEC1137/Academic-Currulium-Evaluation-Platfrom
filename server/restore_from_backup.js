const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuration for restoration
const RESTORE_CONFIG = [
    {
        filename: 'student_analyzer.users.json',
        modelName: 'User',
        modelFile: './models/User'
    },
    {
        filename: 'student_analyzer.courses.json',
        modelName: 'Course',
        modelFile: './models/Course'
    },
    {
        filename: 'student_analyzer.courserequests.json',
        modelName: 'CourseRequest',
        modelFile: './models/CourseRequest'
    },
    {
        filename: 'student_analyzer.facultycourserequests.json',
        modelName: 'FacultyCourseRequest',
        modelFile: './models/FacultyCourseRequest'
    }
];

const transformData = (data) => {
    if (!Array.isArray(data)) return [];

    const recurseTransform = (obj) => {
        if (!obj || typeof obj !== 'object') return obj;

        if (Array.isArray(obj)) {
            return obj.map(recurseTransform);
        }

        // Handle MongoDB extended JSON formats
        if (obj.$oid) {
            return new mongoose.Types.ObjectId(obj.$oid);
        }
        if (obj.$date) {
            return new Date(obj.$date);
        }

        const transformed = {};
        Object.keys(obj).forEach(key => {
            // Remove __v
            if (key === '__v') return;
            transformed[key] = recurseTransform(obj[key]);
        });
        return transformed;
    };

    return data.map(item => recurseTransform(item));
};

const restore = async () => {
    try {
        console.log('Connecting to Cloud DB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB.');

        for (const config of RESTORE_CONFIG) {
            const filePath = path.join(__dirname, config.filename);

            if (fs.existsSync(filePath)) {
                console.log(`\nProcessing ${config.filename}...`);

                try {
                    const fileContent = fs.readFileSync(filePath, 'utf8');
                    const rawData = JSON.parse(fileContent);
                    const documents = transformData(rawData);

                    if (documents.length === 0) {
                        console.log(`Skipping ${config.filename}: No data found.`);
                        continue;
                    }

                    const Model = require(config.modelFile);

                    // Clear existing data?
                    console.log(`Clearing existing ${config.modelName} collection...`);
                    await Model.deleteMany({});

                    console.log(`Inserting ${documents.length} documents into ${config.modelName}...`);
                    await Model.insertMany(documents);

                    console.log(`Successfully restored ${config.modelName}.`);

                } catch (err) {
                    console.error(`Error processing ${config.filename}:`, err.message);
                }
            } else {
                console.log(`\nSkipping ${config.filename}: File not found.`);
            }
        }

        fs.writeFileSync(path.join(__dirname, 'restore_success.txt'), 'Restoration completed successfully at ' + new Date().toISOString());
        console.log('\nAll restoration tasks completed.');
        process.exit(0);

    } catch (error) {
        fs.writeFileSync(path.join(__dirname, 'restore_error.txt'), 'Restoration failed: ' + error.message);
        console.error('Global Restore Failed:', error);
        process.exit(1);
    }
};

restore();
