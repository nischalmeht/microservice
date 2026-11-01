// Jest setup: deterministic env for tests (no real secrets, no database).
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-with-enough-length';
process.env.MONGO_HOST = 'mongodb://localhost:27017/microservice-test';
process.env.AUTH_USERNAME = 'tester';
process.env.AUTH_PASSWORD = 'tester-password';
