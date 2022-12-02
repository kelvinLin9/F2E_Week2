<template>
  <div class="canvas test">
    <canvas id="c" class="test" width="400" height="400"></canvas>
  </div>
  <button class="add-btn" @click="addDate">7788995</button>

</template>

<script>
import { mapState, mapActions, mapWritableState } from 'pinia'
import pdfStore from '@/stores/pdfStore'
import moment from 'moment'
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
    addDate (canvasIsShit) {
      const today = moment().format('YYYY/MM/DD')
      const btn = document.querySelector('.add-btn')
      btn.addEventListener('click', (e) => {
        const date = new fabric.Text(today, {
          top: 200,
          scaleX: 1,
          scaleY: 1
        })
        canvasIsShit.add(date)
      })
      canvasIsShit.on('mouse:down', canvasOnMouseDown)
      function canvasOnMouseDown (opt) {
      // 判断：右键，且在元素上右键
      // opt.button: 1-左键；2-中键；3-右键
      // 在画布上点击：opt.target 为 null
        if (opt.button === 3 && opt.target) {
        // 获取当前元素
          console.log(opt.target)
          canvasIsShit.remove(opt.target)
        }
      }
    }
  },
  mounted () {
    const canvasIsShit = new fabric.Canvas('c', {
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true // 禁止默认右键菜单
    })
    canvasIsShit.setBackgroundImage(
      this.pdfImage,
      canvasIsShit.renderAll.bind(canvasIsShit),
      {
        angle: 15 // 旋转背景图
      }
    )
    this.addDate(canvasIsShit)
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
