#!/bin/bash
cwd=$(cd $(dirname $0) && pwd)

# 重新构建项目
echo "重新构建项目..."
cd ${cwd}/../backend
mvn clean package -q


cd ${cwd}
