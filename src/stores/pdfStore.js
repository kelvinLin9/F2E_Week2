import { defineStore } from 'pinia'
import { fabric } from 'fabric'
import router from '../router'
import moment from 'moment'
import statusStore from './statusStore'

const status = statusStore()

export default defineStore('pdfStore', {
  state: () => ({
    event: {},
    pageNum: 1,
    totalPage: 0,
    scaleXY: 100,
    canvas: null,
    pdfImage: null,
    pdfData: null
  }),
  actions: {
    async uploadPDF (e) {
      this.event = e
      if (this.event.target.files[0].size > 10000000) {
        alert('檔案超過10MB，請重新選擇')
        return
      } else if (this.event.target.files[0].type != 'application/pdf') {
        alert('檔案格式錯誤，請重新選擇')
        return
      }
      // status.isLoading = true
      // await this.analyzePDF()
      // status.isLoading = false
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
    // 得到PDF長寬、設定了canvas長寬
    async printPDF (pdfData) {
      const Base64Prefix = 'data:application/pdf;base64,'
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js'
      // 將檔案處理成 base64
      pdfData = await this.readBlob(pdfData)
      // 將 base64 中的前綴刪去，並進行解碼
      const data = atob(pdfData.substring(Base64Prefix.length))
      // 利用解碼的檔案，載入 PDF 檔及第一頁
      const pdfDoc = await pdfjsLib.getDocument({ data }).promise
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
        scaleX: scale * this.scaleXY / 100,
        scaleY: scale * this.scaleXY / 100
      })
    },
    async analyzePDF () {
      // 載入讀取畫面
      // 此處 canvas 套用 fabric.js
      const canvas = new fabric.Canvas('canvas')
      console.log(canvas)
      canvas.requestRenderAll()
      // 避免重新整理後找不到檔案問題
      if (!this.event.target) {
        router.push('/')
        return
      }
      this.pdfData = await this.printPDF(this.event.target.files[0])
      this.pdfImage = await this.pdfToImage(this.pdfData)
      this.canvas = canvas
      this.renderPage()
    },
    // 渲染(canvas, pdfImage)
    async renderPage () {
      // 透過比例設定 canvas 尺寸
      this.canvas.setWidth(this.pdfImage.width / window.devicePixelRatio * this.scaleXY / 100)
      this.canvas.setHeight(this.pdfImage.height / window.devicePixelRatio * this.scaleXY / 100)
      console.log(this.canvas)
      console.log(this.pdfImage)
      console.log(this.canvas.setBackgroundImage)
      // 將 PDF 畫面設定為背景
      await this.canvas.setBackgroundImage(this.pdfImage, this.canvas.renderAll.bind(this.canvas))
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
    async zoomOut () {
      if (this.scaleXY > 50) {
        this.scaleXY -= 10
        this.pdfImage = await this.pdfToImage(this.pdfData)
        this.renderPage()
      }
    },
    async zoomIn () {
      if (this.scaleXY < 150) {
        this.scaleXY += 10
        this.pdfImage = await this.pdfToImage(this.pdfData)
        this.renderPage()
      }
    },
    addImage (imageURL) {
      fabric.Image.fromURL(imageURL, image => {
        // 設定簽名出現的位置及大小，後續可調整
        image.top = 400
        image.scaleX = 0.5
        image.scaleY = 0.5
        this.canvas.add(image)
      })
    },
    addDate () {
      const today = moment().format('YYYY/MM/DD')
      const date = new fabric.Text(today, {
        top: 200,
        scaleX: 1,
        scaleY: 1
      })
      this.canvas.add(date)
    },
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
          popup: 'customClass-popup rounded-3xl py-6 w-auto px-5',
          title: 'customClass-title font-bold text-black pt-6 px-0',
          input: 'customClass-input',
          inputLabel: '',
          actions: 'btns',
          confirmButton: 'btn btn-confirm',
          cancelButton: 'btn btn-cancel'
        }
      }).then((result) => {
        // const canvas = new fabric.Canvas('canvas')

        const text = new fabric.Text(result.value, (image) => {
          image.top = 10
          image.left = 10
          image.scaleX = 0.5
          image.scaleY = 0.5
        })
        this.canvas.add(text)
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
      router.push('/UserSign/EditPDF')
    }
  }
})
