<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">组织架构</el-menu-item>
      </el-menu>
      <el-card class="tree-card" style="margin-top:50px">
        <!-- 用了一个行列布局 -->
        <TreeTools :data="company" :is-root="true" />
        <hr>
        <!-- 树形结构 -->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <TreeTools slot-scope="{data}" :data="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      activeIndex: '1',
      departs: [
        {
          name: '总裁办',
          manage: 'jason',
          children: [
            {
              name: '董事会',
              manage: 'janny'
            }
          ]
        },
        {
          name: '行政部',
          manage: 'lucy'
        },
        {
          name: '人事部',
          manage: 'tom'
        }
      ],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      company: {
        name: '江苏传智播客教育科技股份有限公司',
        manage: '负责人',
        isRoot: true
      }
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
