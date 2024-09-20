// src/app.js
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import { DB_CONFIG, PORT } from './config.js';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

// Connect to MySQL
const initializeDatabase = async () => {
    try {
        const connection = await mysql.createConnection(DB_CONFIG);
        console.log('MySQL connected');
        app.set('dbConnection', connection);
    } catch (err) {
        console.error('Database connection failed:', err);
    }
};

// Initialize the database and start the server
initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
