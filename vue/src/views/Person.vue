<template>
  <div>
    <el-card style="width: 40%; margin: 10px">
      <el-form ref="form" :model="form" label-width="80px">
       <el-form-item label="">
         <el-upload
             class="avatar-uploader"
<<<<<<< HEAD
             action="http://1.15.171.191:8080/files/upload"
=======
             action="http://localhost:9090/files/upload"
>>>>>>> a6b71490b7c1fe880eb9589f4664de23861e54a6
             :show-file-list="false"
             :on-success="handleAvatarSuccess"
         >
           <img v-if="form.avatar" :src="form.avatar" class="avatar">
           <i v-else class="el-icon-plus avatar-uploader-icon"></i>
         </el-upload>
       </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.sex"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="标签" >
          <el-select clearable multiple v-model="form.tagsArr" placeholder="请选择"  style="width: 100%" @change="changeTags">
            <el-option v-for="item in ['喜剧','悬疑', '爱情', '动作', '动画', '犯罪', '惊悚', '冒险', '历史', '战争', '纪录片', '科幻']"
                       :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="update">保存</el-button>
      </div>
    </el-card>

  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Person",
  data() {
    return {
      form: {}
    }
  },
  created() {
    let str = sessionStorage.getItem("user") || "{}"
    this.form = JSON.parse(str)
    this.form.tagsArr = this.form.tags ? this.form.tags.split(', ') : []
  },
  methods: {
    handleAvatarSuccess(res) {
      this.form.avatar = res.data
    },
    changeTags() {
      if (this.form.tagsArr && this.form.tagsArr.length > 3) {
        this.$message.error('最多选择3个个性标签')
        this.form.tagsArr = this.form.tagsArr.splice(0, 3)
      }
    },
    update() {
      if (this.form.tagsArr) {
        this.form.tags = this.form.tagsArr.join(', ')
      }
      request.put("/user", this.form).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "更新成功"
          })
          sessionStorage.setItem("user", JSON.stringify(this.form))
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
