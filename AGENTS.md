# Repository Guidelines

## Project Structure & Module Organization
- `backend/`: Spring Boot + MyBatis-Plus service. Core code lives in `src/main/java/com/yqmy` split into `controller`, `service`, `mapper`, `entity`, and `config`. Shared config and SQL scripts sit in `src/main/resources`.
- `front/`: Static HTML/CSS/JS client started by `front/bin/start.sh`; shared API helpers are under `common/`, and page-level code under `pages/`.
- `docs/` and `pic/`: provide reference assets only. Runtime artifacts such as `backend/uploads/` and `backend/logs/` should stay out of commits.

## Build, Test, and Development Commands
- `cd backend && mvn clean package`: build the Spring Boot jar and run unit tests.
- `cd front && ./bin/start.sh`: launch the frontend via `npx live-server` on port 8000 with auto-reload.
- `cd backend && mvn test`: execute backend tests without packaging.

## Coding Style & Naming Conventions
- Java: 4-space indentation, UpperCamelCase classes, lowerCamelCase members, plural REST paths (e.g., `/api/users`). Keep using Lombok (`@Data`) and Swagger annotations already present.
- JavaScript: ES6 syntax with async/await; export shared helpers the same way `common/api.js` does (CommonJS fallback plus browser global). Keep filenames lowercase with hyphens for static assets.

## Testing Guidelines
- Locate unit tests in `backend/src/test/java`, mirroring production packages.
- Use JUnit 5 and Spring test slices; mock external integrations rather than calling live services.
- Guard each bug fix with a regression test and rerun `mvn test` before pushing. Document critical manual checks for frontend flows in the PR description when automation is missing.

## Commit & Pull Request Guidelines
- Match the existing history: short, present-tense summaries (Chinese or English) such as `登录页面ok`. Optional scope prefixes (`backend: add paging`) help scanning.
- Reference issue IDs or tasks in the commit body (`Closes #12`) and enumerate key changes.
- PRs to `main` must describe intent, attach screenshots or curl output for UI/API updates, include test evidence (`mvn test`), and call out config or schema changes.

## Environment & Configuration Tips
- Keep secret overrides in external `application-*.yml` files; never hard-code credentials.
- Update `front/common/api.js` when backend hosts or ports change, and confirm CORS filters in `backend/src/main/java/com/yqmy/config` align with the new origin.
