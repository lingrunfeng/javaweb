<template>
  <div>
    <el-menu
        style="width: 200px; min-height: calc(100vh - 50px)"
        :default-active="path"
        router
        class="el-menu-vertical-demo">
      <el-submenu index="1" v-if="user.role === 1">
        <template #title>系统管理</template>
        <el-menu-item index="/user">用户管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/meals">菜品信息管理</el-menu-item>
      <el-menu-item index="/jubao">菜品投诉管理</el-menu-item>
      <el-menu-item index="/comment">评论管理</el-menu-item>
      <el-menu-item index="/littleWorldManager">小世界管理</el-menu-item>
      <el-menu-item index="/notice">公告管理</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Aside",
  data() {
    return {
      user: {},
      path: this.$route.path   // 设置默认高亮的菜单
    }
  },
  created() {
    let userStr = sessionStorage.getItem("user") || "{}"
    this.user = JSON.parse(userStr)

    // 请求服务端，确认当前登录用户的 合法信息
    request.get("/user/" + this.user.id).then(res => {
      if (res.code === '0') {
        this.user = res.data
      }
    })
  }
}
</script>

<style scoped>

</style>
