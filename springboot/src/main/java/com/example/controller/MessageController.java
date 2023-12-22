package com.example.controller;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import com.example.common.Result;
import com.example.entity.Message;
import com.example.entity.User;
import com.example.mapper.MessageMapper;
import com.example.mapper.MovieMapper;
import com.example.mapper.UserMapper;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/message")
public class MessageController{
    @Resource
    private MessageMapper messageMapper;
    @Resource
    private UserMapper userMapper;
    @Resource
    private MovieMapper movieMapper;
    @Resource
    HttpServletRequest request;

    @PostMapping
    public Result<?> save(@RequestBody Message Message) {
        String username = Message.getUsername();
        User user = userMapper.selectOne(new QueryWrapper<User>().eq("username", username));
        if (user.getForbidComment()) {
            return Result.error("-1", "禁止评论");
        }
        Message.setTime(DateUtil.formatDateTime(new Date()));
        return Result.success(messageMapper.insert(Message));
    }

    @PutMapping
    public Result<?> update(@RequestBody Message Message) {
        return Result.success(messageMapper.updateById(Message));
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Long id) {
        messageMapper.deleteById(id);
        return Result.success();
    }

    @GetMapping("/{id}")
    public Result<?> findById(@PathVariable Long id) {
        return Result.success(messageMapper.selectById(id));
    }

    @GetMapping
    public Result<?> findAll() {
        return Result.success(messageMapper.selectList(null));
    }

    @GetMapping("/user/{username}/{type}")
    public Result<?> userComment(@PathVariable String username, @PathVariable Integer type) {
        List<Message> messageList = messageMapper.selectList(Wrappers.<Message>lambdaQuery().eq(Message::getUsername, username).eq(Message::getType, type));
        for (Message message : messageList) {
            Long foreignId = message.getForeignId();
            message.setMovie(movieMapper.selectById(foreignId));
        }
        return Result.success(messageList);
    }

    @GetMapping("/foreign/{id}/{type}")
    public Result<?> foreign(@PathVariable Integer id, @PathVariable Integer type) {
        return Result.success(findByForeign(id, type));
    }

    @GetMapping("/page")
    public Result<?> findPage(@RequestParam(required = false, defaultValue = "") String search,
                                                @RequestParam(required = false, defaultValue = "1") Integer pageNum,
                                                @RequestParam(required = false, defaultValue = "10") Integer pageSize) {
        LambdaQueryWrapper<Message> query = Wrappers.<Message>lambdaQuery().like(Message::getContent, search).orderByDesc(Message::getId);
        return Result.success(messageMapper.selectPage(new Page<>(pageNum, pageSize), query));
    }

    private List<Message> findByForeign(Integer id, Integer type) {
        LambdaQueryWrapper<Message> queryWrapper = Wrappers.<Message>lambdaQuery().eq(Message::getType, type).eq(Message::getForeignId, id).orderByDesc(Message::getId);
        List<Message> list = messageMapper.selectList(queryWrapper);
        for (Message Message : list) {
            String username = Message.getUsername();
            User user = userMapper.selectOne(new QueryWrapper<User>().eq("username", username));
            // 默认一个头像
            Message.setAvatar(user.getAvatar());
            Long parentId = Message.getParentId();
            list.stream().filter(c -> c.getId().equals(parentId)).findFirst().ifPresent(Message::setParentMessage);
        }
        return list;
    }

}
