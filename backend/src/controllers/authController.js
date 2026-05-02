import User from '../models/User.js';
import {
    hashPassword,
    comparePassword,
    generateToken,
} from '../utils/auth.js';
import {
    validateEmail,
    validatePassword,
    formatUser,
} from '../utils/helpers.js';

export const signup = async (req, res) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;

        if (process.env.DEBUG_HTTP === 'true') {
            console.log('[AuthController] signup payload received:', {
                username,
                email,
                firstName,
                lastName,
                hasPassword: Boolean(password),
            });
        }

        if (!username || !email || !password || !firstName || !lastName) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                error: 'Password must be at least 8 characters with uppercase, lowercase, and number',
            });
        }

        const existingUser = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username },
            ],
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email or username already exists' });
        }

        const passwordHash = await hashPassword(password);
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            passwordHash,
            firstName,
            lastName,
            role: 'member',
        });

        const token = generateToken(user);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: formatUser(user),
                token,
            },
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (process.env.DEBUG_HTTP === 'true') {
            console.log('[AuthController] login payload received:', {
                email,
                hasPassword: Boolean(password),
            });
        }

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await comparePassword(password, user.passwordHash);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: formatUser(user),
                token,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            success: true,
            data: formatUser(user),
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
