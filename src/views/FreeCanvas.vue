<template>
  <div class="canvas test">
    <canvas id="c" class="test" width="400" height="400"></canvas>
  </div>
  <button class="btn" @click="addDate">7788995</button>

</template>

<script>
import { mapState, mapActions, mapWritableState } from 'pinia'
import pdfStore from '@/stores/pdfStore'
import moment from 'moment'
const canvasIsShit = new fabric.Canvas('c')
export default {
  data () {
    return {
      // canvasIsShit: null
    }
  },
  computed: {
    ...mapState(pdfStore, ['event', 'totalPage', 'canvas', 'pdfImage']),
    ...mapWritableState(pdfStore, ['pageNum', 'scaleXY'])
  },
  methods: {
    ...mapActions(pdfStore, ['downloadPDF', 'analyzePDF', 'prevPage', 'nextPage', 'zoomOut', 'zoomIn', 'addImage', 'addDate']),
    addDate () {
    // 创建一个长方形
      const canvasIsShit = new fabric.Canvas('c')
      const rect = new fabric.Rect({
        top: 30, // 距离容器顶部 30px
        left: 30, // 距离容器左侧 30px
        width: 100, // 宽 100px
        height: 60, // 高 60px
        fill: 'red' // 填充 红色
      })
      rect.set({
        borderColor: 'red', // 边框颜色
        cornerColor: 'green', // 控制角颜色
        cornerSize: 10, // 控制角大小
        transparentCorners: false // 控制角填充色不透明
      })

      // 在canvas画布中加入矩形（rect）。add是“添加”的意思
      console.log(canvasIsShit)
      canvasIsShit.add(rect)
    }
  },
  mounted () {
    console.log(canvasIsShit)
    canvasIsShit.setBackgroundImage(
      this.pdfImage,
      canvasIsShit.renderAll.bind(canvasIsShit),
      {
        angle: 15 // 旋转背景图
      }
    )
    const today = moment().format('YYYY/MM/DD')
    const date = new fabric.Text(today, {
      top: 200,
      scaleX: 1,
      scaleY: 1
    })
    canvasIsShit.add(date)
  }
}
</script>

<style lang="scss" scoped>
.canvas{
  position: relative;
  width: 100%;
  height: 626px;
  overflow: auto;
  display: flex;
  justify-content: center;
}
</style>
