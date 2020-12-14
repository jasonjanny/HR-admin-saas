<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane name="role" label="角色管理">
            <el-row style="height:80px" type="flex" justify="center" align="middle">
              <el-col>
                <el-button
                  icon="el-icon-plus"
                  size="small"
                  type="primary"
                >新增角色
                </el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane name="company" label="公司信息">公司信息</el-tab-pane>
        </el-tabs>
        <!-- 表格 -->
        <el-table border="" :data="roleList">
          <el-table-column label="序号" width="120">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="角色名称" width="240" prop="name" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <el-button size="small" type="success">分配权限</el-button>
            <el-button size="small" type="primary">编辑</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleList } from '@/api/setting'
export default {
  data() {
    return {
      activeName: 'role',
      roleList: [],
      pageSetting: {
        page: 1,
        pagesize: 5
      },
      total: 0
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.pageSetting)
      this.total = total
      this.roleList = rows
      console.log(this.roleList)
    }
  }
}
</script>

<style>
</style>
