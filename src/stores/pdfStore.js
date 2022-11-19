import { defineStore } from 'pinia'
import router from '../router'

export default defineStore('pdfStore', {
  state: () => ({
    event: {},
    pageNum: 1,
    totalPage: 0
  }),
  actions: {
    inputPDF (e) {
      this.event = e
      this.analyzePDF()
      this.gotoSign()
    },
    // 使用原生 FileReader 轉檔
    readBlob (blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result))
        reader.addEventListener('error', reject)
        reader.readAsDataURL(blob)
      })
    },
    async printPDF (pdfData) {
      const Base64Prefix = 'data:application/pdf;base64,'
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js'
      // 將檔案處理成 base64
      pdfData = await this.readBlob(pdfData)
      // 將 base64 中的前綴刪去，並進行解碼
      const data = atob(pdfData.substring(Base64Prefix.length))
      // 利用解碼的檔案，載入 PDF 檔及第一頁
      const pdfDoc = await pdfjsLib.getDocument({ data }).promise
      console.log('總共幾頁', pdfDoc.numPages)
      this.totalPage = pdfDoc.numPages
      const pdfPage = await pdfDoc.getPage(this.pageNum)
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
    },
    async pdfToImage (pdfData) {
      // 設定 PDF 轉為圖片時的比例
      const scale = 1 / window.devicePixelRatio
      // 回傳圖片
      return new fabric.Image(pdfData, {
        id: 'renderPDF',
        scaleX: scale,
        scaleY: scale
      })
    },
    async analyzePDF (image) {
      // 載入讀取畫面
      // 此處 canvas 套用 fabric.js
      const canvas = new fabric.Canvas('canvas')
      canvas.requestRenderAll()
      const pdfData = await this.printPDF(this.event.target.files[0])
      const pdfImage = await this.pdfToImage(pdfData)
      this.renderPage(canvas, pdfImage, image)
    },
    // 渲染(canvas, pdfImage)
    async renderPage (canvas, pdfImage, image) {
      // 透過比例設定 canvas 尺寸
      canvas.setWidth(pdfImage.width / window.devicePixelRatio)
      canvas.setHeight(pdfImage.height / window.devicePixelRatio)
      // 將 PDF 畫面設定為背景
      canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas))
      if (image) {
        fabric.Image.fromURL(image, function (image) {
          // 設定簽名出現的位置及大小，後續可調整
          image.top = 400
          image.scaleX = 0.5
          image.scaleY = 0.5
          canvas.add(image)
        })
      }
    },
    prevPage () {
      if (this.pageNum <= 1) {
        return
      }
      this.pageNum--
      this.analyzePDF()
    },
    nextPage () {
      if (this.pageNum >= this.totalPage) {
        return
      }
      this.pageNum++
      this.analyzePDF()
    },
    pushImageToPDF (image) {
      fabric.Image.fromURL(image, function (image) {
        // 設定簽名出現的位置及大小，後續可調整
        image.top = 400
        image.scaleX = 0.5
        image.scaleY = 0.5
        this.analyzePDF()
      })
    },
    downloadPDF () {
      // 引入套件所提供的物件
      const pdf = new jsPDF()
      // 將 canvas 存為圖片
      const image = canvas.toDataURL('image/png')
      // 設定背景在 PDF 中的位置及大小
      const width = pdf.internal.pageSize.width
      const height = pdf.internal.pageSize.height
      pdf.addImage(image, 'png', 0, 0, width, height)
      // 將檔案取名並下載
      pdf.save('download.pdf')
    },
    gotoSign () {
      router.push('/UserSign/MakeSign')
    }
  }
})
