# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

YQMY Web (要钱没用) is a points-based task/freelance platform where users post tasks and complete work using points instead of money. The project consists of three main components:

- **Backend**: Spring Boot 2.7.17 REST API with Java 17
- **Frontend**: Vanilla HTML/CSS/JavaScript (no framework, static files)
- **WeChat Mini Program**: uni-app based mobile application (Vue 3, mp-weixin target)
- **Infrastructure**: PostgreSQL, Redis, MinIO (file storage)

## Architecture

### Backend Structure
The backend follows a layered architecture with clear separation of concerns:

**Core Packages**:
- `backend/src/main/java/com/yqmy/YqmyWebApplication.java` — Spring Boot entry point
- `controller/` — REST endpoints; use plural paths (e.g., `/api/users`); annotate with Swagger `@ApiOperation`
- `service/` — Business logic; interfaces in `service/`, implementations in `service/impl/`
- `mapper/` — MyBatis Plus mappers; follow `<Entity>Mapper` naming pattern; auto-generated via MyBatis Plus
- `entity/` — JPA entities with `@Data` (Lombok); use `@TableName` for MyBatis Plus
- `config/` — Spring configurations (CORS, MinIO, Redis, Swagger, WebConfig)

**Key Configuration Files**:
- `config/CorsConfig.java` — Frontend origin must match for browser requests
- `config/MinioConfig.java` — S3-compatible object storage for file upload/download
- `config/RedisConfig.java` — Cache and session management
- `config/MybatisPlusConfig.java` — Pagination and query customizations
- `config/SwaggerConfig.java` — API documentation at `/swagger-ui/`

