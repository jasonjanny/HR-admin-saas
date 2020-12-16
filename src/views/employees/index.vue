<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
      >
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
          <el-button
            size="small"
            type="primary"
            icon="el-icon-plus"
          >新增员工</el-button>
        </template>
      </PageTools>

      <!-- 页面下方内容 -->
      <el-table border :data="employeesList">
        <el-table-column label="序号" sortable="">
          <!-- 实现序号从一开始 -->
          <!-- <el-table-column label="序号" sortable="" type="index" /> -->
          <template slot-scope="{ $index }">
            {{ (pageSetting.page - 1) * pageSetting.size + 1 + $index }}
          </template>
        </el-table-column>
        <el-table-column label="姓名" sortable="" prop="username" />
        <el-table-column label="工号" sortable="" prop="workNumber" />
        <el-table-column
          label="聘用形式"
          sortable=""
          prop="formOfEmployment"
          :formatter="formatEmployment"
        />
        <el-table-column label="部门" sortable="" prop="departmentName" />
        <el-table-column label="入职时间" sortable="">
          <template slot-scope="{ row }">
            {{ row.timeOfEntry | getNowFormatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" sortable="" prop="enableState" />
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageSetting.size"
          :page-sizes="[2, 5, 10, 20]"
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
import { delEmployee, getEmployeesList } from '@/api/employees'
import EmploymentEnum from '@/api/constant/employees'
export default {
  data() {
    return {
      activeIndex: '1',
      employeesList: [],
      pageSetting: {
        page: 1,
        size: 5
      },
      total: 0
    }
  },
  created() {
    this.getEmployeesList()
  },
  methods: {
    // 获取员工列表
    async getEmployeesList() {
      const { rows, total } = await getEmployeesList(this.pageSetting)
      this.employeesList = rows
      this.total = total
    },
    currentChange(newPage) {
      this.pageSetting.page = newPage
      this.getEmployeesList()
    },
    sizeChange(newSize) {
      this.pageSetting.size = newSize
      this.getEmployeesList()
    },
    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      const obj = EmploymentEnum.hireType.find((item) => item.id === cellValue)
      return obj ? obj.value : '其他'
    },
    // 删除员工
    async delEmployee(id) {
      try {
        await this.$confirm('确定要删除此员工吗？', '提示', {
          type: 'warning'
        })
        await delEmployee(id)
        await getEmployeesList()
        this.$message.success('成功删除员工')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
</style>
