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
          <el-button size="small" type="warning" @click="$router.push('/import?type=employee')">导入</el-button>
          <el-button size="small" type="danger" @click="exportData">导出</el-button>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-plus"
            @click="showDialog = true"
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
        <el-table-column label="头像" align="center" width="100px">
          <template slot-scope="{row}">
            <img
              slot="reference"
              v-imageerror="require('@/assets/common/bigUserHeader.png')"
              :src="row.staffPhoto "
              style="border-radius: 50%; width: 80px; height: 80px; padding: 10px"
              alt=""
            >
          </template>
        </el-table-column>
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
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" sortable="" prop="enableState">
          <template slot-scope="{ row }">
            <!-- 根据当前状态来确定 是否打开开关 -->
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="$router.push('/employees/detail/' + row.id)">查看</el-button>
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
      <!-- 弹窗 -->
      <AddEmployee :show-dialog.sync="showDialog" :add-employee="getEmployeesList" />
    </div>
  </div>
</template>

<script>
import { delEmployee, getEmployeesList } from '@/api/employees'
import EmploymentEnum from '@/api/constant/employees'
import AddEmployee from '@/views/employees/components/add-employee'
import { formatDate } from '@/filters'
export default {
  components: {
    AddEmployee
  },
  data() {
    return {
      showDialog: false,
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
        await this.getEmployeesList()
        this.$message.success('成功删除员工')
      } catch (error) {
        console.log(error)
      }
    },

    // 导出数据
    async exportData() {
      // 表头对应关系
      const dictionary = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 全部的表格数据
      const allPage = {
        page: 1,
        size: this.total
      }
      // 懒加载
      const excel = await import('@/vendor/Export2Excel')
      // 获取表头数据
      const header = Object.keys(dictionary)
      // console.log(header) ["姓名", "手机号", "入职日期", "聘用形式", "转正日期", "工号", "部门"]

      // 获取全部的表格数据
      const { rows } = await getEmployeesList(allPage)
      console.log(rows)

      const data = rows.map(item => {
        // 数组
        const array = []
        // 遍历字典
        for (const key in dictionary) {
          const enKey = dictionary[key]
          let enValue = item[enKey]
          // 额外处理时间和聘用形式
          // 时间处理
          if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
            enValue = formatDate(enValue)
          }
          // 聘用形式处理
          if (enKey === 'formOfEmployment') {
            const obj = EmploymentEnum.hireType.find(item => item.id === enValue)
            enValue = obj ? obj.value : '其他形式'
          }
          array.push(enValue)
        }
        return array
      })

      // 转换成excel导出
      excel.export_json_to_excel({
        header,
        data,
        filename: '员工信息表'
      })
    }
  }
}
</script>

<style>
</style>
