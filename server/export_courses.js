require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Course = require('./models/Course');

const exportCourses = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const courses = await Course.find({});
        console.log(`Found ${courses.length} courses`);

        fs.writeFileSync('./server/student_analyzer.courses.json', JSON.stringify(courses, null, 2));
        console.log('Exported to student_analyzer.courses.json');

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

exportCourses();
