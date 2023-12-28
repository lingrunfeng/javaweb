<template>
  <div style="margin: 10px 0">
    <el-row>
      <el-col>
        <el-carousel height="400px">
<<<<<<< HEAD
          <el-carousel-item v-for="(item, index) in imgs" :key="item">
            <a :href="getLinkForItem(index)" target="_blank">
              <img :src="item" alt="">
            </a>
=======
          <el-carousel-item v-for="item in imgs" :key="item">
            <img :src="item" alt="">
>>>>>>> a6b71490b7c1fe880eb9589f4664de23861e54a6
          </el-carousel-item>
        </el-carousel>


        <div style="padding: 10px; background-color: white;margin: 5px 0">
          <div style="color: orangered; font-size: 20px;"><b>推荐菜品</b></div>
        </div>

        <div>
          <el-row :gutter="10">
            <el-col :span="4" v-for="item in tableDataHot">
              <el-card style="margin-bottom: 10px; cursor: pointer" @click="$router.push('/front/detail?id=' + item.id)">
                <div><el-image :src="item.img" style="width: 100%; height: 150px"></el-image></div>
                <div style=" text-align: center; font-size: 12px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{ item.name }}</div>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <div style="margin: 10px 0; background-color: white; padding: 10px">
          <el-button :class="{'active': item === activeArea}" @click="loadArea(1, item)"
                     v-for="item in areas">{{ item }}</el-button>
        </div>
        <div style="margin: 10px 0; ">
          <el-row :gutter="10" v-if="tableDataArea.length > 0">
            <el-col :span="4" v-for="item in tableDataArea" >
              <el-card style="margin-bottom: 10px; cursor: pointer" @click="$router.push('/front/detail?id=' + item.id)">
                <div><el-image :src="item.img" style="width: 100%; height: 150px"></el-image></div>
                <div style=" text-align: center; font-size: 12px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{ item.name }}</div>
              </el-card>
            </el-col>
          </el-row>
          <div v-else style="padding: 20px; color: #666; min-height: 150px">
            暂无数据...
          </div>
          <div style="margin: 10px 0">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[5, 10, 20]"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
          </div>
        </div>





      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Home",
  data() {
    return {
      imgs: [
        require("@/assets/b2.png"),
        require("@/assets/b1.png"),
        require("@/assets/b3.png")
      ],
<<<<<<< HEAD
      links: ['https://www.xiaohongshu.com/explore/6502f45e000000001d0169b6',
        'https://www.xiaohongshu.com/explore/64075fa900000000110112b8',
        'https://www.xiaohongshu.com/explore/64075fa900000000110112b8'],

=======
>>>>>>> a6b71490b7c1fe880eb9589f4664de23861e54a6
      tableDataArea: [],
      tableDataScore: [],
      tableDataHot: [],
      tableDataDate: [],
      areas: ['一食堂', '二食堂', '思餐厅', '五食堂','mini餐厅'],
      pageNum: 1,
      pageSize: 8,
      total: 0,
      activeArea: ''
    }
  },
  created() {
    this.user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : {}

    this.loadScore()
    this.loadHot()
    this.loadDate()
    this.loadArea(1, this.areas[0])
  },
  methods: {
<<<<<<< HEAD

    getLinkForItem(index) {
      return this.links[index];
    },

=======
>>>>>>> a6b71490b7c1fe880eb9589f4664de23861e54a6
    loadArea(pageNum, area) {
      this.activeArea = area
      request.get("/movie/page/area", {
        params: {
          pageNum: pageNum,
          pageSize: this.pageSize,
          area: area
        }
      }).then(res => {
        this.tableDataArea = res.data.records
        this.total = res.data.total
      })
    },
    loadScore() {
      request.get("/movie/type/score").then(res => {
        this.tableDataScore = res.data
      })
    },
    loadHot() {
      request.get("/movie/type/hot").then(res => {
        this.tableDataHot = res.data
      })
    },
    loadDate() {
      request.get("/movie/type/date").then(res => {
        this.tableDataDate = res.data
      })
    },
    handleSizeChange(pageSize) {   // 改变当前每页的个数触发
      this.pageSize = pageSize
      this.load(1, this.activeArea)
    },
    handleCurrentChange(pageNum) {  // 改变当前页码触发
      this.pageNum = pageNum
      this.load(1, this.activeArea)
    }
  }
}
</script>

<style scoped>
.active {
  color: white;
  background-color: dodgerblue;
}
</style>
