<template>
  <div>
    <canvas id="canvas" class="canvas"> </canvas>33
  </div>
  <div class="d-flex">
    <div>
      換頁按鈕
    </div>
    <div>
      放大縮小
    </div>
    <div>
      有的沒的編輯按鈕
    </div>
    <div class="download btn"
        @click="downloadPDF()">
      完成簽署
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import pdfStore from '@/stores/pdfStore'
export default {
  data () {
    return {

    }
  },
  methods: {
    ...mapActions(pdfStore, ['downloadPDF'])

  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.canvas {
  width: 793px;
  border: 1px solid #000
}
.canvas1 {
  width: 793px;
  border: 1px solid #000
}
</style>
