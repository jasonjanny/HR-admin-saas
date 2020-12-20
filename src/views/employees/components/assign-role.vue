<template>
  <div>
    <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
      <!-- 分配角色 -->
      <el-checkbox-group v-model="roleIds">
        <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      roleIds: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList()
      this.list = rows
    },
    async getRoleDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds
    },
    btnCancel() {
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-checkbox{
    margin: 8px;
}
</style>
