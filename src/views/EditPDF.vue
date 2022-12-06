<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <p class="mt-5 text-primary fs-16 Noto-Sans-TC">
      點擊滑鼠右鍵可刪除插入圖片
    </p>
    <!-- PDF -->
    <div class="canvas">
      <canvas id="canvas" class="test"></canvas>
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
                  @click="toggleSignHistory(), signHistoryView = !signHistoryView"
          >
            <img src="../assets/images/簽名1.png" alt="簽名1"
                :class="{'d-none':btnName === 'sign'}"
            >
            <img src="../assets/images/簽名2.png" alt="簽名2"
                :class="{'d-none':btnName !== 'sign'}"
            >
          </button>
          <p class="fs-12 text-gray"
            :class="{'text-primary':btnName === 'sign'}"
          >簽名</p>
        </div>
        <div class="d-flex justify-content-center align-items-center flex-column">
          <button class="edit-btn"
                  @click="btnName = 'check'"
          >
            <img src="../assets/images/勾選1.png" alt="勾選1"
                :class="{'d-none':btnName === 'check'}"
            >
            <img src="../assets/images/勾選2.png" alt="勾選2"
                :class="{'d-none':btnName !== 'check'}"
            >
          </button>
          <p class="fs-12 text-gray"
            :class="{'text-primary':btnName === 'check'}"
          >勾選</p>
        </div>
        <div class="d-flex justify-content-center align-items-center flex-column">
          <button class="edit-btn"
                  @click="btnName = 'date', addDate()"
          >
            <img src="../assets/images/日期1.png" alt="日期1"
                :class="{'d-none':btnName === 'date'}"
            >
            <img src="../assets/images/日期2.png" alt="日期2"
                :class="{'d-none':btnName !== 'date'}"
            >
          </button>
          <p class="fs-12 text-gray"
            :class="{'text-primary':btnName === 'date'}"
          >插入日期</p>
        </div>
        <div class="d-flex justify-content-center align-items-center flex-column">
          <button class="edit-btn"
                  @click="addText()"
          >
            <img src="../assets/images/文字1.png" alt="文字1"
                :class="{'d-none':btnName === 'word'}"
            >
            <img src="../assets/images/文字2.png" alt="文字2"
                :class="{'d-none':btnName !== 'word'}"
            >
          </button>
          <p class="fs-12 text-gray"
            :class="{'text-primary':btnName === 'word'}"
          >插入文字</p>
        </div>
      </div>
      <div class="download btn d-flex justify-content-center align-items-center fs-18 text-white"
          @click="save()">
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
      btnName: '',
      signHistoryView: false
    }
  },
  computed: {
    ...mapState(pdfStore, ['event', 'totalPage', 'canvas']),
    ...mapWritableState(pdfStore, ['pageNum', 'scaleXY', 'fromHistoryData'])
  },
  methods: {
    ...mapActions(pdfStore, ['getPDFHistory', 'downloadPDF', 'renderPage', 'prevPage', 'nextPage', 'zoomOut', 'zoomIn', 'addImage', 'addDate', 'addTextToPDF', 'removeCanvas', 'fromHistory']),
    addText () {
      this.btnName = 'word'
      this.$swal.fire({
        title: '請輸入文字',
        input: 'textarea',
        inputAttributes: {
          autocapitalize: 'off'
        },
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        customClass: {
          title: 'fs-16',
          popup: 'popup',
          input: 'input-alert fs-16',
          confirmButton: 'confirmButton fs-18',
          cancelButton: 'cancelButton fs-18 text-primary'
        }
      }).then((result) => {
        this.addTextToPDF(result)
        this.btnName = ''
      }).catch(() => {
        this.btnName = ''
      })
      // 右鍵刪除元素 先留著 等this.canvas問題解決
      // this.canvas.on('mouse:down', canvasOnMouseDown)
      // function canvasOnMouseDown (opt) {
      //   if (opt.button === 3 && opt.target) {
      //     console.log(opt.target)
      //     this.canvas.remove(opt.target)
      //   }
      // }
    },
    toggleSignHistory () {
      if (this.btnName === 'sign') {
        this.btnName = ''
      } else {
        this.btnName = 'sign'
      }
    },
    save () {
      this.$swal.fire({
        title: '請輸入檔名',
        input: 'textarea',
        inputAttributes: {
          autocapitalize: 'off'
        },
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: '下載',
        cancelButtonText: '取消',
        customClass: {
          title: 'fs-16',
          popup: 'popup',
          input: 'input-alert fs-16',
          confirmButton: 'confirmButton fs-16',
          cancelButton: 'cancelButton fs-16 text-primary'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.downloadPDF(result.value)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getPDFHistory()
    if (this.fromHistoryData) {
      this.fromHistory()
    } else {
      this.renderPage()
      this.removeCanvas()
    }
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
