package com.example.controller;

import cn.hutool.core.collection.CollUtil;
import com.example.common.Result;
import com.example.entity.Movie;
import com.example.entity.User;
import com.example.mapper.MovieMapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.mapper.UserMapper;
import org.springframework.web.bind.annotation.*;
import cn.hutool.core.util.StrUtil;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.math.RoundingMode;
import java.util.*;
import java.math.BigDecimal;

@RestController
@RequestMapping("/movie")
public class MovieController {

    @Resource
    private MovieMapper movieMapper;
    @Resource
    UserMapper userMapper;

    @PostMapping
    public Result<?> save(@RequestBody Movie movie) {
        movieMapper.insert(movie);
        return Result.success();
    }
    @PostMapping("/score")
    public Result<?> score(@RequestBody Movie movie) {
        Movie m = movieMapper.selectById(movie.getId());
        Integer scoreNum = m.getScoreNum();
        scoreNum += 1;
        BigDecimal divide = (BigDecimal.valueOf(movie.getScore()).add(BigDecimal.valueOf(m.getScore()).multiply(BigDecimal.valueOf(m.getScoreNum())))).divide(BigDecimal.valueOf(scoreNum),1, RoundingMode.HALF_UP);
        m.setScore(divide.doubleValue());
        m.setScoreNum(scoreNum);
        movieMapper.updateById(m);
        return Result.success();
    }



    @PutMapping
    public Result<?> update(@RequestBody Movie movie) {
        movieMapper.updateById(movie);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    public Result<?> delete(@PathVariable Long id) {
        movieMapper.deleteById(id);
        return Result.success();
    }

    @GetMapping("/{id}")
    public Result<?> findById(@PathVariable Long id) {
        return Result.success(movieMapper.selectById(id));
    }

    @GetMapping
    public Result<?> findAll() {
        List<Movie> list = movieMapper.selectList(null);
        return Result.success(list);
    }

    //热度算法
    @GetMapping("/type/{type}")
    public Result<?> type(@PathVariable String type, HttpServletRequest request) {
        // 根据电影类型进行分类查询
        if ("score".equals(type)) {
            return Result.success(movieMapper.selectScore());
        } else if("hot".equals(type)) {
            // 获取用户ID
            String userid = request.getHeader("userid");

            // 查询电影按评分次数排行
            List<Movie> movieList = movieMapper.selectScoreNum();

            // 如果用户ID为空，直接返回电影按评分次数排行的结果
            if (StrUtil.isBlank(userid)) {
                return Result.success(movieList);
            }

            // 获取用户信息
            User user = userMapper.selectById(Integer.valueOf(userid));

            // 如果用户不存在，直接返回电影按评分次数排行的结果
            if (user == null) {
                return Result.success(movieList);
            }

            // 获取用户标签
            String tags = user.getTags();

            // 如果用户标签为空，直接返回电影按评分次数排行的结果
            if (StrUtil.isBlank(tags)) {
                return Result.success(movieList);
            }

            // 将用户标签按", "分割成数组
            String[] tagsArr = tags.split(", ");

            // 初始化电影列表
            movieList = new ArrayList<>();

            // 查询所有电影列表
            List<Movie> movies = movieMapper.selectList(null);

            // 遍历电影列表，根据用户标签筛选电影
            for (Movie movie : movies) {
                String movieType = movie.getType();

                // 判断电影类型是否与用户标签匹配
                boolean match = Arrays.stream(movieType.split("/"))
                        .map(String::trim)
                        .anyMatch(m -> Arrays.asList(tagsArr).contains(m));

                // 如果匹配，将电影加入结果列表
                if (match) {
                    movieList.add(movie);
                }
            }

            // 如果用户标签匹配不到电影，返回电影按评分次数排行的结果
            if (CollUtil.isEmpty(movieList)) {
                movieList =  movieMapper.selectScoreNum();
            }

            return Result.success(movieList);
        } else if("date".equals(type)) {
            // 查询电影按日期排行
            return Result.success(movieMapper.selectDate());
        }

        // 默认情况，返回所有电影列表
        return Result.success(movieMapper.selectList(null));
    }


    @GetMapping("/search")
    public Result<?> search(@RequestParam String name) {
        List<Movie> list = movieMapper.selectList(Wrappers.<Movie>lambdaQuery().like(Movie::getName, name)
                .or().like(Movie::getActors, name).or().like(Movie::getType, name));
        return Result.success(list);
    }

    @GetMapping("/page")
    public Result<?> findPage(@RequestParam(required = false, defaultValue = "") String search,
                              @RequestParam(required = false, defaultValue = "1") Integer pageNum,
                              @RequestParam(required = false, defaultValue = "10") Integer pageSize) {
        LambdaQueryWrapper<Movie> query = Wrappers.<Movie>lambdaQuery().orderByDesc(Movie::getId);
        if (StrUtil.isNotBlank(search)) {
            query.like(Movie::getName, search).or().like(Movie::getActors, search).or().like(Movie::getType, search);
        }
        IPage<Movie> page = movieMapper.selectPage(new Page<>(pageNum, pageSize), query);
        return Result.success(page);
    }

    @GetMapping("/page/area")
    public Result<?> findPageArea(@RequestParam(required = false, defaultValue = "") String area,
                              @RequestParam(required = false, defaultValue = "1") Integer pageNum,
                              @RequestParam(required = false, defaultValue = "10") Integer pageSize) {
        LambdaQueryWrapper<Movie> query = Wrappers.<Movie>lambdaQuery().orderByDesc(Movie::getId);
        query.eq(Movie::getArea, area);
        IPage<Movie> page = movieMapper.selectPage(new Page<>(pageNum, pageSize), query);
        return Result.success(page);
    }


}
