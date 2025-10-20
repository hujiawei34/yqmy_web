#!/bin/bash
set -e

echo "Building application..."
mvn clean package -DskipTests

echo "Starting application..."
java -jar target/yqmy-web-1.0-SNAPSHOT.jar