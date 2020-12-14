<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <!-- 角色管理 -->
          <el-tab-pane name="role" label="角色管理">
            <el-row
              style="height: 80px"
              type="flex"
              justify="center"
              align="middle"
            >
              <el-col>
                <el-button
                  icon="el-icon-plus"
                  size="small"
                  type="primary"
                >新增角色
                </el-button>
              </el-col>
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="roleList">
              <el-table-column label="序号" width="120">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template slot-scope="{row}">
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <el-pagination
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                :page-size="pageSetting.pagesize"
                :page-sizes="[2, 5, 10, 20]"
                @current-change="currentChange"
                @size-change="sizeChange"
              />
            </el-row>
            <!-- 弹窗 -->
            <el-dialog title="编辑弹窗" :visible="showDialog" style="width:'50%">
              <el-form label-width="80px" :model="roleDetailForm">
                <el-form-item label="角色名称">
                  <el-input v-model="roleDetailForm.name" />
                </el-form-item>
                <el-form-item label="角色描述">
                  <el-input v-model="roleDetailForm.description" />
                </el-form-item>
              </el-form>
              <!-- 底部按钮 -->
              <el-row type="flex" justify="center">
                <el-col :span="6">
                  <el-button>取消</el-button>
                  <el-button type="primary">确定</el-button>
                </el-col>
              </el-row>
            </el-dialog>
          </el-tab-pane>
          <!-- 公司信息 -->
          <el-tab-pane name="company" label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="企业名称">
                <el-input v-model="formData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公用电话">
                <el-input v-model="formData.companyPhone" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

      </el-card>
    </div>
  </div>
</template>

<script>
import { delRole, getCompanyInfo, getRoleDetail, getRoleList } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      showDialog: false,
      roleDetailForm: {},
      formData: [],
      activeName: 'role',
      roleList: [],
      pageSetting: {
        page: 1,
        pagesize: 2
      },
      total: 0
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  watch: {
    // 本来watch是要数据发生变化时才会触发
    // 现在希望进来页面不管数据有没有变化都触发
    // 1、别的页面进来，companyId不变
    // 2、当前页面刷新，companyId变化：从无到有
    companyId: {
      handler() {
        // 如果当前页面存在companyId
        if (this.companyId) {
          // 获取公司信息
          this.getCompanyInfo()
        }
        // 否则就进行等待，等待路由守卫获取到用户的数据
      },
      immediate: true
    }
  },
  created() {
    this.getRoleList()
  },

  methods: {
    // 获取公司角色数据
    async getRoleList() {
      const { total, rows } = await getRoleList(this.pageSetting)
      this.total = total
      this.roleList = rows
    },
    // 获取公司信息
    async getCompanyInfo() {
      const data = await getCompanyInfo(this.companyId)
      this.formData = data
    },
    // 删除角色
    async delRole(id) {
      try {
        await this.$confirm('确认要删除这个角色吗？', '提示', {
          type: 'warning'
        })
        await delRole(id)
        this.$message.success('删除角色成功')
        this.getRoleList()
      } catch (error) {
        console.log(error)
      }
    },
    // 编辑角色
    async editRole(id) {
      this.roleDetailForm = await getRoleDetail(id)
      this.showDialog = true
    },
    currentChange(newPage) {
      this.pageSetting.page = newPage
      this.getRoleList()
    },
    sizeChange(newPagesize) {
      this.pageSetting.pagesize = newPagesize
      this.getRoleList()
    }
  }
}
</script>

<style>
</style>
