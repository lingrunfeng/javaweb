<template>
  <div style="padding: 10px">

<!--    功能区域-->


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
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="内容">
        <template #default="scope">
          <div style=" text-overflow:ellipsis;width:100%;"> {{ scope.row.content.length > 100 ?
              scope.row.content.substring(0, 100) + '...' : scope.row.content}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="评论人"></el-table-column>
      <el-table-column prop="time" label="评论时间"></el-table-column>
<!--      <el-table-column prop="parentId" label="父ID"></el-table-column>-->
      <!--      <el-table-column prop="foreignId" label="关联id"></el-table-column>-->
      <!--      <el-table-column prop="type" label="类型"></el-table-column>-->

      <el-table-column label="操作">
        <template #default="scope">
<!--          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>-->
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
        <el-form-item label="内容">
          <el-input v-model="entity.content" autocomplete="off" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="评论人">
          <el-input v-model="entity.username" autocomplete="off" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="评论时间">
          <el-date-picker style="width: 80%" v-model="entity.time" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="父ID">
          <el-input v-model="entity.parentId" autocomplete="off" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="关联id">
          <el-input v-model="entity.foreignId" autocomplete="off" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="entity.type" autocomplete="off" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="entity.title" autocomplete="off" style="width: 80%"></el-input>
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
let url = "/message"

export default {
  name: 'Message',
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
      tableData: []
    }
  },
  created() {
    this.load()
  },
  methods: {
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
