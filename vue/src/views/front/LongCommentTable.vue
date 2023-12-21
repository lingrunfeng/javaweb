<template>
  <div style="padding: 10px 0">
    <el-card>
      <div style="padding-bottom: 10px; font-size: 20px">长评列表</div>
      <el-table :data="longMessages">
        <el-table-column prop="movie.name" label="菜品"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="username" label="作者"></el-table-column>
        <el-table-column prop="time" label="发表时间"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" plain @click="showLongComment(scope.row.content)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="长评" v-model="vis" width="40%">
      <el-card>
        <v-md-preview :text="longComment"></v-md-preview>
      </el-card>

    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "LongCommentTable",
  data() {
    return {
      longMessages: [],
      vis: false,
      longComment: ''
    }
  },
  created() {
    let username = location.search.split("=")[1]
    request.get("/message/user/" + username + "/2").then(res => {
      this.longMessages = res.data;
    })
  },
  methods: {
    showLongComment(content) {
      if(!content) {
        this.$message.warning("内容为空，无法查看")
      }
      this.vis = true
      this.longComment = content
    }
  }
}
</script>

<style scoped>

</style>
