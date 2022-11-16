<template>
  <div class="main container position-relative">
    <div class="free text-white d-flex justify-content-center align-items-center Noto-Sans-TC fs-24">
        免費試用版
    </div>
    <div class="row">
      <div class="col ps-5 pt-5 mt-5 Noto-Sans-TC">
        <h1 class="fs-50 text-primary fw-bolder pt-5">
          小綠簽
        </h1>
        <p class="">
          護樹、永續、減碳的綠色生活<br>
          響應環保無紙化電子簽署，<br>
          省時便利又環保。
        </p>
      </div>
      <div class="col Noto-Sans-TC">
        <div class="input-pdf d-flex flex-column justify-content-center align-items-center mt-5">
          <img src="../assets/images/pdf-input.png" alt="">
          <div class="bg-gradient text-white px-5 py-2 rounded-3">
            <input type="file"
              accept="application/pdf"
              placeholder="選擇PDF檔案"
              @change="getPdf($event)"
              />
          </div>
          <p class="fs-16 my-0">或拖曳檔案到此處</p>
          <p class="fs-14 text-primary">(限10MB 內的PDF或JPG檔)</p>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-grassland-2"></div>
  <div class="bg-people4"></div>
  <div class="bg-people1"></div>
  <div class="bg-people2"></div>
  <div class="bg-people3"></div>
  <div class="bg-potted-plant"></div>
  <div class="bg-seed"></div>
</template>

<script>
export default {
  methods: {
    getPdf (e) {
      console.log(e)
      const Base64Prefix = 'data:application/pdf;base64,'
      // const add = document.querySelector('.add')
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js'

      // 使用原生 FileReader 轉檔
      function readBlob (blob) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.addEventListener('load', () => resolve(reader.result))
          reader.addEventListener('error', reject)
          reader.readAsDataURL(blob)
        })
      }

      async function printPDF (pdfData) {
        // 將檔案處理成 base64
        // console.log(pdfData)
        pdfData = await readBlob(pdfData)
        // console.log(pdfData)
        // 將 base64 中的前綴刪去，並進行解碼
        const data = atob(pdfData.substring(Base64Prefix.length))
        // console.log(data)
        // 利用解碼的檔案，載入 PDF 檔及第一頁
        const pdfDoc = await pdfjsLib.getDocument({ data }).promise
        // console.log(pdfDoc)
        const pdfPage = await pdfDoc.getPage(1)
        // console.log(pdfPage)
        // 設定尺寸及產生 canvas
        const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio })
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        // 設定 PDF 所要顯示的寬高及渲染
        canvas.height = viewport.height
        canvas.width = viewport.width
        const renderContext = {
          canvasContext: context,
          viewport
        }
        const renderTask = pdfPage.render(renderContext)

        // 回傳做好的 PDF canvas
        return renderTask.promise.then(() => canvas)
      }

      async function pdfToImage (pdfData) {
        // 設定 PDF 轉為圖片時的比例
        // console.log(window.devicePixelRatio)
        const scale = 1 / window.devicePixelRatio
        // 回傳圖片
        return new fabric.Image(pdfData, {
          id: 'renderPDF',
          scaleX: scale,
          scaleY: scale
        })
      }

      // 此處 canvas 套用 fabric.js
      const canvas = new fabric.Canvas('canvas')

      async function go (e) {
        console.log(e)
        canvas.requestRenderAll()
        const pdfData = await printPDF(e.target.files[0])
        const pdfImage = await pdfToImage(pdfData)
        // 透過比例設定 canvas 尺寸
        canvas.setWidth(pdfImage.width / window.devicePixelRatio)
        canvas.setHeight(pdfImage.height / window.devicePixelRatio)
        // 將 PDF 畫面設定為背景
        canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas))
      }
      go(e)
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  background: rgba(240, 240, 240, 0.58);
  width: 1036px;
  height: 558px;
  border-radius: 34px;
}
.free {
  position: absolute;
  width: 225px;
  height: 62px;
  top: 0%;
  left: 0%;
  background: linear-gradient(180deg, #35A483 0%, #077854 100%);
  border-radius: 34px 0px;
}
.input-pdf {
  width: 417px;
  height: 376px;
  padding: 20px 10px 82px;
  gap: 20px;
  background: #FFFFFF;
  border: 2px dashed #B7B7B7;
  border-radius: 26px;
}
</style>
