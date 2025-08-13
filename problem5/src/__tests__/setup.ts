// Test setup file
import 'reflect-metadata';

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '3306';
process.env.DB_USERNAME = 'test';
process.env.DB_PASSWORD = 'test';
process.env.DB_DATABASE = 'test_db';
process.env.DB_SYNCHRONIZE = 'false';
process.env.DB_LOGGING = 'false';

// Mock express-http-context
jest.mock('express-http-context', () => ({
  middleware: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
})); 