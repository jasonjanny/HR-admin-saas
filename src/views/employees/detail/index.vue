<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form ref="userForm" label-width="120px" style="margin-left: 200px; margin-top:30px" :model="formData" :rules="rules">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="formData.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="newPassword">
                <el-input v-model="formData.newPassword" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateAccount">更新</el-button>
                <el-button @click="$router.back()">取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="detail">
            222
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="job">
            333
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
export default {
  data() {
    return {
      userId: this.$route.params.id,
      formData: {
        username: '',
        newPassword: ''
      },
      rules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      const data = await getUserDetailById(this.userId)
      this.formData = data
      console.log(data)
    },
    async updateAccount() {
      try {
        await this.$refs.userForm.validate()
        await saveUserDetailById({ ...this.formData, password: this.formData.newPassword })
        this.$message.success('用户数据更新成功')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
</style>
