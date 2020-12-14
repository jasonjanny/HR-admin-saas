<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="title" :visible="showDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="form" label-width="120px" :model="formdata" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formdata.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formdata.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formdata.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in people" :key="item.id" :value="item.username" :label="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formdata.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartmentsDetails } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
// 需要传入一个props变量来控制 显示或者隐藏
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    // 自定义校验部门名称
    const validateDeptsName = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      depts.some(item => item.name === value && item.pid === this.data.id) ? callback(new Error('同一部门下不能出现重复名称')) : callback()
    }

    // 自定义校验部门编码
    const validateDeptsCode = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      depts.some(item => item.code === value && value) ? callback(new Error('同一部门下不能出现重复编码')) : callback()
    }
    return {
      formdata: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: validateDeptsName }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: validateDeptsCode }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-300个字符' }
        ]
      },
      people: []
    }
  },
  computed: {
    title() {
      return this.formdata.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    // 获取部门负责人数据
    async getEmployeeSimple() {
      this.people = await getEmployeeSimple()
    },
    // 全局校验表单
    async btnOk() {
      const isOk = await this.$refs.form.validate()
      if (isOk) {
        await addDepartments({ ...this.formdata, pid: this.data.id })
        this.$emit('addDepts')
        // 利用sync修饰符关闭新增弹层
        this.$emit('update:showDialog', false)
        this.$message.success('成功添加部门')
      }
    },
    // 取消
    btnCancel() {
      this.$emit('update:showDialog', false)
      // 重置表单数据和校验字段
      this.$refs.form.resetFields()
    },
    // 数据回显
    async getDepartmentDetails() {
      // 直接将外面的数据回显
      // this.formdata = this.data
      const data = await getDepartmentsDetails(this.data.id)
      this.formdata = data
    }
  }
}
</script>

<style>

</style>
