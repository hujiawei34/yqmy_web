#!/bin/bash
cwd=$(cd $(dirname $0) && pwd)

# 重新构建项目
echo "重新构建项目..."
cd ${cwd}/../backend
mvn clean package -q

# 使用OpenJDK 17运行后端服务器
echo "启动后端服务器..."
cd ${cwd}
podman stop yqmy-backend && podman rm yqmy-backend
podman run -d --name yqmy-backend --network host \
  -v ${cwd}/../backend/target/yqmy-web-1.0-SNAPSHOT.jar:/app/yqmy-web.jar \
  -v ${cwd}/../backend/logs:/app/logs \
  -v ${cwd}/../backend/uploads:/app/uploads \
  -e SPRING_PROFILES_ACTIVE=prod \
  -w /app \
  openjdk:17-jdk-slim \
  java -jar yqmy-web.jar