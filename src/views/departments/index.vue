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
        <el-tree :data="departs" :props="defaultProps" default-expand-all @delDepts="getDepartments">
          <TreeTools slot-scope="{data}" :data="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils/index'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      activeIndex: '1',
      departs: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      company: {
        name: '',
        manage: '负责人',
        isRoot: true
      }
    }
  },
  created() {
    // 调用获取部门列表函数
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const data = await getDepartments()
      console.log(data)
      this.company.name = data.companyName
      this.departs = transListToTreeData(data.depts, '')
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
