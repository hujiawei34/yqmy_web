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
- **Backend**: Spring Boot 2.7.17, MyBatis Plus 3.5.2, PostgreSQL, Redis, MinIO 8.5.7, Swagger/SpringFox 3.0.0, Lombok
- **Frontend**: Vanilla JavaScript, CSS3, HTML5, live-server for development
- **Deployment**: Podman containers with host networking, Docker Compose alternative available

## Common Development Commands

### Backend Development
```bash
# Build the project
cd backend && mvn clean package

# Build without tests (faster)
cd backend && mvn clean package -DskipTests

# Run backend locally (requires dependencies)
cd backend && mvn spring-boot:run

# Run tests
cd backend && mvn test

# Start backend with production JAR
cd backend && ./start.sh
```

### Infrastructure Setup
```bash
# Set up all services (Redis, PostgreSQL, MinIO) using Podman
./deploy/prepare.sh

# Build and deploy backend
./deploy/start.sh

# Update database schema
./deploy/updateSchema.sh

# Docker Compose alternative (for local development)
cd deploy/docker && docker-compose up -d
```

### Frontend Development
The frontend is static HTML/CSS/JavaScript. Serve the `front/` directory with any web server:
```bash
# Using live-server (recommended for development)
cd front && npx live-server --port=8000

# Simple Python server
cd front && python3 -m http.server 3000

# Using Docker Compose (includes live-server)
cd deploy/docker && docker-compose up frontend
```

## Configuration

### Database Configuration
- **URL**: `jdbc:postgresql://postgres-server:5432/yqmy_db` (Docker) or `jdbc:postgresql://localhost:5432/yqmy_db` (local)
- **User**: `postgres`
- **Password**: `pgsql@yqmy`

### Redis Configuration
- **Host**: `redis-server` (Docker) or `localhost` (local)
- **Port**: `6379`

### MinIO Configuration
- **Endpoint**: `http://minio-server:9000` (Docker) or `http://localhost:9000` (local)
- **Access Key**: `minioadmin`
- **Secret Key**: `minioadmin@yqmy`
- **Bucket**: `yqmy`
- **Console**: Available at port `9001`

## API Documentation
Swagger UI is available at `http://localhost:8080/swagger-ui/` when the backend is running.

## Key Features Implemented
- User authentication (login/signup)
- File upload/download via MinIO
- Basic user management
- Cross-origin support for frontend-backend communication