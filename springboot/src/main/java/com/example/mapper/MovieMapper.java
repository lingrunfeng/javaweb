package com.example.mapper;

import com.example.entity.Movie;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface MovieMapper extends BaseMapper<Movie> {

    @Select("select * from movie order by score desc")
    List<Movie> selectScore();

    @Select("select * from movie order by score_num desc")
    List<Movie> selectScoreNum();

    @Select("select * from movie order by date desc")
    List<Movie> selectDate();
}
