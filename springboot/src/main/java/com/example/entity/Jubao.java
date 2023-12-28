package com.example.entity;

import lombok.Data;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import com.baomidou.mybatisplus.annotation.TableId;


@Data
@TableName("jubao")
public class Jubao extends Model<Jubao> {
    /**
      * 主键
      */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
      * 被举报人
      */
    private String commentUser;

    /**
      * 举报人
      */
    private String user;


    /**
      * 评论id
      */
    private Integer commentId;

    /**
      * 举报内容
      */
    private String content;

}
