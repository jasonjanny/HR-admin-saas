<template>
  <div>
    <el-upload
      list-type="picture-card"
      action="#"
      :file-list="fileList"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-upload="beforeUpload"
      :class="{disable:fileUpload }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片预览" :visible.sync="showDialog">
      <img :src="imgUrl" alt="" style="width:100%;">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
      imgUrl: '',
      fileList: [
        {
          url:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608375786527&di=8318ac46843cc7e772831c1cc6a03f62&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20160311%2Fmp62970613_1457663723054_6.jpeg'
        }
      ]
    }
  },
  computed: {
    // 设定一个计算属性 判断是否已经上传完了一张
    fileUpload() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.showDialog = true
      this.imgUrl = file.url
    },
    handleRemove(file, fileList) {
      this.fileList = [...fileList]
    },
    handleChange(file, fileList) {
      this.fileList = [...fileList]
    },
    beforeUpload(file) {
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 2 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过2M')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .disable .el-upload--picture-card {
  display: none
}
 .uploader {
    ::v-deep img{
        object-fit: cover
    }
}
</style>
