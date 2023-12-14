<template>
  <div style="padding: 10px">
    <el-table :data="tableData" border stripe>
      <el-table-column prop="name" label="菜品名称"></el-table-column>
      <el-table-column label="评论内容">
        <template #default="scope">
          <el-button type="primary" @click="show(scope.row.content)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="收藏时间"></el-table-column>
    </el-table>

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
  name: "Collect",
  data() {
    return {
      tableData: [],
      longComment: '',
      vis: false
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      let user = JSON.parse(sessionStorage.getItem("user"))
      request.get("/collect/user/" + user.id).then(res => {
        this.tableData = res.data
      })
    },
    show(content) {
      this.longComment = content
      this.vis = true
    }
  }
}
</script>

<style scoped>

</style>
