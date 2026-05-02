import Project from '../models/Project.js';
import User from '../models/User.js';
import {
    formatProject,
    formatProjectMember,
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

const isProjectAdmin = (project, user) => {
    if (!project || !user) {
        return false;
    }

    if (user.role === 'admin') {
        return true;
    }

    if (project.createdBy.toString() === user.id) {
        return true;
    }

    return project.members.some(
        (member) => member.user.toString() === user.id && member.role === 'admin'
    );
};

export const createProject = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Project name is required' });
        }

        const project = await Project.create({
            name,
            description: description || '',
            createdBy: req.user.id,
            members: [
                {
                    user: req.user.id,
                    role: 'admin',
                },
            ],
        });

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: formatProject(project),
        });
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getProjects = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const query = req.user.role === 'admin'
            ? {}
            : {
                  $or: [
                      { createdBy: req.user.id },
                      { 'members.user': req.user.id },
                  ],
              };

        const projects = await Project.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: projects.map(formatProject),
        });
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getProjectById = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { projectId } = req.params;

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

        res.status(200).json({
            success: true,
            data: formatProject(project),
        });
    } catch (error) {
        console.error('Get project by ID error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const addProjectMember = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { projectId } = req.params;
        const { userId, role } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        if (!isValidObjectId(projectId) || !isValidObjectId(userId)) {
            return res.status(404).json({ error: 'Project or user not found' });
        }

        const [project, user] = await Promise.all([
            Project.findById(projectId),
            User.findById(userId),
        ]);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!isProjectAdmin(project, req.user)) {
            return res.status(403).json({ error: 'Only admins can add members' });
        }

        const existingMember = project.members.find(
            (member) => member.user.toString() === userId
        );

        if (existingMember) {
            existingMember.role = role || 'member';
        } else {
            project.members.push({
                user: userId,
                role: role || 'member',
            });
        }

        await project.save();

        const member = project.members.find(
            (entry) => entry.user.toString() === userId
        );

        res.status(201).json({
            success: true,
            message: 'Member added successfully',
            data: {
                project_id: project.id,
                user_id: user.id,
                role: member.role,
                joined_at: member.joinedAt,
            },
        });
    } catch (error) {
        console.error('Add project member error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getProjectMembers = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { projectId } = req.params;

        if (!isValidObjectId(projectId)) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const project = await Project.findById(projectId).populate('members.user');

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (!hasProjectAccess(project, req.user)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const members = project.members
            .filter((member) => member.user)
            .map(formatProjectMember)
            .sort((a, b) => new Date(b.joined_at) - new Date(a.joined_at));

        res.status(200).json({
            success: true,
            data: members,
        });
    } catch (error) {
        console.error('Get project members error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