**Database Access Pattern**:
- PostgreSQL queries use MyBatis Plus mappers
- Pagination via `Page<Entity>` objects
- Use `JsonbTypeHandler` for JSONB column conversion
- Add column comments via `COMMENT ON COLUMN` statements (PostgreSQL doesn't support inline comments in `CREATE TABLE`)

### Frontend Structure (Vanilla JavaScript)

**Entry Points**:
- `front/index.html` — Main redirect page
- `front/pages/index/` — Homepage with task listings
- `front/pages/login/` and `front/pages/signup/` — Authentication pages
- `front/common/api.js` — Centralized API client; export helpers for browser and CommonJS environments

**Code Style**:
- ES6 `async/await` for asynchronous operations
- Static asset filenames use lowercase-with-hyphens convention
- CSS organized by page; reusable utilities in `front/common/`

**Important**: Update `front/common/api.js` backend URL when backend host/port changes.

### WeChat Mini Program Structure (uni-app)

**Key Files**:
- `miniprogram/wechat/yqmy_miniprogram/manifest.json` — Platform configuration; WeChat AppID: `wx53dab80c6aaf58d1`
- `miniprogram/wechat/yqmy_miniprogram/pages.json` — Page routing and tab bar (5 tabs: 首页/任务/发布/消息/我的)
- `miniprogram/wechat/yqmy_miniprogram/App.vue` — Global styles and lifecycle
- `miniprogram/wechat/yqmy_miniprogram/main.js` — Vue 3 SSR entry point
- `miniprogram/wechat/yqmy_miniprogram/pages/` — Individual page components

**Development**:
- Developed with HBuilderX (not CLI-based); use HBuilderX UI to run and publish
- Build outputs to `unpackage/dist/dev/mp-weixin/` (dev) or `unpackage/dist/build/mp-weixin/` (prod)
- Import built project into WeChat Developer Tools for testing and submission

**Assets**:
- Icons in `/static/icons/` with naming: `name-a.png` (active) and `name-d.png` (inactive)
- Theme color: Orange (#F59E0B); pull-refresh enabled on homepage
- rpx units for responsive mobile layout

## Common Development Commands

### Backend

```bash
# Build with tests
cd backend && mvn clean package

# Build faster (skip tests)
cd backend && mvn clean package -DskipTests

# Run tests
cd backend && mvn test

# Run specific test
cd backend && mvn test -Dtest=UserServiceTest

# Local development (requires PostgreSQL, Redis, MinIO running)
cd backend && mvn spring-boot:run

# Production JAR start
cd backend && ./start.sh
```

### Infrastructure (Podman/Docker)

```bash
# Set up all services (Redis, PostgreSQL, MinIO) with Podman using host networking
./deploy/prepare.sh

# Full build and deployment
./deploy/start.sh

# Update database schema only
./deploy/updateSchema.sh

# Docker Compose alternative (includes auto-reload for frontend)
cd deploy/docker && docker compose up -d
```

### Frontend

```bash
# Live reload development server (recommended)
cd front && npx live-server --port=8000

# Python HTTP server
cd front && python3 -m http.server 3000

# Docker Compose includes frontend live-server
cd deploy/docker && docker compose up frontend
```

### WeChat Mini Program

```bash
# No CLI-based build; use HBuilderX UI:
# 1. Open project in HBuilderX
# 2. Run/Publish: 发行 -> 小程序-微信
# 3. Select dev or production build
# 4. Import from unpackage/dist/dev/mp-weixin/ into WeChat Developer Tools
```

## Configuration & Secrets

### Database (PostgreSQL)
- **Local/Dev**: `jdbc:postgresql://localhost:5432/yqmy_db` (user: `postgres`, password: `pgsql@yqmy`)
- **Docker**: `jdbc:postgresql://postgres-server:5432/yqmy_db` (same credentials)
- **Schema Migrations**: Run `./deploy/updateSchema.sh` after schema changes

### Cache (Redis)
- **Local/Dev**: `localhost:6379`
- **Docker**: `redis-server:6379` (no auth)

### Object Storage (MinIO)
- **Local/Dev**: `http://localhost:9000` (user: `minioadmin`, password: `minioadmin@yqmy`, bucket: `yqmy`)
- **Docker**: `http://minio-server:9000`
- **Console**: Port `9001`

### Environment Variables
Store sensitive configuration in external `application-{profile}.yml` files (never hard-code). Profile example:
- `application-dev.yml` — Local development overrides
- `application-prod.yml` — Production secrets (use secrets management in deployment)

## API & Documentation

- **Swagger UI**: `http://localhost:8080/swagger-ui/` (backend running)
- **REST Conventions**: Plural paths (e.g., `/api/users`, `/api/tasks`); use `@ApiOperation` for documentation
- **CORS**: Configured in `CorsConfig.java`; update allowed origins if frontend URL changes

## Testing

- **Framework**: JUnit 5 with Spring test slices
- **Location**: Mirror production packages under `backend/src/test/java`
- **Naming**: Classes named `<Entity>ServiceTest`, `<Entity>ControllerTest`, etc.
- **Strategy**: Mock external services; avoid live API/database calls in unit tests
- **Pre-Commit**: Run `mvn test` to ensure no regressions before pushing

## Code Style & Conventions

**Java**:
- 4-space indentation
- UpperCamelCase for classes; lowerCamelCase for fields/methods
- Use Lombok `@Data`, `@Getter`, `@Setter`, `@Builder` annotations
- Annotate controllers with Swagger `@Api` and `@ApiOperation`

**JavaScript**:
- ES6 with `async/await` for async code
- Export helpers with both browser globals and CommonJS fallback
- Use const/let; avoid var

**Database Naming**:
- PostgreSQL tables: lowercase_with_underscores
- Columns: lowercase_with_underscores
- Use `COMMENT ON TABLE/COLUMN` for documentation

**Mini Program (Vue 3)**:
- Component files use .vue with script setup or composition API
- Styles scoped to component; use CSS custom properties for theming
- Icons/assets in `/static/` with semantic naming

## Git & Deployment

**Commit Messages**:
- Format: `<scope>: <message>` (e.g., `backend: add user pagination`, `frontend: fix login form`)
- Language: 中文 or English
- Reference issues in body: `Closes #12`

**Pull Requests**:
- Clearly state feature/fix intent
- Include screenshots or `curl` output for UI/API changes
- Show test results: `mvn test` pass/fail
- Call out schema or configuration changes

**Branch Policy**:
- Main branch: `main`
- No force-push to `main`; use standard merge flow

## Project Artifacts to Ignore

- `backend/uploads/` — Runtime file uploads
- `backend/logs/` — Runtime logs
- `unpackage/dist/` — Mini program build output (regenerated on each build)
- `docs/` and `pic/` — Reference only; do not commit runtime artifacts