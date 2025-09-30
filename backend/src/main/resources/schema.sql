-- 用户表结构
-- 注意：user是PostgreSQL保留字，使用users作为表名
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(100) DEFAULT NULL,
  create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 添加表注释
COMMENT ON TABLE users IS '用户表';

-- 添加字段注释
COMMENT ON COLUMN users.id IS '用户ID，主键';
COMMENT ON COLUMN users.username IS '用户名，唯一标识';
COMMENT ON COLUMN users.password IS '用户密码（加密存储）';
COMMENT ON COLUMN users.email IS '用户邮箱地址';
COMMENT ON COLUMN users.create_time IS '创建时间';
COMMENT ON COLUMN users.update_time IS '更新时间';

-- 创建唯一索引
CREATE UNIQUE INDEX IF NOT EXISTS uk_username ON users (username);
CREATE UNIQUE INDEX IF NOT EXISTS uk_email ON users (email);

-- 插入测试数据（可选）
-- INSERT INTO users (username, password, email) VALUES ('admin', 'admin123', 'admin@example.com');