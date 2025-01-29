// backend/scripts/seedCourses.js
const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('../models/Course');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/learning_platform'; // Убедитесь, что URI правильный

const coursesData = [
    {
        title: 'JavaScript Fundamentals',
        description: 'Learn the core concepts of JavaScript programming',
        instructor: 'John Smith',
        price: 79.99,
        duration: '6 weeks',
        level: 'Beginner',
        image: '/api/placeholder/400/300'
    },
    {
        title: 'React Advanced',
        description: 'Master React hooks, context, and advanced patterns',
        instructor: 'Sarah Johnson',
        price: 99.99,
        duration: '8 weeks',
        level: 'Advanced',
        image: '/api/placeholder/400/300'
    },
    {
        title: 'Web Design Basics',
        description: 'Learn fundamentals of web design and UX/UI',
        instructor: 'Michael Brown',
        price: 69.99,
        duration: '4 weeks',
        level: 'Beginner',
        image: '/api/placeholder/400/300'
    },
    {
        title: 'Node.js & Express',
        description: 'Build backend applications with Node.js and Express',
        instructor: 'David Wilson',
        price: 89.99,
        duration: '10 weeks',
        level: 'Intermediate',
        image: '/api/placeholder/400/300'
    },
    {
        title: 'MongoDB Mastery',
        description: 'Learn MongoDB database design and operations',
        instructor: 'Emma Davis',
        price: 79.99,
        duration: '6 weeks',
        level: 'Intermediate',
        image: '/api/placeholder/400/300'
    }
];

const seedCourses = async () => {
    try {
        // Подключение к базе данных
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Очистка существующих курсов
        await Course.deleteMany({});
        console.log('Cleared existing courses');

        // Добавление новых курсов
        const createdCourses = await Course.insertMany(coursesData);
        console.log(`Successfully inserted ${createdCourses.length} courses`);

        // Вывод добавленных курсов
        console.log('\nAdded courses:');
        createdCourses.forEach(course => {
            console.log(`- ${course.title} (${course.level})`);
        });

    } catch (error) {
        console.error('Error seeding courses:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

// Запуск скрипта
seedCourses();