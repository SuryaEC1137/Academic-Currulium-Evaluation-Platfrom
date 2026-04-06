const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const RESTORE_CONFIG = [
    { filename: 'pro_academic.admins.json', modelName: 'Admin', modelFile: './models/Admin' },
    { filename: 'pro_academic.announcements.json', modelName: 'Announcement', modelFile: './models/Announcement' },
    { filename: 'pro_academic.auditlogs.json', modelName: 'AuditLog', modelFile: './models/AuditLog' },
    { filename: 'pro_academic.courserequests.json', modelName: 'CourseRequest', modelFile: './models/CourseRequest' },
    { filename: 'pro_academic.courses.json', modelName: 'Course', modelFile: './models/Course' },
    { filename: 'pro_academic.feedbacks.json', modelName: 'Feedback', modelFile: './models/Feedback' },
    { filename: 'pro_academic.resources.json', modelName: 'Resource', modelFile: './models/Resource' },
    { filename: 'pro_academic.systemsettings.json', modelName: 'SystemSettings', modelFile: './models/SystemSettings' },
    { filename: 'pro_academic.users.json', modelName: 'User', modelFile: './models/User' }
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
            if (key === '__v') return;
            transformed[key] = recurseTransform(obj[key]);
        });
        return transformed;
    };

    return data.map(item => recurseTransform(item));
};

const pushDataToAtlas = async () => {
    try {
        console.log('Connecting to Atlas Cluster...');
        const uri = 'mongodb+srv://senthilsurya482_db_user:surya%405555@cluster.ir5niiq.mongodb.net/pro_academic?appName=Cluster';
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
        console.log('✅ Connected successfully to Atlas Cluster (pro_academic DB).');

        for (const config of RESTORE_CONFIG) {
            const filePath = path.join(__dirname, config.filename);
            if (fs.existsSync(filePath)) {
                console.log(`\nProcessing ${config.filename}...`);
                try {
                    const fileContent = fs.readFileSync(filePath, 'utf8');
                    const rawData = JSON.parse(fileContent);
                    const documents = transformData(rawData);

                    if (documents.length === 0) {
                        console.log(`- Skipping ${config.filename}: No data found.`);
                        continue;
                    }

                    const Model = require(config.modelFile);

                    console.log(`- Clearing existing ${config.modelName} collection...`);
                    await Model.deleteMany({});

                    console.log(`- Inserting ${documents.length} documents into ${config.modelName}...`);
                    await Model.insertMany(documents);

                    console.log(`- ✅ Successfully restored ${config.modelName}.`);
                } catch (err) {
                    console.error(`❌ Error processing ${config.filename}:`, err.message);
                }
            } else {
                console.log(`\n⚠️ Skipping ${config.filename}: File not found.`);
            }
        }

        console.log('\n✅ All data push tasks completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Fatal Error connecting/pushing to Atlas:', error);
        process.exit(1);
    }
};

pushDataToAtlas();
