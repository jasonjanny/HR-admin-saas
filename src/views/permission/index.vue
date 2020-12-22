<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
      >
        <el-menu-item index="1">权限管理</el-menu-item>
      </el-menu>
      <!-- 头部工具 -->
      <pageTools>
        <template slot="after">
          <el-button type="primary" icon="el-icon-plus" @click="addPermission(1,'0')">新增权限</el-button>
        </template>
      </pageTools>
      <!-- 主要内容 -->
      <el-card>
        <!-- 表格 -->
        <el-table border :data="permissionList" row-key="id" :default-expand-all="true">
          <el-table-column label="名称" prop="name" width="160px" />
          <el-table-column align="center" label="标识" prop="code" />
          <el-table-column align="center" label="描述" prop="description" />
          <el-table-column align="center" label="操作">
            <template slot-scope="{row}">
              <el-button v-if="row.type === 1" type="text" @click="addPermission(2,row.id)">添加权限</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 弹窗 -->
      <el-dialog title="权限" :visible.sync="showDialog">
        <!-- 表单 -->
        <el-form ref="perForm" label-width="120px">
          <el-form-item label="权限名称">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>

          <el-form-item label="权限标识">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>

          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width:90%" />
          </el-form-item>

          <el-form-item label="激活状态">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOk">确定</el-button>
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addPermission, getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils/index'
export default {
  data() {
    return {
      showDialog: false,
      activeIndex: '1',
      permissionList: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '' // 开启
      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const data = await getPermissionList()
      this.permissionList = transListToTreeData(data, '0')
    },
    async addPermission(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    async btnOk() {
      const data = await addPermission(this.formData)
      console.log(data)
      this.$message.success('权限添加成功')
      this.showDialog = false
      this.getPermissionList()
    },
    btnCancel() {
      this.showDialog = false
    }
  }
}
</script>

<style>
</style>
