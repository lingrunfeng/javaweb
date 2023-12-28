package com.example.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.common.Result;
import com.example.entity.LookAuthor;
import com.example.mapper.LookAuthorMapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.core.metadata.IPage;
import org.springframework.web.bind.annotation.*;
import cn.hutool.core.util.StrUtil;

import javax.annotation.Resource;
import java.util.*;
import java.math.BigDecimal;

@RestController
@RequestMapping("/lookAuthor")
public class LookAuthorController {

    @Resource
    private LookAuthorMapper lookAuthorMapper;

    @PostMapping
    public Result<?> save(@RequestBody LookAuthor lookAuthor) {
        lookAuthorMapper.delete(Wrappers.<LookAuthor>lambdaQuery().eq(LookAuthor::getCommentUser, lookAuthor.getCommentUser())
                .eq(LookAuthor::getUser, lookAuthor.getUser()));
        lookAuthorMapper.insert(lookAuthor);
        return Result.success();
    }

    @PutMapping
    public Result<?> update(@RequestBody LookAuthor lookAuthor) {
        lookAuthorMapper.updateById(lookAuthor);
        return Result.success();
    }

    @DeleteMapping("/{user}/{commentUser}")
    public Result<?> delete(@PathVariable String user, @PathVariable String commentUser) {
        lookAuthorMapper.delete(Wrappers.<LookAuthor>lambdaQuery().eq(LookAuthor::getUser, user)
        .eq(LookAuthor::getCommentUser, commentUser));
        return Result.success();
    }

    @GetMapping("/{id}")
    public Result<?> findById(@PathVariable Long id) {
        return Result.success(lookAuthorMapper.selectById(id));
    }

    @GetMapping("/user/{user}")
    public Result<?> findAll(@PathVariable String user) {
        List<LookAuthor> list = lookAuthorMapper.selectList(new QueryWrapper<LookAuthor>().eq("user", user));
        return Result.success(list);
    }




}
