import { defineStore } from 'pinia'
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
    pdfData: null,
    pdfName: '',
    pdfHistory: [],
    pdfImageUrl: '' // 歷史紀錄回到編輯要用到的圖片路徑
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
      this.pdfName = this.event.target.files[0].name
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
      // console.log(canvas)
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
      console.log(this.event.target.files[0])
      this.pdfData = await this.printPDF(this.event.target.files[0])
      this.pdfImage = await this.pdfToImage(this.pdfData)
      // 假裝一下有loading
      status.isLoading = true
      setTimeout(() => {
        status.isLoading = false
        this.gotoSign()
      }, '1000')
    },
    // 渲染(canvas, pdfImage)
    async renderPage () {
      console.log(this.pdfImage)
      if (!this.pdfImage) {
        router.push('/')
        return
      }
      const canvas = new fabric.Canvas('canvas', {
        fireRightClick: true, // 启用右键，button的数字为3
        stopContextMenu: true // 禁止默认右键菜单
      })
      canvas.requestRenderAll()
      // 避免重新整理後找不到檔案問題

      // 透過比例設定 canvas 尺寸
      console.log(123)
      canvas.setWidth(this.pdfImage.width / window.devicePixelRatio * this.scaleXY / 100)
      canvas.setHeight(this.pdfImage.height / window.devicePixelRatio * this.scaleXY / 100)
      // 將 PDF 畫面設定為背景
      // 判斷是否從歷史紀錄回來此頁
      // 暫時解決this.pdfImage存入localStorage解析後會改變的問題
      if (this.pdfImageUrl) {
        await canvas.setBackgroundImage(this.pdfImageUrl, canvas.renderAll.bind(canvas))
      } else {
        await canvas.setBackgroundImage(this.pdfImage, canvas.renderAll.bind(canvas))
      }
      this.canvas = canvas
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
      // this.canvas.on('mouse:down', canvasOnMouseDown)
      // function canvasOnMouseDown (opt) {
      //   // 判断：右键，且在元素上右键
      //   // opt.button: 1-左键；2-中键；3-右键
      //   // 在画布上点击：opt.target 为 null
      //   if (opt.button === 3 && opt.target) {
      //     // 获取当前元素
      //     console.log(opt.target)
      //     this.canvas.remove(opt.target)
      //   }
      // }
    },
    downloadPDF (filename) {
      // 引入套件所提供的物件
      const pdf = new jsPDF()
      // 將 canvas 存為圖片
      const imageUrl = canvas.toDataURL('image/png')
      const obj = {}
      obj.pdfImage = this.pdfImage
      obj.pdfImageUrl = imageUrl
      obj.pdfName = this.pdfName
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
      // this.gotoUserHistory()
      // 將檔案取名並下載
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
    }
  }
})
