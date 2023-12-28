<template>
  <div style="width: 100%; height: 100vh; overflow: hidden" class="bgImg">
    <div style="width: 400px; margin-top: 150px; margin-right: 100px; float: right">
      <div style="font-size: 30px; text-align: center; padding: 30px 0; color: dodgerblue">欢迎登录USST美食交流社区平台</div>
      <el-form ref="form" :model="form" size="normal" :rules="rules">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="form.role" :label="1">管理员</el-radio>
          <el-radio v-model="form.role" :label="2">普通用户</el-radio>
          <el-radio v-model="form.role" :label="3">食堂管理员</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="login">登 录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="$router.push('/pass')">忘记密码 </el-button>
          <el-button type="text" @click="$router.push('/register')">前往注册 >> </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Login",
  data() {
    return {
      form: {role: 1},
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
      }
    }
  },
  created() {
    sessionStorage.removeItem("user")
  },
  methods: {
    login() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          request.post("/user/login", this.form).then(res => {
            if (res.code === '0') {
              this.$message({
                type: "success",
                message: "登录成功"
              })
              sessionStorage.setItem("user", JSON.stringify(res.data))  // 缓存用户信息
              if (res.data.role !== 1) {
                this.$router.push("/front/home")  //登录成功之后进行页面的跳转，跳转到主页
              } else {
                this.$router.push("/")  //登录成功之后进行页面的跳转，跳转到主页
              }

            } else {
              this.$message({
                type: "error",
                message: res.msg
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.bgImg {
  background: url("../assets/bg.jpg") no-repeat;
  background-size: 60% 100vh;
  background-color: LightYellow;

}
</style>
