package com.example.controller;

import com.example.common.Result;
import com.example.entity.Collect;
import com.example.mapper.CollectMapper;
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
@RequestMapping("/collect")
public class CollectController {

    @Resource
    private CollectMapper collectMapper;

    @PostMapping
    public Result<?> save(@RequestBody Collect collect) {
        collect.setTime(new Date());
        collectMapper.insert(collect);
        return Result.success();
    }

    @PutMapping
    public Result<?> update(@RequestBody Collect collect) {
        collectMapper.updateById(collect);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Long id) {
        collectMapper.deleteById(id);
        return Result.success();
    }

    @GetMapping("/{id}")
    public Result<?> findById(@PathVariable Long id) {
        return Result.success(collectMapper.selectById(id));
    }

    @GetMapping
    public Result<?> findAll() {
        List<Collect> list = collectMapper.selectList(null);
        return Result.success(list);
    }

    @GetMapping("/user/{userId}")
    public Result<?> findByUser(@PathVariable Integer userId) {
        List<Collect> list = collectMapper.selectList(Wrappers.<Collect>lambdaQuery().eq(Collect::getUserId, userId));
        return Result.success(list);
    }

    @GetMapping("/page")
    public Result<?> findPage(@RequestParam(required = false, defaultValue = "") String name,
                              @RequestParam(required = false, defaultValue = "1") Integer pageNum,
                              @RequestParam(required = false, defaultValue = "10") Integer pageSize) {
        LambdaQueryWrapper<Collect> query = Wrappers.<Collect>lambdaQuery().orderByDesc(Collect::getId);
        if (StrUtil.isNotBlank(name)) {
            query.like(Collect::getName, name);
        }
        IPage<Collect> page = collectMapper.selectPage(new Page<>(pageNum, pageSize), query);
        return Result.success(page);
    }


}
