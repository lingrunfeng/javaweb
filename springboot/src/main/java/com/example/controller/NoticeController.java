<<<<<<< HEAD
package com.example.controller;

import cn.hutool.core.date.DateUtil;
import com.example.common.Result;
import com.example.entity.Notice;
import com.example.mapper.NoticeMapper;
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
@RequestMapping("/notice")
public class NoticeController {

    @Resource
    private NoticeMapper noticeMapper;

    @PostMapping
    public Result<?> save(@RequestBody Notice notice) {
        notice.setTime(DateUtil.today());
        noticeMapper.insert(notice);
        return Result.success();
    }

    @PutMapping
    public Result<?> update(@RequestBody Notice notice) {
        noticeMapper.updateById(notice);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Long id) {
        noticeMapper.deleteById(id);
        return Result.success();
    }

    @GetMapping("/{id}")
    public Result<?> findById(@PathVariable Long id) {
        return Result.success(noticeMapper.selectById(id));
    }

    @GetMapping
    public Result<?> findAll() {
        List<Notice> list = noticeMapper.selectList(null);
        return Result.success(list);
    }

    @GetMapping("/page")
    public Result<?> findPage(@RequestParam(required = false, defaultValue = "") String name,
                              @RequestParam(required = false, defaultValue = "1") Integer pageNum,
                              @RequestParam(required = false, defaultValue = "10") Integer pageSize) {
        LambdaQueryWrapper<Notice> query = Wrappers.<Notice>lambdaQuery().orderByDesc(Notice::getId);
        if (StrUtil.isNotBlank(name)) {
            query.like(Notice::getName, name);
        }
        IPage<Notice> page = noticeMapper.selectPage(new Page<>(pageNum, pageSize), query);
        return Result.success(page);
    }


}
=======
package com.example.controller;

import cn.hutool.core.date.DateUtil;
import com.example.common.Result;
import com.example.entity.Notice;
import com.example.mapper.NoticeMapper;
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
@RequestMapping("/notice")
public class NoticeController {

    @Resource
    private NoticeMapper noticeMapper;

    @PostMapping
    public Result<?> save(@RequestBody Notice notice) {
        notice.setTime(DateUtil.today());
        noticeMapper.insert(notice);
        return Result.success();
    }

    @PutMapping
    public Result<?> update(@RequestBody Notice notice) {
        noticeMapper.updateById(notice);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Long id) {
        noticeMapper.deleteById(id);
        return Result.success();
    }

    @GetMapping("/{id}")
    public Result<?> findById(@PathVariable Long id) {
        return Result.success(noticeMapper.selectById(id));
    }

    @GetMapping
    public Result<?> findAll() {
        List<Notice> list = noticeMapper.selectList(null);
        return Result.success(list);
    }

    @GetMapping("/page")
    public Result<?> findPage(@RequestParam(required = false, defaultValue = "") String name,
                              @RequestParam(required = false, defaultValue = "1") Integer pageNum,
                              @RequestParam(required = false, defaultValue = "10") Integer pageSize) {
        LambdaQueryWrapper<Notice> query = Wrappers.<Notice>lambdaQuery().orderByDesc(Notice::getId);
        if (StrUtil.isNotBlank(name)) {
            query.like(Notice::getName, name);
        }
        IPage<Notice> page = noticeMapper.selectPage(new Page<>(pageNum, pageSize), query);
        return Result.success(page);
    }


}
>>>>>>> a6b71490b7c1fe880eb9589f4664de23861e54a6
