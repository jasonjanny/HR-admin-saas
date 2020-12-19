<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form label-width="120px" style="margin-left: 200px; margin-top:30px">
              <el-form-item label="姓名:">
                <el-input v-model="formData.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input v-model="formData.newPassword" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary">更新</el-button>
                <el-button>取消</el-button>
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
export default {
  data() {
    return {
      userId: this.$route.params.id,
      formData: {
        username: '',
        newPassword: ''
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
    }
  }
}
</script>

<style>
</style>
