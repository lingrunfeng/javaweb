<template>
  <el-card>
    <el-row :gutter="10">
      <el-col :span="4" v-for="item in tableData">
        <el-card style="margin-bottom: 10px; cursor: pointer" @click="$router.push('/front/detail?id=' + item.id)">
          <div><el-image :src="item.img" style="width: 100%; height: 150px"></el-image></div>
          <div style=" text-align: center; font-size: 12px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{ item.name }}</div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Search",
  data() {
    return {
      tableData: []
    }
  },
  created() {
    let name = this.$route.query.name || location.search.split("=")[1]
    request.get("/movie/search", {
      params: {
        name: name
      }
    }).then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style scoped>

</style>
