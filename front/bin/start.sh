#!/bin/bash

cwd=$(cd $(dirname $0) && pwd)
front_dir=$(dirname $cwd)
# 切换到项目目录
cd $front_dir

# 启动 live-server 服务
npx live-server --port=8000 --host=localhost