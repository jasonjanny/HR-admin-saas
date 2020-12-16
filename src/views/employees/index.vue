<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">员工</el-menu-item>
      </el-menu>
      <!-- 页面上方工具条 -->
      <PageTools :show-before="true">
        <!-- 左侧 -->
        <span slot="before">111</span>
        <!-- 右侧 -->
        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </PageTools>

      <!-- 页面下方内容 -->
      <el-table border :data="list">
        <el-table-column label="序号" sortable="" />
        <el-table-column label="姓名" sortable="" prop="name" />
        <el-table-column label="工号" sortable="" />
        <el-table-column label="聘用形式" sortable="" />
        <el-table-column label="部门" sortable="" />
        <el-table-column label="入职时间" sortable="" />
        <el-table-column label="账户状态" sortable="" />
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px;">
        <el-pagination
          layout="prev, pager, next"
          :total="80"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      list: [
        { name: '王大锤' },
        { name: '陈翠花' },
        { name: 'Tom' },
        { name: 'Jerry' }
      ]
    }
  }
}
</script>

<style>

</style>
