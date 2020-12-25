<template>
  <!-- 放置一个图标 -->
  <div>
    <!-- 放置一个svg的图标 -->
    <svg-icon icon-class="fullscreen" style="color:#fff; width: 20px; height: 20px" @click="fullscreen" />
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  methods: {
    fullscreen() {
      if (ScreenFull.isEnabled) {
        this.$message.success('切换成功')
        ScreenFull.toggle()
      } else {
        this.$message.warning('此时不支持全屏')
      }
    }
  }
}
</script>

<style>

</style>
