package com.yqmy.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yqmy.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {
}