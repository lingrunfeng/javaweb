package com.example.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;

import java.util.Date;

@Data
@TableName("movie")
public class Movie extends Model<Movie> {
    /**
      * 主键
      */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
      * 名称
      */
    private String name;

    /**
      * 导演
      */
    private String director;

    /**
      * 主演
      */
    private String mainActor;

    /**
      * 参演演员
      */
    private String actors;

    /**
      * 上映日期
      */
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date date;

    /**
      * 时长
      */
    private String duration;

    /**
      * 类型
      */
    private String type;

    /**
      * 图片
      */
    private String img;
    private Double score;
    private String description;
    private String url;
    private String area;
    private Integer scoreNum;
    private Integer zan;
    private Integer cai;

}
