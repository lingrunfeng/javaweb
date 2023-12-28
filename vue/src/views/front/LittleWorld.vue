<template>
  <div style="margin: 10px 0">
    <el-card>
      <div style="display: flex">
        <div style="flex: 1">
          <video :src="url"
                 style="width: 100%; height: 400px" controls>
            <p>你的浏览器不支持video标签</p>
          </video>
        </div>

        <div style="width: 300px; margin-left: 10px">
          <div :class="{'active': item.url === url}" v-for="item in movies" :key="item.id" style="margin: 10px; border-bottom: 1px dashed #ccc;
            padding-bottom: 5px; cursor: pointer" @click="choose(item)">{{ item.name }}</div>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Video",
  data() {
    return {
      movies: [],
      url: '',
    }
  },
  created() {
    request.get('/movie/type/hot').then(res => {
      this.movies = res.data
      this.url = this.movies.length ? this.movies[0].url : ''
    })
  },
  methods: {
    choose(item) {
      console.log(item.url)
      this.url = item.url
    }
  }
}
</script>

<style scoped>
.active {
  color: red;
}
</style>