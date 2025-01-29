// backend/routes/courses.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Course = require('../models/Course');

// Get all courses (публичный маршрут)
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user's enrolled courses (защищенный маршрут)
router.get('/my-courses', auth, async (req, res) => {
    try {
        const courses = await Course.find({
            enrolledStudents: req.user.id
        });
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Enroll in a course (защищенный маршрут)
router.post('/enroll/:courseId', auth, async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if user is already enrolled
        if (course.enrolledStudents.includes(req.user.id)) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        course.enrolledStudents.push(req.user.id);
        await course.save();

        res.json({ message: 'Successfully enrolled in course' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;