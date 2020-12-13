<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px;width:100%">
    <el-col>
      <span>{{ data.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ data.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="operateDepts">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    operateDepts(type) {
      if (type === 'add') {
        // 添加子部门
        this.$emit('addDepts', this.data)
      } else if (type === 'edit') {
        // 编辑部门

      } else {
        // 删除部门
        this.$confirm('确定要删除该部门吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 如果点击了确定就会进入then
          // 返回promise对象
          return delDepartments(this.data.id).then(() => {
            this.$emit('delDepts')
            this.$message.success('删除成功')
          }).catch(() => {})
        }).catch(() => {})
      }
    }
  }

}
</script>

<style>

</style>
