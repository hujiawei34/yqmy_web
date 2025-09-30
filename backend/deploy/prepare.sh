#!/bin/bash
# apt install podman
# podman pull redis
# podman pull postgres
# podman pull quay.io/minio/minio:RELEASE.2024-05-28T17-19-04Z
# podman pull openjdk:17-jdk-slim
podman stop redis-server postgres-server minio-server 2>/dev/null; 
podman rm redis-server postgres-server minio-server 2>/dev/null 

# 启动Redis容器（使用宿主机网络）
podman run -d --name redis-server --network host redis

# 启动PostgreSQL容器（使用宿主机网络）
podman run -d --name postgres-server --network host \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=pgsql@yqmy \
  -e POSTGRES_DB=yqmy_db \
  -v postgres_data:/var/lib/postgresql/data \
  postgres

# 启动MinIO容器（使用宿主机网络）
podman run -d --name minio-server --network host \
  -e MINIO_ROOT_USER=minioadmin \
  -e MINIO_ROOT_PASSWORD=minioadmin@yqmy \
  -v minio_data:/data \
  quay.io/minio/minio:RELEASE.2024-05-28T17-19-04Z server /data --console-address ":9001"