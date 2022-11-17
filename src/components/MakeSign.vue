<template>
  <div class="sign container position-relative d-flex flex-column justify-content-center align-items-center">
    <div class="">
      <button class="btn btn-primary py-2 my-3 text-white">
        手寫簽名
        </button>
      <button class="btn py-2 my-3 text-primary bg-white">
        匯入簽名檔
        </button>
    </div>
    <div class="d-flex">
      <div class="choose-color black mx-2 my-4"
          @click="chooseColor('black')"></div>
      <div class="choose-color blue mx-2 my-4"
          @click="chooseColor('blue')"></div>
      <div class="choose-color red mx-2 my-4"
          @click="chooseColor('red')"></div>
    </div>
    <div class="sign-here">
      <canvas
        id="canvasImage"
        width="590"
        height="224"
      ></canvas>
    </div>
    <div class="btn-group">
      <button class="clear btn btn-outline-primary px-5 mx-5 py-2 my-3 rounded-3 bg-white">清除</button>
      <button class="save btn btn-primary px-5 mx-5 py-2 my-3 rounded-3 text-white">建立簽名</button>
    </div>
  </div>
  <!-- <div>
    <img class="show-img" width="250" height="150" style="border: 1px solid" />
    <img class="show-img" width="250" height="150" style="border: 1px solid" />
  </div> -->
</template>

<script>
export default {
  data () {
    return {
      color: 'red'
    }
  },
  methods: {
    getSign () {
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

      // -----------------------

      const showImage = document.querySelectorAll('.show-img')
      const saveBtn = document.querySelector('.save')
      // function saveImage () {
      //   // 圖片儲存的類型選擇 png ，並將值放入 img 的 src
      //   const newImg = canvas.toDataURL('image/png')

      //   showImage.src = newImg
      // }
      saveBtn.addEventListener('click', saveImage)

      // -----------------------
      const Imgs = []
      function saveImage () {
        const newImg = canvas.toDataURL('image/png')
        Imgs.push(canvas.toDataURL('image/png'))
        console.log('Imgs', Imgs)
        console.log('newImg', newImg)
        localStorage.setItem('img', newImg)
        localStorage.setItem('imgs', JSON.stringify(Imgs))
        console.log(localStorage.getItem('img'))
        console.log(JSON.parse(localStorage.getItem('imgs')))
      }
    },
    chooseColor (color) {
      this.color = color
      this.getSign()
    }
  },
  mounted () {
    this.getSign()
  }
}
</script>

<style scoped lang="scss">
.sign {
  background-color: #f0f0f0;
}
.sign-here {
  background: #FFFFFF;
  border-radius: 26px;
}
.choose-color {
  width: 35px;
  height: 35px;
}
.black {
  background: #000;
  border-radius: 18px;
}
.blue {
  background: #0014C7;
  border-radius: 18px;
}
.red {
  background: #CA0000;
  border-radius: 18px;
}
</style>
