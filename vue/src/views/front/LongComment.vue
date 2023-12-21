<template>
  <el-card style="margin-top: 10px">
    <el-form>
      <el-form-item label="标题" label-width="50px">
        <el-input v-model="entity.title" style="width: 50%"></el-input>
      </el-form-item>
    </el-form>
    <v-md-editor v-model="entity.content" height="400px"></v-md-editor>
    <div style="padding: 10px 0">
      <el-button @click="$router.push({path: '/front/detail', query: id})">取消</el-button>
      <el-button type="primary" @click="save">发布</el-button>
    </div>
  </el-card>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "LongComment",
  data() {
    return {
      entity: {title: ''},
      user: {},
      id: null
    }
  },
  created() {
    this.user = sessionStorage.getItem("user") ? JSON.parse( sessionStorage.getItem("user")) : {}
    this.id = this.$route.query.id
  },
  methods: {
    save() {
      if (!this.user.username) {
        this.$message({
          message: "请登录",
          type: "warning"
        });
        return;
      }
      this.entity.username = this.user.username
      if (!this.entity.content) {
        this.$message({
          message: "请填写内容",
          type: "warning"
        });
        return;
      }
      this.entity.type = 2
      this.entity.foreignId = this.id
      // 如果是评论的话，在 save的时候要注意设置 当前模块的id为 foreignId。也就是  entity.foreignId = 模块id
      request.post("/message", this.entity).then(res => {
        if (res.code === '0') {
          this.$message({
            message: "评论成功",
            type: "success"
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
        this.$router.push({path: '/front/detail', query: this.id})
      })
    },
  }
}
</script>

<style scoped>

</style>
