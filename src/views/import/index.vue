<template>
  <div>
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
import UploadExcel from '@/components/uploadExcel'
import { importEmployee } from '@/api/employees'
export default {
  components: {
    UploadExcel
  },
  methods: {
    async onSuccess({ header, results }) {
    //   console.log(results)
      // 数据字典
      const dictionary = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }

      // 对上传的文件进行遍历
      const newData = results.map(item => {
        const newItem = {}
        // 数据转换
        for (const key in item) {
          const newKey = dictionary[key]
          let newValue = item[key]
          //   判断是否是入职时间和转正时间
          if (newKey === 'timeOfEntry' || newKey === 'correctionTime') {
            newValue = new Date(this.formatDate(newValue, '/'))
          }
          newItem[newKey] = newValue
        }
        return newItem
      })
      //   console.log(newData)

      // 发送导入员工请求
      await importEmployee(newData)
      this.$message.success('员工导入成功')
    },
    // 专用于导入时间后的时间处理
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
