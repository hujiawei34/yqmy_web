apt install podman
podman pull redis
podman pull postgres
podman pull quay.io/minio/minio:RELEASE.2024-05-28T17-19-04Z
podman pull openjdk:17-jdk-slim

# 启动Redis容器
podman run -d --name redis-server -p 6379:6379 redis

# 启动PostgreSQL容器
podman run -d --name postgres-server -p 5432:5432 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=pgsql@yqmy \
  -e POSTGRES_DB=yqmy_db \
  -v postgres_data:/var/lib/postgresql/data \
  postgres

# 启动MinIO容器
podman run -d --name minio-server -p 9000:9000 -p 9001:9001 \
  -e MINIO_ROOT_USER=minioadmin \
  -e MINIO_ROOT_PASSWORD=minioadmin@yqmy \
  -v minio_data:/data \
  quay.io/minio/minio:RELEASE.2024-05-28T17-19-04Z server /data --console-address ":9001"