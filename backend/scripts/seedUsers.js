// backend/scripts/seedUsers.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const User = require('../models/User');

const USERS_TO_GENERATE = 100; // Количество пользователей для генерации

const generateUsers = async () => {
    try {
        // Подключение к базе данных
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Очистка существующих пользователей (опционально)
        // await User.deleteMany({});
        // console.log('Cleared existing users');

        const users = [];
        const salt = await bcrypt.genSalt(10);
        const defaultPassword = await bcrypt.hash('password123', salt);

        // Генерация пользователей
        for (let i = 0; i < USERS_TO_GENERATE; i++) {
            const firstName = faker.person.firstName();
            const lastName = faker.person.lastName();
            
            const user = {
                name: `${firstName} ${lastName}`,
                email: faker.internet.email({ firstName, lastName }),
                password: defaultPassword, // Используем одинаковый пароль для всех тестовых пользователей
                createdAt: faker.date.past(), // Случайная дата создания в прошлом
                updatedAt: faker.date.recent() // Недавняя дата обновления
            };
            
            users.push(user);
            
            // Логируем каждого 10-го пользователя для отслеживания прогресса
            if ((i + 1) % 10 === 0) {
                console.log(`Generated ${i + 1} users...`);
            }
        }

        // Вставка пользователей в базу данных
        const insertedUsers = await User.insertMany(users, { ordered: false });
        console.log(`Successfully inserted ${insertedUsers.length} users`);

        // Вывод примера созданных пользователей
        console.log('\nExample of created users:');
        const sampleUsers = await User.find().limit(5).select('-password');
        console.log(sampleUsers);

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Закрываем соединение с базой данных
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

// Запуск скрипта
generateUsers().then(() => {
    console.log('Seeding completed');
});