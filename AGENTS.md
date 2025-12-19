# Repository Guidelines

This guide explains how to work in this repo, build/test locally, and contribute changes safely and consistently.

## Project Structure & Module Organization
- `backend/`: Spring Boot + MyBatis-Plus. Code under `backend/src/main/java/com/yqmy/{controller,service,mapper,entity,config}`; resources in `backend/src/main/resources`.
- `front/`: Static client. Shared helpers in `front/common/`; page code in `front/pages/`; start script in `front/bin/start.sh`.
- Tests: mirror production packages under `backend/src/test/java`.
- Assets: `docs/` and `pic/` are reference-only. Do not commit runtime artifacts like `backend/uploads/` or `backend/logs/`.

## Build, Test, and Development Commands
- `cd backend && mvn clean package` — builds the Spring Boot jar and runs unit tests.
- `cd backend && mvn test` — runs backend tests without packaging.
- `cd front && ./bin/start.sh` — launches the frontend via `npx live-server` on port 8000 with auto‑reload.

## Coding Style & Naming Conventions
- Java: 4-space indentation; UpperCamelCase classes; lowerCamelCase fields/methods; plural REST paths (e.g., `/api/users`). Keep using Lombok annotations (e.g., `@Data`) and existing Swagger usage. MyBatis-Plus mappers follow `<Entity>Mapper` naming.
- JavaScript: ES6 with `async/await`. Export helpers like `front/common/api.js` (CommonJS fallback + browser global). Static asset filenames are lowercase-with-hyphens.

## Testing Guidelines
- Frameworks: JUnit 5 with Spring test slices. Mock external integrations; avoid live service calls.
- Location & naming: mirror production packages; name classes like `UserServiceTest`.
- Process: guard each bug fix with a regression test and run `mvn test` before pushing.

## Commit & Pull Request Guidelines
- Commits: short, present-tense summaries (中文/English). Optional scope prefixes (e.g., `backend: add paging`). Reference issues in the body (e.g., `Closes #12`).
- PRs to `main`: clearly state intent, attach screenshots or `curl` output for UI/API changes, include test evidence (`mvn test`), and call out config or schema changes.

## Security & Configuration Tips
- Keep secrets in external `application-*.yml`; never hard-code credentials.
- When backend hosts/ports change, update `front/common/api.js` and verify CORS in `backend/src/main/java/com/yqmy/config` matches the frontend origin.

