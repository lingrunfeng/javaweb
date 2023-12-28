<<<<<<< HEAD
package com.example.controller;

import com.example.common.Result;
import com.example.entity.Jubao;
import com.example.mapper.JubaoMapper;
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
@RequestMapping("/jubao")
public class JubaoController {

    @Resource
    private JubaoMapper jubaoMapper;

    @PostMapping
    public Result<?> save(@RequestBody Jubao jubao) {
        Integer commentId = jubao.getCommentId();
        Jubao one = jubaoMapper.selectOne(Wrappers.<Jubao>lambdaQuery().eq(Jubao::getCommentId, commentId));
        if (one != null) {
            return Result.error("-1", "已举报");
        }
        jubaoMapper.insert(jubao);
        return Result.success();
    }

    @PutMapping
    public Result<?> update(@RequestBody Jubao jubao) {
        jubaoMapper.updateById(jubao);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Long id) {
        jubaoMapper.deleteById(id);
        return Result.success();
    }

    @GetMapping("/{id}")
    public Result<?> findById(@PathVariable Long id) {
        return Result.success(jubaoMapper.selectById(id));
    }

    @GetMapping
    public Result<?> findAll() {
        List<Jubao> list = jubaoMapper.selectList(null);
        return Result.success(list);
    }

    @GetMapping("/page")
    public Result<?> findPage(@RequestParam(required = false, defaultValue = "") String name,
                              @RequestParam(required = false, defaultValue = "1") Integer pageNum,
                              @RequestParam(required = false, defaultValue = "10") Integer pageSize) {
        LambdaQueryWrapper<Jubao> query = Wrappers.<Jubao>lambdaQuery().orderByDesc(Jubao::getId);
        IPage<Jubao> page = jubaoMapper.selectPage(new Page<>(pageNum, pageSize), query);
        return Result.success(page);
    }


}
=======
package com.example.controller;

import com.example.common.Result;
import com.example.entity.Jubao;
import com.example.mapper.JubaoMapper;
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
@RequestMapping("/jubao")
public class JubaoController {

    @Resource
    private JubaoMapper jubaoMapper;

    @PostMapping
    public Result<?> save(@RequestBody Jubao jubao) {
        Integer commentId = jubao.getCommentId();
        Jubao one = jubaoMapper.selectOne(Wrappers.<Jubao>lambdaQuery().eq(Jubao::getCommentId, commentId));
        if (one != null) {
            return Result.error("-1", "已举报");
        }
        jubaoMapper.insert(jubao);
        return Result.success();
    }

    @PutMapping
    public Result<?> update(@RequestBody Jubao jubao) {
        jubaoMapper.updateById(jubao);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Long id) {
        jubaoMapper.deleteById(id);
        return Result.success();
    }

    @GetMapping("/{id}")
    public Result<?> findById(@PathVariable Long id) {
        return Result.success(jubaoMapper.selectById(id));
    }

    @GetMapping
    public Result<?> findAll() {
        List<Jubao> list = jubaoMapper.selectList(null);
        return Result.success(list);
    }

    @GetMapping("/page")
    public Result<?> findPage(@RequestParam(required = false, defaultValue = "") String name,
                              @RequestParam(required = false, defaultValue = "1") Integer pageNum,
                              @RequestParam(required = false, defaultValue = "10") Integer pageSize) {
        LambdaQueryWrapper<Jubao> query = Wrappers.<Jubao>lambdaQuery().orderByDesc(Jubao::getId);
        IPage<Jubao> page = jubaoMapper.selectPage(new Page<>(pageNum, pageSize), query);
        return Result.success(page);
    }


}
>>>>>>> a6b71490b7c1fe880eb9589f4664de23861e54a6
