<template>
<canvas id="c" class="canvas test"></canvas>
</template>

<script>
import { mapState, mapActions, mapWritableState } from 'pinia'
import pdfStore from '@/stores/pdfStore'
export default {
  data () {
    return {
    }
  },
  computed: {
    // ...mapState(pdfStore, ['event', 'totalPage', 'canvas']),
    // ...mapWritableState(pdfStore, ['pageNum', 'scaleXY'])
  },
  methods: {
    // ...mapActions(pdfStore, ['downloadPDF', 'analyzePDF', 'prevPage', 'nextPage', 'zoomOut', 'zoomIn', 'addImage', 'addDate'])
  },
  mounted () {
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
