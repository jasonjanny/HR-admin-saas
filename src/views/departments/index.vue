<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>
        组织架构
      </h2>
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col>
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <el-col>
                <!-- 下拉菜单 element -->
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <!-- 下拉菜单 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>

      <el-tree :data="departs" :props="defaultProps" default-expand-all="true" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departs: [
        {
          label: 'name',
          children: [
            {
              label: 'jason',
              children: [
                {
                  label: 'gender',
                  children: [
                    {
                      label: 'man'
                    }
                  ]
                }
              ]
            },
            {
              label: 'janny'
            }
          ]
        },
        {
          label: 'age',
          children: [
            {
              label: '21'
            }
          ]
        }
      ],
      defaultProps: {
        label: 'label',
        children: 'children'
      }
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
