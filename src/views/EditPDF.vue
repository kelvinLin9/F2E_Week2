<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <!-- PDF -->
    <div class="canvas">
      <canvas id="canvas"></canvas>
    </div>
    <!-- 編輯區 -->
    <div class="edit-pdf d-flex justify-content-center align-items-center bg-white">
      <div class="page d-flex justify-content-center align-items-center">
        <button class="btn">
          <img src="../assets/images/prev.png" alt="上一頁"
            @click="prevPage()">
        </button>
        <div class="text-center">
          {{ pageNum }} / {{ totalPage }}
        </div>
        <button class="btn">
          <img src="../assets/images/next.png" alt="下一頁"
              @click="nextPage()">
        </button>
      </div>
      <div class="scale d-flex justify-content-center align-items-center">
        <button class="btn">
          <img src="../assets/images/zoom-out.png" alt="縮小"
              @click="zoomOut()">
        </button>
        <div class="text-center">
          {{ scaleXY }} %
        </div>
        <button class="btn">
          <img src="../assets/images/zoom-in.png" alt="放大"
              @click="zoomIn()">
        </button>
      </div>
      <div class="other d-flex justify-content-center align-items-center">
        <div class="d-flex justify-content-center align-items-center flex-column">
          <button class="edit-btn"
                  @click="btn = 'sign', signHistoryView = !signHistoryView"
          >
            <img src="../assets/images/簽名1.png" alt="簽名1"
                :class="{'d-none':btn === 'sign'}"
            >
            <img src="../assets/images/簽名2.png" alt="簽名2"
                :class="{'d-none':btn !== 'sign'}"
            >
          </button>
          <p class="fs-12 text-gray"
            :class="{'text-primary':btn === 'sign'}"
          >簽名</p>
        </div>
        <div class="d-flex justify-content-center align-items-center flex-column">
          <button class="edit-btn"
                  @click="btn = 'check'"
          >
            <img src="../assets/images/勾選1.png" alt="勾選1"
                :class="{'d-none':btn === 'check'}"
            >
            <img src="../assets/images/勾選2.png" alt="勾選2"
                :class="{'d-none':btn !== 'check'}"
            >
          </button>
          <p class="fs-12 text-gray"
            :class="{'text-primary':btn === 'check'}"
          >勾選</p>
        </div>
        <div class="d-flex justify-content-center align-items-center flex-column">
          <button class="edit-btn"
                  @click="btn = 'date', addDate()"
          >
            <img src="../assets/images/日期1.png" alt="日期1"
                :class="{'d-none':btn === 'date'}"
            >
            <img src="../assets/images/日期2.png" alt="日期2"
                :class="{'d-none':btn !== 'date'}"
            >
          </button>
          <p class="fs-12 text-gray"
            :class="{'text-primary':btn === 'date'}"
          >日期</p>
        </div>
        <div class="d-flex justify-content-center align-items-center flex-column">
          <button class="edit-btn"
                  @click="btn = 'word', addText()"
          >
            <img src="../assets/images/文字1.png" alt="文字1"
                :class="{'d-none':btn === 'word'}"
            >
            <img src="../assets/images/文字2.png" alt="文字2"
                :class="{'d-none':btn !== 'word'}"
            >
          </button>
          <p class="fs-12 text-gray"
            :class="{'text-primary':btn === 'word'}"
          >插入文字</p>
        </div>
      </div>
      <div class="download btn d-flex justify-content-center align-items-center fs-18 text-white"
          @click="downloadPDF()">
        完成簽署
      </div>
    </div>
  </div>
  <div class="sign-history">
      <SignHistory v-if="signHistoryView"/>
  </div>
</template>

<script>
import SignHistory from '@/components/SignHistory.vue'
import { mapState, mapActions, mapWritableState } from 'pinia'
import pdfStore from '@/stores/pdfStore'
export default {
  components: {
    SignHistory
  },
  data () {
    return {
      btn: '',
      signHistoryView: false
    }
  },
  computed: {
    ...mapState(pdfStore, ['event', 'totalPage', 'canvas']),
    ...mapWritableState(pdfStore, ['pageNum', 'scaleXY'])
  },
  methods: {
    ...mapActions(pdfStore, ['downloadPDF', 'analyzePDF', 'prevPage', 'nextPage', 'zoomOut', 'zoomIn', 'addImage', 'addDate']),
    addText () {
      this.$swal.fire({
        input: 'textarea',
        inputAttributes: {
          autocapitalize: 'off'
        },
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        customClass: {
          popup: 'popup',
          input: 'input-alert fs-16',
          confirmButton: 'confirmButton fs-18',
          cancelButton: 'cancelButton fs-18 text-primary'
        }
      }).then((result) => {
        const text = new fabric.Text(result.value, (image) => {
          image.top = 10
          image.left = 10
          image.scaleX = 1
          image.scaleY = 1
        })
        this.canvas.add(text)
      })
    }
  },
  mounted () {
    this.analyzePDF()
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
.edit-pdf {
  width: 100%;
  height: 92px;
  position:absolute;
  bottom: 0px;
  z-index: 10;
}
.page {
  width: 199px;
  height: 58px;
}
.scale {
  width: 199px;
  height: 58px;
}
.other {
  width: 343px;
  height: 72px;
}
.download {
  width: 183px;
  height: 56px;
  background: linear-gradient(180deg, #35A483 0%, #077854 100%);
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.11);
  border-radius: 16px;
  margin-left: 50px;
}
.edit-btn {
  border: #f7f8f8;
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 9px;
  margin: 20px 12px 2px 12px;
}
.sign-history {
  position: absolute;
  top: 50%;
  right: 1%;
  transform: translate(0%, -50%);
  background-color: #f0f0f0;
  width: 343px;
  max-height: 321px;
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.11);
  border-radius: 16px;
  z-index: 100;
  overflow: auto;
}
</style>
