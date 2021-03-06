<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="addFrom" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择入职时间"
          @change="checkTwoData"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option v-for="item in EmploymentEnum.hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
          @focus="getDepartments"
        />
        <div v-if="treeData.length" class="treeWrapper">
          <el-tree
            class="treeDepartment"
            :data="treeData"
            :props="{ label: 'name' }"
            default-expand-all
            @node-click="selectNode"
          />
        </div>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择转正时间"
          @change="checkTwoData"
        />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils/index'
import { addEmployee } from '@/api/employees'
import EmploymentEnum from '@/api/constant/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const checkTime = (rule, value, callback) => {
      if (!this.formData.timeOfEntry || !this.formData.correctionTime) {
        callback()
      } else {
        const entryTime = this.formData.timeOfEntry.getTime()
        const correctionTime = this.formData.correctionTime.getTime()
        correctionTime > entryTime ? callback() : callback(new Error('入职之前不能转正'))
      }
    }
    return {
      EmploymentEnum,
      // 树形数据
      treeData: [],
      // 表单数据
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间', trigger: 'blur' },
          { trigger: 'change', validator: checkTime },
          { trigger: 'blur', validator: checkTime }
        ],
        correctionTime: [
          { trigger: 'change', validator: checkTime },
          { trigger: 'blur', validator: checkTime }
        ]
      }
    }
  },
  methods: {
    async getDepartments() {
      const { depts } = await getDepartments()
      this.treeData = transListToTreeData(depts, '')
    },
    selectNode(node) {
      this.formData.departmentName = node.name
      this.treeData = []
    },
    async btnOk() {
      try {
        await this.$refs.addFrom.validate()
        await addEmployee(this.formData)
        this.$emit('update:showDialog', false)
        // this.$emit('addEmployee')
        this.$message.success('员工新增成功')
        // this.$parent.showDialog = false
        this.$parent.getEmployeesList()
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.addFrom.resetFields() // 重置校验结果
      this.$emit('update:showDialog', false)
    },
    // 用户表单转正时间和入职时间的协作校验
    checkTwoData() {
      this.$refs.addFrom.validateField(['timeOfEntry', 'correctionTime'])
    }
  }
}
</script>

<style lang="scss" scoped>
.treeWrapper {
  width: 300px;
  height: 300px;
  border: 1px solid #eee;
  overflow: hidden;
  position: absolute;
  left: 0;
  z-index: 999;
  .treeDepartment {
    width: 317px;
    height: 100%;
    overflow-y: scroll;
  }
}
</style>
