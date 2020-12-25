<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" style="width: 120px" placeholder="请选择年份" @change="changeDate">
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
        >{{ item }}年</el-option>
      </el-select>
      <el-select
        v-model="currentMonth"
        size="small"
        style="width: 120px; margin-left: 10px"
        placeholder="请选择月份"
        @change="changeDate"
      >
        <el-option
          v-for="item in 12"
          :key="item"
          :label="item"
          :value="item"
        >{{ item }}月</el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template slot="dateCell" slot-scope="scope" class="content">
        <div class="date-content">
          <span class="text">{{ scope.data.day | getDay }}</span>
          <span v-if="isWeek(scope.date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(value) {
      const date = value.split('-')[2]
      return date.startsWith('0') ? date.substr(1) : date
    }
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      currentDate: null,
      currentMonth: null,
      currentYear: null,
      yearList: []
    }
  },
  created() {
    // 获取当前年份和月份
    this.currentYear = this.startDate.getFullYear()
    this.currentMonth = this.startDate.getMonth() + 1
    this.yearList = Array.from(Array(11), (val, index) => {
      const now = new Date()
      return index + now.getFullYear() - 5
    })
  },
  methods: {
    changeDate() {
      const year = this.currentYear
      const month = this.currentMonth
      const dateStr = `${year}-${month}-1`
      //   console.log(dateStr)
      this.currentDate = new Date(dateStr)
    },
    isWeek(value) {
      return value.getDay() === 6 || value.getDay() === 0
    }
  }
}
</script>

<style  lang="scss" scoped>
 ::v-deep .el-calendar-day {
  height:  auto;
 }
 ::v-deep .el-calendar-table__row td,::v-deep .el-calendar-table tr td:first-child,  ::v-deep .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 ::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 ::v-deep .el-calendar__header {
   display: none
 }
</style>
