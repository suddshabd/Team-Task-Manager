import Project from '../models/Project.js';
import Task from '../models/Task.js';
import {
    formatTask,
    isValidObjectId,
} from '../utils/helpers.js';

const hasProjectAccess = (project, user) => {
    if (!project || !user) {
        return false;
    }

    if (user.role === 'admin') {
        return true;
    }

    if (project.createdBy.toString() === user.id) {
        return true;
    }

    return project.members.some((member) => member.user.toString() === user.id);
};

export const createTask = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { projectId } = req.params;
        const { title, description, priority, dueDate, assignedTo } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Task title is required' });
        }

        if (!isValidObjectId(projectId)) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (!hasProjectAccess(project, req.user)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const task = await Task.create({
            projectId,
            title,
            description: description || '',
            priority: priority || 'medium',
            assignedTo: assignedTo || null,
            createdBy: req.user.id,
            dueDate: dueDate || null,
            status: 'todo',
        });

        await task.populate(['assignedTo', 'createdBy']);

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: formatTask(task),
        });
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getTasks = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { projectId } = req.params;
        const { status, assignedTo } = req.query;

        if (!isValidObjectId(projectId)) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (!hasProjectAccess(project, req.user)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const filters = { projectId };

        if (status) {
            filters.status = status;
        }

        if (assignedTo && isValidObjectId(assignedTo)) {
            filters.assignedTo = assignedTo;
        }

        const tasks = await Task.find(filters)
            .populate('assignedTo', 'username')
            .populate('createdBy', 'username')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: tasks.map(formatTask),
        });
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateTask = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { taskId } = req.params;
        const { title, description, status, priority, assignedTo, dueDate } = req.body;

        if (!isValidObjectId(taskId)) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const project = await Project.findById(task.projectId);

        if (!project || !hasProjectAccess(project, req.user)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const updates = {};

        if (title !== undefined) updates.title = title;
        if (description !== undefined) updates.description = description;
        if (status !== undefined) updates.status = status;
        if (priority !== undefined) updates.priority = priority;
        if (assignedTo !== undefined) updates.assignedTo = assignedTo || null;
        if (dueDate !== undefined) updates.dueDate = dueDate || null;

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
            new: true,
            runValidators: true,
        })
            .populate('assignedTo', 'username')
            .populate('createdBy', 'username');

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: formatTask(updatedTask),
        });
    } catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteTask = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { taskId } = req.params;

        if (!isValidObjectId(taskId)) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const project = await Project.findById(task.projectId);

        if (!project || !hasProjectAccess(project, req.user)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        await Task.findByIdAndDelete(taskId);

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
        });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getTaskStats = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { projectId } = req.params;

        if (!isValidObjectId(projectId)) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const project = await Project.findById(projectId);

        if (!project || !hasProjectAccess(project, req.user)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const tasks = await Task.find({ projectId });
        const now = new Date();

        const stats = tasks.reduce(
            (acc, task) => {
                acc.total_tasks += 1;

                if (task.status === 'todo') acc.todo_tasks += 1;
                if (task.status === 'in_progress') acc.in_progress_tasks += 1;
                if (task.status === 'done') acc.done_tasks += 1;
                if (task.priority === 'high' && task.status !== 'done') acc.high_priority_tasks += 1;
                if (task.dueDate && task.status !== 'done' && task.dueDate < now) acc.overdue_tasks += 1;

                return acc;
            },
            {
                total_tasks: 0,
                todo_tasks: 0,
                in_progress_tasks: 0,
                done_tasks: 0,
                overdue_tasks: 0,
                high_priority_tasks: 0,
            }
        );

        res.status(200).json({
            success: true,
            data: stats,
        });
    } catch (error) {
        console.error('Get task stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
