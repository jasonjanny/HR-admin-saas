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
          <el-button type="primary" icon="el-icon-plus">新增权限</el-button>
        </template>
      </pageTools>
      <!-- 主要内容 -->
      <el-card>
        <!-- 表格 -->
        <el-table border :data="permissionList">
          <el-table-column align="center" label="名称" prop="name" />
          <el-table-column align="center" label="标识" prop="code" />
          <el-table-column align="center" label="描述" prop="description" />
          <el-table-column align="center" label="操作">
            <template>
              <el-button type="text">添加</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils/index'
export default {
  data() {
    return {
      activeIndex: '1',
      permissionList: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const data = await getPermissionList()
      this.permissionList = transListToTreeData(data, '0')
    }
  }
}
</script>

<style>
</style>
