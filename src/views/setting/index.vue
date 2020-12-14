<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
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
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
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
          </el-tab-pane>
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
import { getCompanyInfo, getRoleList } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
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
  created() {
    this.getRoleList()
    this.getCompanyInfo()
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
