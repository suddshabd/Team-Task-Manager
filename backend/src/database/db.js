import mongoose from 'mongoose';

export const connect = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        const dbName = process.env.MONGODB_DB_NAME;

        await mongoose.connect(mongoUri, {
            dbName,
        });
        console.log('✓ MongoDB connected successfully');
    } catch (error) {
        console.error('✗ MongoDB connection failed:', error);
        throw error;
    }
};

export default mongoose;
