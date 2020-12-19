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
      :http-request="upload"
      :class="{disable:fileUpload }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" :percentage="percent" style="width: 180px" />
    <el-dialog title="图片预览" :visible.sync="showDialog">
      <img :src="imgUrl" alt="" style="width:100%">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云的包
import { cloundKey } from '@/config-cos'
// 实例化
const cos = new COS(cloundKey)
export default {
  data() {
    return {
      currentUid: '',
      percent: 0,
      showPercent: false,
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
      // 记住当前的uid
      this.currentUid = file.uid
      this.showPercent = true
      return true
    },
    upload(params) {
      // 上传文件到腾讯云
      cos.putObject({
        // 配置
        Bucket: 'moonlight-1304560084', // 存储桶名称
        Region: 'ap-guangzhou', // 存储桶地域
        Key: params.file.name, // 文件名作为key
        StorageClass: 'STANDARD', // 此类写死
        Body: params.file, // 将本地的文件赋值给腾讯云配置
        // 进度条
        onProgress: (params) => {
          this.percent = Math.ceil(params.percent * 100)
        }
      }, (err, data) => {
        // 需要判断错误与成功
        if (!err && data.statusCode === 200) {
          // 如果没有失败表示成功了
          // 此时认为上传成功了
          this.fileList = this.fileList.map(item => {
            if (item.uid === this.currentUid) {
              // upload为true表示 该图片已经成功上传到服务器，地址已经是腾讯云的地址了  就不可以执行保存了
              return { url: 'http://' + data.Location, upload: true } // 将本地的地址换成腾讯云地址
            }
            return item
          })
          this.showPercent = false
        }
      })
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
