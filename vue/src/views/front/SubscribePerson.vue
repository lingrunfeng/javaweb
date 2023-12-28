<template>
  <div style="padding: 10px 0">
    <el-card>
      <el-table :data="table" stripe>
        <el-table-column prop="commentUser" label="用户名"></el-table-column>
        <el-table-column  label="操作">
          <template #default="scope">
            <el-button type="primary" @click="look(scope.row.commentUser)">查看他的长评</el-button>
            <el-button type="danger" @click="cancel(scope.row)">取消关注</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Look",
  data() {
    return {
      user: sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : {},
      table: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request.get("/lookAuthor/user/" + this.user.username).then(res => {
        this.table = res.data
      })
    },
    look(username) {
      this.$router.push({path: "/front/longCommentTable", query: {username: username}})
    },
    cancel(row) {
      request.delete("/lookAuthor/" + row.user + "/" + row.commentUser).then(res => {
        this.$message.success("取消成功")
        this.load()
      })
    }
  }
}
</script>

<style scoped>

</style>
