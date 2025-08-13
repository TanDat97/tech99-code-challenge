# Problem 5 - Express TypeScript Application

A RESTful API built with Express.js, TypeScript, MySQL, and TypeORM featuring user management, authentication middleware, and comprehensive testing.

## 📋 Features

- **Express.js** with TypeScript
- **MySQL** database with TypeORM
- **Database migrations** for schema management
- **Authentication middleware** with context management
- **Unit testing** with Jest
- **Docker support** with Docker Compose
- **Path aliases** for clean imports
- **Internationalization** (i18n) support
- **Swagger API Documentation** with OpenAPI 3.0

## 🚀 Quick Start

### Prerequisites

- Node.js 22+ 
- MySQL 8.0+
- npm or yarn

### Environment Setup

1. Clone the repository and navigate to problem5:
```bash
cd problem5
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
# Application Configuration
APP_PORT=3000
APP_NAME=express-typescript

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=houzez_dev
DB_SYNCHRONIZE=false
DB_LOGGING=false
```

## 🔧 Development Setup

### Method 1: Local Development

1. **Setup MySQL Database:**
```bash
# Create database
mysql -u root -p
CREATE DATABASE houzez_dev;
```

2. **Build the application:**
```bash
npm run build
```

3. **Run migrations:**
```bash
npm run migration:run
```

4. **Start development server:**
```bash
npm run dev
```

5. **Run tests:**
```bash
npm test                # Run once
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage report
```

### Method 2: Docker Development

1. **Start services with Docker Compose:**
```bash
# Quick setup (recommended)
make setup

# Or manually
docker compose up -d
```

2. **View logs:**
```bash
make logs        # All services
make logs-app    # App only
make logs-mysql  # MySQL only
```

3. **Run migrations in container:**
```bash
make migration-run
```

4. **Access services:**
- Application: http://localhost:3000
- MySQL: localhost:3307
- **Swagger Documentation**: http://localhost:3000/api-docs

## 📚 Available Scripts

### NPM Scripts
```bash
npm run dev              # Development with hot reload
npm start               # Start production server
npm run build           # Build TypeScript to JavaScript
npm test               # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage
npm run migration:run     # Run database migrations
npm run migration:revert  # Revert last migration
npm run migration:generate # Generate new migration
```

### Make Commands (Docker)
```bash
make setup       # Build and start all services
make dev         # Development workflow (clean start with logs)
make build       # Build Docker images
make up          # Start services (detached)
make down        # Stop and remove services
make start       # Start services (attached mode)
make stop        # Stop services
make restart     # Restart services
make logs        # View all logs
make logs-app    # View app logs only
make logs-mysql  # View MySQL logs only
make shell-app   # Shell into app container
make shell-mysql # MySQL client access
make clean       # Remove containers, networks, volumes
make migration-run    # Run migrations in container
make migration-revert # Revert migrations in container
```

## 🌐 API Endpoints

### Base URL
```
http://localhost:3000
```

### Documentation
- **Swagger UI**: http://localhost:3000/api-docs
- **OpenAPI JSON**: http://localhost:3000/api-docs.json

### Health Check
```http
GET /                    # Main health check
GET /api/ping           # Simple ping (no auth)
```

### User Management
```http
GET    /api/users           # Get users list (paginated)
GET    /api/users/{id}      # Get user by ID
POST   /api/users           # Create new user
PUT    /api/users/{id}      # Update user
DELETE /api/users/{id}      # Delete user (soft delete)
```

**Authentication Required**: All user endpoints require Bearer token authentication.

## 📖 API Documentation

This project includes comprehensive API documentation using Swagger/OpenAPI 3.0.

### Features:
- **Interactive UI** - Test endpoints directly from browser
- **Schema Definitions** - Complete request/response models
- **Authentication** - Bearer token support
- **Examples** - Sample requests and responses
- **Validation** - Parameter and body validation rules

### Access Documentation:
```bash
# Local development
http://localhost:3000/api-docs

# Docker development  
http://localhost:3000/api-docs

# JSON format
http://localhost:3000/api-docs.json
```

### Authentication:
1. Click "Authorize" button in Swagger UI
2. Enter: `Bearer your-jwt-token`
3. Test protected endpoints

## 🏗️ Project Structure

```
src/
├── components/           # Feature modules
│   └── users/           # User management
│       ├── controller.ts
│       ├── service.ts
│       ├── repository.ts
│       ├── entity.ts
│       └── dto/
├── core/                # Core functionality
│   ├── core.controller.ts
│   ├── core.service.ts
│   ├── core.repository.ts
│   └── core.entity.ts
├── database/            # Database configuration
│   ├── datasource.ts
│   └── migrations/
├── configs/             # Configuration files
│   ├── index.ts
│   └── swagger.ts       # API documentation config
├── helpers/             # Utility helpers
├── middlewares/         # Express middlewares
├── routes/              # Route definitions
├── __tests__/           # Test files
│   ├── components/
│   ├── mocks/
│   └── setup.ts
└── app.ts              # Application entry point
```

## 🧪 Testing

The application includes comprehensive unit tests for controllers using Jest.

### Running Tests
```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure
- **Unit Tests**: Controller logic testing with mocked services
- **Mocks**: Service mocks for isolated testing
- **Coverage**: Code coverage reporting

## 🐳 Docker Configuration

### Services
- **app**: Node.js application (port 3000)
- **mysql**: MySQL 8.0 database (port 3307)

### Volumes
- **mysql_data**: Persistent MySQL data storage
- **logs**: Application logs

### Networks
- Services communicate via internal Docker network
- MySQL authentication uses `mysql_native_password` for compatibility

## 🔒 Authentication

The application includes authentication middleware that:
- Verifies tokens (currently mocked)
- Sets user context for request lifecycle
- Uses express-http-context for context management

### Using Authentication:
1. **API Testing**: Use Swagger UI "Authorize" button
2. **curl**: Add header: `-H "Authorization: Bearer token"`
3. **Postman**: Add Bearer token in Authorization tab

## 🌍 Database Migrations

Automatic migration execution is enabled. Migrations will run on application startup.

### Manual Migration Commands
```bash
# Local development
npm run migration:run
npm run migration:revert

# Docker environment
make migration-run
make migration-revert
```

## 🛠️ Troubleshooting

### Common Issues

1. **MySQL Authentication Error**:
   - Ensure MySQL uses `mysql_native_password`
   - Check database credentials in `.env`

2. **Port Conflicts**:
   - App: Change `APP_PORT` in `.env`
   - MySQL: Modify port mapping in `docker-compose.yml`

3. **Path Alias Issues**:
   - Verify `tsconfig.json` paths configuration
   - Ensure `tsc-alias` is running after TypeScript compilation

4. **Migration Errors**:
   - Check database connection
   - Verify migration files in `src/database/migrations/`

5. **Swagger Not Loading**:
   - Check console for JavaScript errors
   - Verify all dependencies are installed
   - Restart the application

### Logs
```bash
# Docker logs
make logs

# Local development logs
# Check console output and ./logs/ directory
```

## 📝 Contributing

1. Create feature branch
2. Write tests for new functionality
3. Update Swagger documentation for new endpoints
4. Ensure all tests pass
5. Update documentation
6. Submit pull request

## 📄 License

This project is for educational purposes.
