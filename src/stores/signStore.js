import { defineStore } from 'pinia'
import router from '../router'

export default defineStore('signStore', {
  state: () => ({
    signs: [],
    signMethod: 'handwriting',
    imagePreview: ''
  }),
  actions: {
    getSign () {
      this.signs = JSON.parse(localStorage.getItem('signs')) || []
      const canvas = document.querySelector('#canvasImage')
      const ctx = canvas.getContext('2d')
      const clearBtn = document.querySelector('.clear')

      // 設定線條的相關數值
      ctx.lineWidth = 4
      ctx.lineCap = 'round'
      ctx.strokeStyle = this.color
      // 設置狀態來確認滑鼠 / 手指是否按下或在畫布範圍中
      let isPainting = false

      // 取得滑鼠 / 手指在畫布上的位置
      function getPaintPosition (e) {
        const canvasSize = canvas.getBoundingClientRect()

        if (e.type === 'mousemove') {
          return {
            x: e.clientX - canvasSize.left,
            y: e.clientY - canvasSize.top
          }
        } else {
          return {
            x: e.touches[0].clientX - canvasSize.left,
            y: e.touches[0].clientY - canvasSize.top
          }
        }
      }

      // 開始繪圖時，將狀態開啟
      function startPosition (e) {
        e.preventDefault()
        isPainting = true
      }

      // 結束繪圖時，將狀態關閉，並產生新路徑
      function finishedPosition () {
        isPainting = false
        ctx.beginPath()
      }

      // 繪圖過程
      function draw (e) {
        // 滑鼠移動過程中，若非繪圖狀態，則跳出
        if (!isPainting) return

        // 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
        const paintPosition = getPaintPosition(e)

        // 移動滑鼠位置並產生圖案
        ctx.lineTo(paintPosition.x, paintPosition.y)
        ctx.stroke()
      }

      // 重新設定畫布
      function reset () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }

      // event listener 電腦板
      canvas.addEventListener('mousedown', startPosition)
      canvas.addEventListener('mouseup', finishedPosition)
      canvas.addEventListener('mouseleave', finishedPosition)
      canvas.addEventListener('mousemove', draw)

      // event listener 手機板
      canvas.addEventListener('touchstart', startPosition)
      canvas.addEventListener('touchend', finishedPosition)
      canvas.addEventListener('touchcancel', finishedPosition)
      canvas.addEventListener('touchmove', draw)

      clearBtn.addEventListener('click', reset)
    },
    chooseColor (color) {
      this.color = color
      this.getSign()
    },
    saveImage () {
      if (this.signMethod === 'handwriting') {
        const canvas = document.querySelector('#canvasImage')
        console.log(canvas)
        console.log(canvas.toDataURL('image/png'))
        this.signs.push(canvas.toDataURL('image/png'))
        // console.log(this.signs)
        localStorage.setItem('signs', JSON.stringify(this.signs))
        this.reset()
        this.gotoEditPDF()
      } else {
        console.log(this.imagePreview)
        this.signs.push(this.imagePreview)
        console.log(this.signs)
        localStorage.setItem('signs', JSON.stringify(this.signs))
        this.imagePreview = ''
        this.gotoEditPDF()
      }
    },
    removeImage (item) {
      this.signs.splice(this.signs.indexOf(item), 1)
      localStorage.setItem('signs', JSON.stringify(this.signs))
      // this.getSign()
    },
    reset () {
      const canvas = document.querySelector('#canvasImage')
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    },
    gotoEditPDF () {
      router.push('/UserSign/EditPDF')
    },
    // 匯入簽名檔部分
    async handleFileUpload (e) {
      console.log(e.target.files[0])
      try {
        const file = e.target.files[0]
        if (!file) return

        const beforeUploadCheck = await this.beforeUpload(file)
        if (!beforeUploadCheck.isValid) {
          throw beforeUploadCheck.errorMessages
        }
        // this.showPreviewImage(file)
        this.to64(file)
      } catch (error) {
        alert(error)
        console.log('Catch Error: ', error)
      } finally {
        e.target.value = ''
        // setUploading(false)
      }
    },
    beforeUpload (fileObject) {
      return new Promise((resolve) => {
        const validFileTypes = ['image/jpeg', 'image/png']
        const isValidFileType = validFileTypes.includes(fileObject.type)
        const errorMessages = []

        if (!isValidFileType) {
          errorMessages.push('You can only upload JPG or PNG file!')
        }

        const isValidFileSize = fileObject.size / 1024 / 1024 < 2
        if (!isValidFileSize) {
          errorMessages.push('Image must smaller than 2MB!')
        }

        resolve({
          isValid: isValidFileType && isValidFileSize,
          errorMessages: errorMessages.join('\n')
        })
      })
    },
    showPreviewImage (fileObj) {
      const image = URL.createObjectURL(fileObj)
      this.imagePreview = image
      console.log(this.imagePreview)
    },
    to64 (filee) {
      const formData = new FormData()
      formData.append('iFile', filee)
      const file = formData.get('iFile')
      console.log('==>', file)
      const reader = new FileReader()
      const fileType = file.type
      reader.readAsDataURL(file)

      // reader读取完成
      reader.onload = e => {
        if (/^image\/[jpeg|png|gif]/.test(fileType)) {
          // imgDom.src = e.target.result
          console.log(e.target.result)
          this.imagePreview = e.target.result
        }
      }
    }
  }
})
