<template>
  <div style="padding: 10px">

<!--    功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增</el-button>
    </div>

<!--    搜索区域-->
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入关键字" style="width: 20%" clearable></el-input>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
    </div>
    <el-table
        v-loading="loading"
        :data="tableData"
        border
        stripe
        style="width: 100%">
      <el-table-column prop="name" label="菜品名称"></el-table-column>
      <el-table-column prop="director" label="菜品负责人"></el-table-column>
      <el-table-column prop="date" label="菜品推出日期"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="zan" label="赞"></el-table-column>
      <el-table-column prop="cai" label="踩"></el-table-column>
      <el-table-column label="图片">
        <template #default="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.img" :preview-src-list="[scope.row.img]"></el-image>
        </template>
      </el-table-column>
<!--      <el-table-column label="电影下载">-->
<!--        <template #default="scope">-->
<!--          <el-button type="primary" @click="download(scope.row.url)">下载</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog title="信息" v-model="dialogVisible" width="30%">
    <el-form :model="entity" label-width="120px">
        <el-form-item label="菜品名称">
          <el-input v-model="entity.name" autocomplete="off" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="菜品负责人">
          <el-input v-model="entity.director" autocomplete="off" style="width: 80%"></el-input>
        </el-form-item>

        <el-form-item label="菜品推出日期">
          <el-date-picker style="width: 80%" v-model="entity.date" type="date" value-format="YYYY-MM-DD" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="菜品类型">
          <el-input v-model="entity.type" autocomplete="off" style="width: 80%"></el-input>
        </el-form-item>
      <el-form-item label="菜品所在食堂">
        <el-select clearable v-model="entity.area" placeholder="请选择菜品所在食堂"  style="width: 80%">
          <el-option v-for="item in ['一食堂', '二食堂', '思餐厅', '五食堂','mini餐厅']" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="图片">
          <el-upload action="http://localhost:9090/files/upload" :on-success="fileSuccessUpload" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

    </el-form>
      <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>

import request from "@/utils/request";
let url = "/movie"

export default {
  name: 'Movie',
  components: {

  },
  data() {
    return {
      loading: true,
      entity: {},
      dialogVisible: false,
      search: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      fileList: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    //上传小视频
    movieSuccessUpload(res) {
      this.entity.url = res.data;
    },
    fileSuccessUpload(res) {
      this.entity.img = res.data;
    },
    load() {
      this.loading = true
      request.get(url + "/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          search: this.search
        }
      }).then(res => {
        this.loading = false
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    add() {
      this.dialogVisible = true
      this.entity = {}
      this.fileList = []
    },
    save() {
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
              message: res.msg
            })
          }
          this.load() // 刷新表格的数据
          this.dialogVisible = false  // 关闭弹窗
        })
      }  else {  // 新增
        this.entity.score=3;
        request.post(url, this.entity).then(res => {
          console.log(res)
          if (res.code === '0') {
            this.$message({
              type: "success",
              message: "新增成功"
            })
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }

          this.load() // 刷新表格的数据
          this.dialogVisible = false  // 关闭弹窗
        })
      }

    },
    handleEdit(row) {
      this.entity = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
      this.fileList = []
    },
    handleDelete(id) {
      request.delete(url + "/" + id).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "删除成功"
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
        this.load()  // 删除之后重新加载表格的数据
      })
    },
    handleSizeChange(pageSize) {   // 改变当前每页的个数触发
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {  // 改变当前页码触发
      this.pageNum = pageNum
      this.load()
    }
  }
}
</script>
