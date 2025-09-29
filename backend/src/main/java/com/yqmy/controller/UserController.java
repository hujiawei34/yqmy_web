package com.yqmy.controller;

import com.yqmy.entity.User;
import com.yqmy.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "用户管理")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @ApiOperation("获取用户列表")
    @GetMapping
    public List<User> list() {
        return userService.list();
    }

    @ApiOperation("根据ID获取用户")
    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.getById(id);
    }

    @ApiOperation("创建用户")
    @PostMapping
    public boolean save(@RequestBody User user) {
        return userService.save(user);
    }

    @ApiOperation("更新用户")
    @PutMapping("/{id}")
    public boolean update(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        return userService.updateById(user);
    }

    @ApiOperation("删除用户")
    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable Long id) {
        return userService.removeById(id);
    }
}