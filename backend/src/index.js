

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { connect } from './database/db.js';
// import initializeDatabase from './database/migrate.js';
// import authRoutes from './routes/authRoutes.js';
// import projectRoutes from './routes/projectRoutes.js';
// import taskRoutes from './routes/taskRoutes.js';

// dotenv.config();

// const PORT = process.env.PORT || 5001;

// const app = express();

// /**
//  * ✅ SIMPLE + RELIABLE CORS (DEV SAFE)
//  */
// app.use(cors({
//     origin: true,          // allow any origin (dev)
//     credentials: true
// }));

// app.options('*', cors());

// /**
//  * ✅ BODY PARSER
//  */
// app.use(express.json());

// /**
//  * ✅ BASIC REQUEST LOGGER (optional)
//  */
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// });

// /**
//  * ✅ ROUTES
//  */
// app.use('/api/auth', authRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/tasks', taskRoutes);

// /**
//  * ✅ HEALTH CHECK
//  */
// app.get('/api/health', (req, res) => {
//     res.status(200).json({ status: 'OK' });
// });

// /**
//  * ✅ ERROR HANDLER
//  */
// app.use((err, req, res, next) => {
//     console.error('Error:', err.message);
//     res.status(500).json({ error: err.message || 'Internal server error' });
// });

// /**
//  * ✅ START SERVER
//  */
// const startServer = async () => {
//     try {
//         await connect();
//         await initializeDatabase();

//         app.listen(PORT, () => {
//             console.log(`🚀 Server running on http://localhost:${PORT}`);
//         });

//     } catch (error) {
//         console.error('❌ Failed to start server:', error.message);
//         process.exit(1);
//     }
// };

// startServer();

// export default app;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import { connect } from './database/db.js';
import initializeDatabase from './database/migrate.js';

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

/**
 * ✅ FIX FOR __dirname (ES MODULE)
 */
const __dirname = path.resolve();

/**
 * ✅ CORS (Production + Dev)
 */
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://team-task-manager-lz7q.onrender.com"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.options('*', cors());

/**
 * ✅ BODY PARSER
 */
app.use(express.json());

/**
 * ✅ LOGGER
 */
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

/**
 * ✅ API ROUTES
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
 * ✅ 🔥 SERVE FRONTEND (VERY IMPORTANT)
 * This MUST come AFTER API routes
 */
app.use(express.static(path.join(__dirname, "../frontend/dist")));

/**
 * ✅ CATCH-ALL (React Router Support)
 */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
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
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();

export default app;