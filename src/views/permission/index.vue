<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">权限管理</el-menu-item>
      </el-menu>
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
