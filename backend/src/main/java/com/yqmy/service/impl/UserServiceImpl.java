package com.yqmy.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yqmy.entity.User;
import com.yqmy.mapper.UserMapper;
import com.yqmy.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
}