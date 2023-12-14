<template>
  <div style="background-color: #eee; min-height: 100vh">
    <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex; background-color: #fff">

      <div style="height: 50px; line-height: 50px; border-bottom: 1px solid #ccc; display: flex; background-color: #fff">
        <!-- 图片部分 -->
        <img src="@/assets/LOGO.png" alt="Logo" style="width: 40px; height: 40px; margin-top: 5px;">
        <!-- 标题部分 -->
        <div style="color:#b51d2f; font-weight: bold; font-size: 25px; cursor: pointer" @click="$router.push('/front/home')">USST食堂交流社区</div>

      </div>

      <div style="width: 300px">
        <ul class="menu-box">
          <li :class="{'active': $route.path === '/front/home'}" @click="$router.push('/front/home')">首页</li>
          <li :class="{'active': $route.path === '/front/littleWorld'}" @click="$router.push('/front/littleWorld')">美食小世界</li>
        </ul>
      </div>
      <div style="flex: 1">
        <el-input style="width: 300px; margin-left: 100px" v-model="name" clearable></el-input>
        <el-button style="margin-left: 5px" type="primary" @click="search">搜索</el-button>
      </div>
      <div style="width: 130px">
       <span @click="showNotice" style="margin-right: 10px; color: orangered;  cursor: pointer"> <i class="el-icon-bell" style="font-size:18px;"></i>  {{ count }}</span>
        <el-button v-if="!user.id" @click="$router.push('/login')">登录</el-button>
        <el-dropdown v-else>
        <span class="el-dropdown-link" style="cursor: pointer">
          {{ user.nickName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push('/meals')" v-if="user.role === 1 || user.role === 3">后台管理</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/front/person')">个人信息</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/front/collect')">我收藏的评论</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/front/collectedMeal')">我收藏的菜品</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/front/subscribePerson')">我关注的人</el-dropdown-item>
              <el-dropdown-item @click="$router.push('/login')">退出论坛</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!--      内容区域-->
    <el-row>
      <el-col :span="18" :offset="3">
        <router-view />
      </el-col>
    </el-row>

    <el-dialog title="公告" v-model="dialogVisible" width="40%">
      <div style="padding: 0 20px">
        <el-collapse v-model="active">
          <el-collapse-item :title="item.name" :name="index+''" v-for="(item, index) in notice" :key="item.id">
            <div style="font-size: 12px; color: #888">
              {{ item.content }}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Layout",
  data() {
    return {
      user: {},
      name: '',
      count: 1,
      notice: [],
      dialogVisible: false,
      active: '0'
    }
  },
  created() {
    let str = sessionStorage.getItem("user") || "{}"
    this.user = JSON.parse(str)
    request.get('/notice').then(res => {
      this.notice = res.data.filter(v => v.status === '已发布')
      this.count = this.notice.length
    })
  },
  methods: {
    showNotice() {
      this.dialogVisible = true
    },
    search() {
      location.href = '/front/search?name=' + this.name
    }
  }
}
</script>

<style scoped>
.menu-box {
  list-style: none;
  display: flex;
  margin-left: 70px;
}
.menu-box li {
  padding: 0 20px;
  text-align: center;
  cursor: pointer;
  color: #666;
}
.menu-box li:hover{
  color: dodgerblue;
}
.active {
  background-color: dodgerblue;
  color: white!important;
}
</style>
