<<<<<<< HEAD
<template>
  <div style="padding: 10px 0">
    <el-row>
      <el-col :span="10" :offset="7">
        <el-card>
          <div style="text-align: center; padding: 30px 0; font-size: 30px">找回密码</div>
          <el-form label-width="100px">
            <el-form-item label="账号">
              <el-input style="width: 90%" v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input style="width: 90%" v-model="phone"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="resetPass">重置密码</el-button>
              <el-button type="primary" @click="$router.push('/login')">返回登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import request from "@/utils/request";

  export default {
    name: "resetPass",
    data() {
      return {
        username: '',
        phone: ''
      }
    },
    methods: {
      resetPass() {
        if (!this.username || !this.phone) {
          this.$message.warning("请填写验证信息")
          return
        }
        request.post("/user/resetPass/" + this.username + "/" + this.phone).then(res => {
          if(res.code === '0') {
            this.$message.success("重置成功， 密码【123】")
            this.$router.push("/login")
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    }
  }
</script>
=======
<template>
  <div style="padding: 10px 0">
    <el-row>
      <el-col :span="10" :offset="7">
        <el-card>
          <div style="text-align: center; padding: 30px 0; font-size: 30px">找回密码</div>
          <el-form label-width="100px">
            <el-form-item label="账号">
              <el-input style="width: 90%" v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input style="width: 90%" v-model="phone"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="resetPass">重置密码</el-button>
              <el-button type="primary" @click="$router.push('/login')">返回登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import request from "@/utils/request";

  export default {
    name: "resetPass",
    data() {
      return {
        username: '',
        phone: ''
      }
    },
    methods: {
      resetPass() {
        if (!this.username || !this.phone) {
          this.$message.warning("请填写验证信息")
          return
        }
        request.post("/user/resetPass/" + this.username + "/" + this.phone).then(res => {
          if(res.code === '0') {
            this.$message.success("重置成功， 密码【123】")
            this.$router.push("/login")
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    }
  }
</script>
>>>>>>> a6b71490b7c1fe880eb9589f4664de23861e54a6
