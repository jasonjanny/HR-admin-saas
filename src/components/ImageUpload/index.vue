<template>
  <div>
    <el-upload
      list-type="picture-card"
      action="#"
      :file-list="fileList"
      :on-preview="preview"
      :on-remove="handleRemove"
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
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .disable .el-upload--picture-card {
  display: none
}
::v-deep.upload{
     img{
        object-fit: cover;
    }
}
</style>
