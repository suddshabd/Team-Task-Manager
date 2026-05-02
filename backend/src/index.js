

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect } from './database/db.js';
import initializeDatabase from './database/migrate.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

/**
 * ✅ SIMPLE + RELIABLE CORS (DEV SAFE)
 */
app.use(cors({
    origin: true,          // allow any origin (dev)
    credentials: true
}));

app.options('*', cors());

/**
 * ✅ BODY PARSER
 */
app.use(express.json());

/**
 * ✅ BASIC REQUEST LOGGER (optional)
 */
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

/**
 * ✅ ROUTES
 */
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

/**
 * ✅ HEALTH CHECK
 */
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

/**
 * ✅ ERROR HANDLER
 */
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message || 'Internal server error' });
});

/**
 * ✅ START SERVER
 */
const startServer = async () => {
    try {
        await connect();
        await initializeDatabase();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();

export default app;