<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
      >
        <el-menu-item index="1">组织架构</el-menu-item>
      </el-menu>
      <el-card class="tree-card" style="margin-top: 50px">
        <!-- 用了一个行列布局 -->
        <TreeTools :data="company" :is-root="true" />
        <hr>
        <!-- 树形结构 -->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <TreeTools
            slot-scope="{ data }"
            :data="data"
            @addDepts="addDepts"
            @delDepts="getDepartments"
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <!-- 放置新增弹层组件  -->
    <AddDept
      :show-dialog.sync="showDialog"
      :data="node"
      @addDepts="getDepartments"
    />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils/index'
import AddDept from '@/views/departments/components/add-dept'
export default {
  components: {
    TreeTools,
    AddDept
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
        manager: '负责人',
        id: '',
        isRoot: true
      },
      showDialog: false,
      node: {}
    }
  },
  created() {
    // 调用获取部门列表函数
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const data = await getDepartments()
      this.company.name = data.companyName
      this.departs = transListToTreeData(data.depts, '')
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
