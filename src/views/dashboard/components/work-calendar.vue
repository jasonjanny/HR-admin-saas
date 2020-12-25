<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select size="small" style="width: 120px" placeholder="请选择年份">
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
        >{{ item }}年</el-option>
      </el-select>
      <el-select
        size="small"
        style="width: 120px; margin-left: 10px"
        placeholder="请选择月份"
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
      yearList: []
    }
  },
  created() {
    this.yearList = Array.from(Array(11), (val, index) => {
      const now = new Date()
      return index + now.getFullYear() - 5
    })
  }
}
</script>

<style>
</style>
