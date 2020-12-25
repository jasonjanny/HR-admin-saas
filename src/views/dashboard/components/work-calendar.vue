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
    <el-calendar v-model="currentDate" />
  </div>
</template>

<script>
export default {
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
    }
  }
}
</script>

<style>
</style>
