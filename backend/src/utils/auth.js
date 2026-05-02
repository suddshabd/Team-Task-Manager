import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET || 'your_secret_key', {
        expiresIn: process.env.JWT_EXPIRY || '7d',
    });
};

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};
