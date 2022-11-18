<template>
  <div class="container position-relative d-flex flex-column justify-content-center align-items-center">
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
      <button class="clear btn btn-outline-primary px-5 mx-5 py-2 my-3 rounded-3 bg-white">
        清除
      </button>
      <button class="save btn btn-primary px-5 mx-5 py-2 my-3 rounded-3 text-white"
              @click="saveImage()">
        建立簽名
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import signStore from '@/stores/signStore'
export default {
  data () {
    return {
      color: 'black'
    }
  },
  methods: {
    ...mapActions(signStore, ['getSign', 'chooseColor', 'saveImage', 'reset'])
  },
  mounted () {
    this.getSign()
  }
}
</script>

<style scoped lang="scss">
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
