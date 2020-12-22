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
        <el-table border>
          <el-table-column align="center" label="名称" />
          <el-table-column align="center" label="标识" />
          <el-table-column align="center" label="描述" />
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
export default {
  data() {
    return {
      activeIndex: '1'
    }
  }
}
</script>

<style>
</style>
