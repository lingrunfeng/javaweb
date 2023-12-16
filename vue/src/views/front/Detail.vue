<template>
  <div style="padding: 5px 0">
    <el-row :gutter="5">
      <el-col :span="6">
        <el-card>
          <el-image :src="info.img"/>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <div style="padding: 10px 0; font-size: 24px">{{ info.name }}</div>
          <div style="color: #888; font-size: 14px">菜品推出时间：{{ info.date }}</div>
          <div style="padding: 10px 0">
            <div style="padding: 5px 0">菜品负责人：<span style="color: dodgerblue">{{ info.director }}</span></div>
            <div style="padding: 5px 0">类型：<span style="color: #888">{{ info.type }}</span></div>
            <div style="padding: 5px 0">评分：<el-rate v-model="info.score" disabled show-score style="display: inline"></el-rate></div>
            <div style="padding: 5px 0">简介：</div>
            <div style="padding: 5px 0; color: #666; text-indent: 2em">{{ info.description }}</div>
            <div style="text-align: right; padding: 5px 0">

              <div>
                <el-input v-model="complaintText"
                placeholder="请输入投诉内容"
                style="margin-left: 10px;width: 130px"
                ></el-input>

                <el-button
                    type="major"
                    style="background-color: orangered; color: white; margin-left: 10px"
                    @click="tousu(complaintText)"
                >
                提交投诉
                </el-button>

              </div>
              <el-button style="background-color: dodgerblue; color: white" @click="collectMovie">收藏该菜品</el-button>
              <el-button style="background-color: #008cff; color: white" @click="zan">赞 {{ info.zan }}</el-button>
              <el-button type="info" @click="cai">踩 {{ info.cai }}</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div style="margin-top: 10px; margin-bottom: 80px">
      <el-card>
        <div style="padding: 20px;">
          <el-button type="primary" style="margin-bottom: 20px" @click="$router.push({path: '/front/longComment', query: {id: info.id}})">发表长评</el-button>
          <el-button type="primary" style="float: right; margin-left: 5px" @click="postScore">评分</el-button>
          <el-input placeholder="请设置评分, 0-5" type="number" max="5" min="0" style="float: right; width: 150px; margin-left: 10px" v-model="score"></el-input>
          <div style="padding: 10px 0; font-size: 20px; border-bottom: 1px solid #ccc; margin-bottom: 20px">精彩长评列表</div>
          <div style="border-bottom: 1px dashed #ccc; padding: 10px 20px; color: #666" v-for="item in longMessages">
            <span class="longComment" style="font-size: 20px; cursor: pointer" @click="showLongComment(item.content)">{{ item.title }}</span>
            <span style="font-size: 12px; margin-left: 20px; ">{{ item.username }}</span>
            <span style="font-size: 12px; margin-left: 20px;">{{ item.time }}</span>
            <el-button type="major" style="background-color: orangered; color: white; margin-left: 10px" @click="jubao(item)">投诉该菜品</el-button>
            <el-button type="text" style="float: right; margin-left: 10px" @click="del(item.id)" v-if="item.username === user.username">删除</el-button>
            <el-button type="text" style="float: right;margin-left: 10px " @click="collect(item.content)">收藏</el-button>
            <el-button type="text" style="float: right" @click="look(item.username)">关注他</el-button>
          </div>
        </div>
        <div style="padding: 20px; color: #888">
          <div>
            <div style="padding: 10px 0; font-size: 20px; border-bottom: 1px solid #ccc; margin-bottom: 20px; color: black">精彩短评列表</div>
            <el-input type="textarea" :rows="3" v-model="entity.content"></el-input>
            <div style="text-align: right; padding: 10px"><el-button type="primary" @click="save">发表短评</el-button></div>
          </div>
        </div>

        <div style="display: flex; padding: 20px" v-for="item in messages">
          <div style="text-align: center; flex: 1">
            <el-image :src="item.avatar" style="width: 60px; height: 60px; border-radius: 50%"></el-image>
          </div>
          <div style="padding: 0 10px; flex: 5">
            <div><b style="font-size: 14px">{{ item.username }}</b></div>
            <div style="padding: 10px 0; color: #888">
              {{ item.content }}
              <el-button type="text" size="mini" @click="del(item.id)" v-if="item.username === user.username">删除</el-button>
              <el-button type="major" style="background-color: orangered; color: white; margin-left: 10px" @click="jubao(item)">投诉该菜品</el-button>
            </div>
            <div style="background-color: #eee; padding: 10px" v-if="item.parentMessage">{{ item.parentMessage.username }}：{{ item.parentMessage.content }}</div>
            <div style="color: #888; font-size: 12px">
              <span>{{ item.time  }}</span>
              <el-button type="text" style="margin-left: 20px" @click="reReply(item.id)">回复</el-button>
            </div>
          </div>
        </div>

        <el-dialog title="回复信息" v-model="dialogFormVisible" width="30%">
          <el-form :model="entity" label-width="80px">
            <el-form-item label="内容">
              <el-input v-model="entity.reply" autocomplete="off" type="textarea" :rows="3"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="reply">确 定</el-button>
          </template>
        </el-dialog>


        <el-dialog title="长评" v-model="vis" width="40%">
          <el-card>
            <v-md-preview :text="longComment"></v-md-preview>
          </el-card>

        </el-dialog>
      </el-card>




    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Detail",
  data() {
    return {
      complaintText: '' ,// 存储投诉输入框的值
      score: null,
      info: {},
      dialogVisible: false,
      messages: [],
      longMessages: [],
      dialogFormVisible: false,
      entity: {},
      longComment: '',
      vis: false,
      user: {},
      zanFlag: false,
      caiFlag: false,
    }
  },
  created() {
    this.user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : {}
    this.load()

    let id = location.search.split("=")[1]
    this.loadMessage(id);
  },
  methods: {
    //上传小世界影音
    movieSuccessUpload(res) {
      this.entity.url = res.data;
      if (this.entity.id) {  // 更新
        request.put(url, this.entity).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.$message({
              type: "success",
              message: "更新成功"
            })
          } else {
            this.$message({
              type: "error",
              message: "223423"
            })
          }
        })
      }
      else {  // 新增
        this.$message({
          type: "error",
          message: res.msg
        })
      }
    },



    collectMovie() {
      request.post("/collectMovie/", { name: this.info.name, img: this.info.img,
        link: '/front/detail?id=' + this.info.id, userid: this.user.id, movieid: this.info.id }).then(res => {
        if(res.code === '0') {
          this.$message({
            message: "收藏成功",
            type: "success"
          });
        } else{
          this.$message.error(res.msg)
        }
      })
    },
    load() {
      let id = location.search.split("=")[1]
      request.get("/movie/" + id).then(res => {
        if(res.code === '0') {
          this.info = res.data
        }
      })
    },
    zan() {
      if (this.zanFlag) {
        this.$message({
          message: "请勿重复点赞",
          type: "warning"
        });
        return
      }
      this.info.zan += 1
      this.entity = JSON.parse(JSON.stringify(this.info))
      this.zanFlag = true
      this.putInfo()
    },
    cai() {
      if (this.caiFlag) {
        this.$message({
          message: "请勿重复踩",
          type: "warning"
        });
        return
      }
      this.info.cai += 1
      this.entity = JSON.parse(JSON.stringify(this.info))
      this.caiFlag = true
      this.putInfo()
    },
    putInfo() {
      if (!this.user.username) {
        this.$message({
          message: "请登录",
          type: "warning"
        });
        return;
      }
      request.put("/movie", this.entity).then(res => {
        if (res.code === '0') {
          this.$message({
            message: "操作成功",
            type: "success"
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
        this.entity = {}
        this.loadMessage(this.info.id);
      })
    },
    look(username) {
      if (username === this.user.username) {
        this.$message({
          message: "自己不能关注自己",
          type: "error"
        });
        return
      }
      request.post("/lookAuthor/", {commentUser: username, user: this.user.username}).then(res => {
        if(res.code === '0') {
          this.$message({
            message: "关注成功",
            type: "success"
          });
        }
      })
    },
    collect(content) {
      request.post("/collect/", {userId: this.user.id, name: this.info.name, content: content}).then(res => {
        if (res.code === '0') {
          this.$message({
            message: "收藏成功",
            type: "success"
          });
        }
      })
    },
    postScore() {
      if (!this.user.id) {
        this.$message({
          message: "请登录！",
          type: "warning"
        });
        return;
      }

      if (!this.score || this.score > 5) {
        this.$message({
          message: "请输入5以内的评分",
          type: "warning"
        });
        return;
      }
      let postData = JSON.parse(JSON.stringify(this.info))
      postData.score = this.score
      request.post("/movie/score", postData).then(res => {
        if (res.code === '0') {
          this.$message({
            message: "评分成功",
            type: "success"
          });
        }
        this.score = null
        this.load()
      })
    },
    jubao(info) {
      if (!this.user.id) {
        this.$message({
          message: "请登录！",
          type: "warning"
        });
        return;
      }
      request.post('/jubao', {commentId: info.id, commentUser: info.username, content: info.content, user: this.user.username}).then(res => {
        if (res.code === '0') {
          this.$message({
            message: "投诉成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "感谢你为食堂做出贡献！",
            type: "success"
          });
        }
      })
    },

    tousu(info) {
      if (!this.user.id) {
        this.$message({
          message: "请登录！",
          type: "warning"
        });
        return;
      }
      request.post('/jubao', {commentId: this.user.id, commentUser: this.user.username, content: info, user: this.user.username}).then(res => {
        if (res.code === '0') {
          this.$message({
            message: "投诉成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "感谢你为食堂做出贡献！",
            type: "success"
          });
        }
      })
    },
    showLongComment(content) {
      this.longComment = content
      console.log(content)
      this.vis = true
    },
    loadMessage(id) {
      // 如果是留言的话，就写死=0
      // 如果是 评论，则需要设置 当前被评论的模块的id作为foreignId
      request.get("/message/foreign/" + id + "/1").then(res => {
        this.messages = res.data;
      })

      request.get("/message/foreign/" + id + "/2").then(res => {
        this.longMessages = res.data;
      })
    },
    cancel() {
      this.dialogFormVisible = false;
      this.entity.reply = '';
    },
    reReply(id) {
      if (!this.user.id) {
        this.$message({
          message: "请登录！",
          type: "warning"
        });
        return;
      }
      this.dialogFormVisible = true;
      this.entity.parentId = id;
    },
    reply() {
      this.entity.content = this.entity.reply;
      this.save();
    },
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
      this.entity.type = 1
      this.entity.foreignId = this.info.id
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
        this.entity = {}
        this.loadMessage(this.info.id);
        this.dialogFormVisible = false;
      })
    },
    del(id) {
      request.delete("/message/" + id).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.loadMessage(this.info.id)
      })
    }
  }
}
</script>

<style>
.longComment:hover {
  color: dodgerblue;
}
</style>
