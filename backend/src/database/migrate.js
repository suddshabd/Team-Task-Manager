import { fileURLToPath } from 'url';

const initializeDatabase = async () => {
    console.log('✓ MongoDB uses schema-on-write models, so no SQL migration is required');
};

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
    initializeDatabase()
        .then(() => {
            process.exit(0);
        })
        .catch((error) => {
            console.error('✗ Database initialization failed:', error);
            process.exit(1);
        });
}

export default initializeDatabase;
