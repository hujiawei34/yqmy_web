# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

YQMY Web (要钱没用) is a task/freelance platform where users use points instead of money to post and complete tasks. The project consists of:

- **Backend**: Spring Boot 2.7.17 REST API with Java 17
- **Frontend**: Vanilla HTML/CSS/JavaScript (no framework)
- **Database**: PostgreSQL 
- **Cache**: Redis
- **File Storage**: MinIO

## Architecture

### Backend Structure
- **Main Application**: `backend/src/main/java/com/yqmy/YqmyWebApplication.java`
- **Controllers**: REST endpoints in `backend/src/main/java/com/yqmy/controller/`
- **Services**: Business logic in `backend/src/main/java/com/yqmy/service/`
- **Entities**: JPA entities in `backend/src/main/java/com/yqmy/entity/`
- **Mappers**: MyBatis Plus mappers in `backend/src/main/java/com/yqmy/mapper/`
- **Configuration**: Spring configurations in `backend/src/main/java/com/yqmy/config/`

### Frontend Structure
- **Entry Point**: `front/index.html` (redirects to main page)
- **Main Page**: `front/pages/index/` (homepage)
- **Authentication**: `front/pages/login/` and `front/pages/signup/`
- **Shared Assets**: `front/common/api.js`, `front/images/`

### Key Technologies
- **Backend**: Spring Boot, MyBatis Plus, PostgreSQL, Redis, MinIO, Swagger/SpringFox
- **Frontend**: Vanilla JavaScript, CSS3, HTML5
- **Deployment**: Docker containers with host networking

## Common Development Commands

### Backend Development
```bash
# Build the project
cd backend && mvn clean package

# Run backend locally (requires dependencies)
cd backend && mvn spring-boot:run

# Run tests
cd backend && mvn test
```

### Infrastructure Setup
```bash
# Set up all services (Redis, PostgreSQL, MinIO)
cd backend/deploy && ./prepare.sh

# Build and deploy backend
cd backend/deploy && ./start.sh

# Update database schema
cd backend/deploy && ./updateSchema.sh
```

### Frontend Development
The frontend is static HTML/CSS/JavaScript. Serve the `front/` directory with any web server:
```bash
# Simple Python server
cd front && python3 -m http.server 3000

# Or use any static file server
```

## Configuration

### Database Configuration
- **URL**: `jdbc:postgresql://localhost:5432/yqmy_db`
- **User**: `postgres`
- **Password**: `pgsql@yqmy`

### Redis Configuration  
- **Host**: `redis-server`
- **Port**: `6379`

### MinIO Configuration
- **Endpoint**: `http://minio-server:9000`
- **Access Key**: `minioadmin`
- **Secret Key**: `minioadmin@yqmy`
- **Bucket**: `yqmy`

## API Documentation
Swagger UI is available at `http://localhost:8080/swagger-ui/` when the backend is running.

## Key Features Implemented
- User authentication (login/signup)
- File upload/download via MinIO
- Basic user management
- Cross-origin support for frontend-backend communication