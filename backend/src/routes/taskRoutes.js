import { Router } from 'express';
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getTaskStats,
} from '../controllers/taskController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/projects/:projectId/tasks', authenticateToken, createTask);
router.get('/projects/:projectId/tasks', authenticateToken, getTasks);
router.put('/:taskId', authenticateToken, updateTask);
router.delete('/:taskId', authenticateToken, deleteTask);
router.get('/projects/:projectId/stats', authenticateToken, getTaskStats);

export default router;
