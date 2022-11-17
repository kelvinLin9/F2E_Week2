import { defineStore } from 'pinia'

export default defineStore('pdfStore', {
  state: () => ({
    imgs: [],
    event: {}
  }),
  actions: {
    getPdf (e, item) {
      this.event = e
      console.log(this.event)
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

      // this.pushImage(this.imgs[0])
      fabric.Image.fromURL(item, function (image) {
        // 設定簽名出現的位置及大小，後續可調整
        image.top = 400
        image.scaleX = 0.5
        image.scaleY = 0.5
        console.log(image)
        canvas.add(image)
        console.log(canvas)
      })
    },
    getSignHistory () {
      this.imgs = JSON.parse(localStorage.getItem('imgs'))
      console.log(this.imgs)
    },
    pushImage (item) {
      this.getPdf(this.event, item)
      // console.log(item)
      // const canvas1 = new fabric.Canvas('canvas1')
      // // console.log(canvas)
      // fabric.Image.fromURL(item, function (image) {
	    // // 設定簽名出現的位置及大小，後續可調整
	    //   image.top = 400
		  //   image.scaleX = 0.5
      //   image.scaleY = 0.5
      //   console.log(image)
      //   canvas1.add(image)
      //   console.log(canvas1)
      // })
    }
  }
})
