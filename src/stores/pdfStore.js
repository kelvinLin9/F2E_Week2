import { defineStore } from 'pinia'
import router from '../router'
import moment from 'moment'
import statusStore from './statusStore'

const status = statusStore()
let canvas = null
export default defineStore('pdfStore', {
  state: () => ({
    event: {},
    pageNum: 1,
    totalPage: 0,
    scaleXY: 100,
    pdfImage: null,
    pdfData: null,
    pdfName: '',
    pdfHistory: [],
    fromHistoryData: false,
    cacheSearch: ''
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
      this.analyzePDF()
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
      // console.log(pdfData)
      const Base64Prefix = 'data:application/pdf;base64,'
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js'
      // 將檔案處理成 base64
      pdfData = await this.readBlob(pdfData)
      // console.log(pdfData)
      // 將 base64 中的前綴刪去，並進行解碼
      const data = atob(pdfData.substring(Base64Prefix.length))
      // console.log(data)
      // 利用解碼的檔案，載入 PDF 檔及第一頁
      const pdfDoc = await pdfjsLib.getDocument({ data }).promise
      // console.log(pdfDoc)
      this.totalPage = pdfDoc.numPages
      const pdfPage = await pdfDoc.getPage(this.pageNum)
      // console.log(pdfPage)
      // 設定尺寸及產生 canvas
      const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio })
      // console.log(viewport)
      const canvas = document.createElement('canvas')
      // console.log(canvas)
      const context = canvas.getContext('2d')
      // console.log(context)
      // 設定 PDF 所要顯示的寬高及渲染
      canvas.height = viewport.height
      canvas.width = viewport.width
      const renderContext = {
        canvasContext: context,
        viewport
      }
      const renderTask = pdfPage.render(renderContext)
      // console.log(renderTask)
      // 回傳做好的 PDF canvas
      return renderTask.promise.then(() => canvas)
    },
    async pdfToImage () {
      // 設定 PDF 轉為圖片時的比例
      const scale = 1 / window.devicePixelRatio
      // 回傳圖片
      return new fabric.Image(this.pdfData, {
        id: 'renderPDF',
        scaleX: scale * this.scaleXY / 100,
        scaleY: scale * this.scaleXY / 100
      })
    },
    async analyzePDF () {
      this.pdfData = await this.printPDF(this.event.target.files[0])
      console.log(this.pdfData)
      this.pdfImage = await this.pdfToImage(this.pdfData)
      console.log(this.pdfImage)
      // 假裝一下有loading
      status.isLoading = true
      setTimeout(() => {
        status.isLoading = false
        this.gotoSign()
      }, '1000')
    },
    // 渲染(canvas, pdfImage)
    async renderPage () {
      // 解決從新整理找不到檔案問題
      console.log(this.pdfImage)
      if (!this.pdfImage) {
        router.push('/')
        return
      }
      canvas = new fabric.Canvas('canvas', {
        fireRightClick: true, // 启用右键，button的数字为3
        stopContextMenu: true // 禁止默认右键菜单
      })
      canvas.requestRenderAll()
      // 透過比例設定 canvas 尺寸
      canvas.setWidth(this.pdfImage.width / window.devicePixelRatio * this.scaleXY / 100)
      canvas.setHeight(this.pdfImage.height / window.devicePixelRatio * this.scaleXY / 100)
      // 將 PDF 畫面設定為背景
      // 判斷是否從歷史紀錄回來此頁
      // 暫時解決this.pdfImage存入localStorage解析後會改變的問題
      if (this.fromHistoryData) {
        await canvas.setBackgroundImage(this.pdfImage.src, canvas.renderAll.bind(canvas))
      } else {
        await canvas.setBackgroundImage(this.pdfImage, canvas.renderAll.bind(canvas))
      }
      // this.canvas = canvas
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
        canvas.add(image)
      })
    },
    addDate () {
      const today = moment().format('YYYY/MM/DD')
      const date = new fabric.Text(today, {
        top: 200,
        scaleX: 1,
        scaleY: 1
      })
      canvas.add(date)
    },
    addTextToPDF (result) {
      const text = new fabric.Text(result.value, (image) => {
        image.top = 10
        image.left = 10
        image.scaleX = 1
        image.scaleY = 1
      })
      canvas.add(text)
    },
    removeCanvas () {
      canvas.on('mouse:down', canvasOnMouseDown)
      function canvasOnMouseDown (opt) {
        // 判断：右键，且在元素上右键
        // opt.button: 1-左键；2-中键；3-右键
        // 在画布上点击：opt.target 为 null
        if (opt.button === 3 && opt.target) {
          // 获取当前元素
          console.log(opt.target)
          canvas.remove(opt.target)
        }
      }
    },
    downloadPDF (filename) {
      // 引入套件所提供的物件
      const pdf = new jsPDF()
      // 將 canvas 存為圖片
      const imageUrl = canvas.toDataURL('image/png')
      const obj = {}
      obj.pdfImage = this.pdfImage
      obj.pdfData = this.pdfData
      obj.pdfName = filename
      obj.pdfYear = new Date().getFullYear()
      obj.pdfMonth = new Date().getMonth()
      obj.pdfDate = new Date().getDate()
      this.pdfHistory.push(obj)
      localStorage.setItem('pdfHistory', JSON.stringify(this.pdfHistory))
      // 設定背景在 PDF 中的位置及大小
      const width = pdf.internal.pageSize.width
      const height = pdf.internal.pageSize.height
      pdf.addImage(imageUrl, 'png', 0, 0, width, height)
      pdf.save(`${filename}.pdf`)
      this.gotoUserHistory()
    },
    gotoSign () {
      router.push('/UserSign/MakeSign')
    },
    gotoUserHistory () {
      router.push('/UserHistory')
    },
    getPDFHistory () {
      this.pdfHistory = JSON.parse(localStorage.getItem('pdfHistory')) || []
    },
    removePDFHistory (item) {
      this.pdfHistory.splice(this.pdfHistory.indexOf(item), 1)
      localStorage.setItem('pdfHistory', JSON.stringify(this.pdfHistory))
    },
    fromHistory () {
      this.totalPage = 1
      console.log(this.pdfData)
      this.pdfToImage()
      this.renderPage()
    }
  },
  getters: {
    filterFiles () {
      return this.pdfHistory.filter((item) => {
        return item.pdfName.match(this.cacheSearch)
      })
    }
  }
})
