import { Router } from 'express';
import {
    createProject,
    getProjects,
    getProjectById,
    addProjectMember,
    getProjectMembers,
} from '../controllers/projectController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/', authenticateToken, createProject);
router.get('/', authenticateToken, getProjects);
router.get('/:projectId', authenticateToken, getProjectById);
router.post('/:projectId/members', authenticateToken, addProjectMember);
router.get('/:projectId/members', authenticateToken, getProjectMembers);

export default router;
