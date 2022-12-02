<template>
  <div class="position-relative d-flex flex-column justify-content-center align-items-center Noto-Sans-TC">
    <!-- 選擇簽名方式 -->
    <div class="mt-5">
      <button class="btn py-2 my-3"
              @click="signMethod = 'handwriting'"
              :class="{'btn-handwriting' :signMethod === 'handwriting',
                        'btn-import' :signMethod === 'uploadImage',}"
      >
        手寫簽名
      </button>
      <button class="btn py-2 my-3"
              @click="signMethod = 'uploadImage'"
              :class="{'btn-handwriting' :signMethod === 'uploadImage',
                      'btn-import' :signMethod === 'handwriting',}"
      >
        匯入簽名檔
        </button>
    </div>
    <!-- 選擇顏色 -->
    <div class="d-flex"
        v-if="this.signMethod === 'handwriting'"
    >
      <div class="choose-color black mx-2 my-4 cursor-pointer"
          :class="{'black-active' : color === 'black' }"
          @click="color = 'black', getSign()"></div>
      <div class="choose-color blue mx-2 my-4 cursor-pointer"
          :class="{'blue-active' : color === 'blue' }"
          @click="color = 'blue', getSign()"></div>
      <div class="choose-color red mx-2 my-4 cursor-pointer"
          :class="{'red-active' : color === 'red' }"
          @click="color = 'red', getSign()"></div>
    </div>
    <div class="sign-here"
        v-show="this.signMethod === 'handwriting'">
      <canvas
        id="canvasImage"
        width="590"
        height="224"
      ></canvas>
    </div>
    <div class="upload-img-here"
        v-show="this.signMethod === 'uploadImage'">
      <label for="upload" class="cursor-pointer upload-file-label" accept="image/png, image/jpeg">
        請選擇檔案
      </label>
      <input type="file" id="upload"
            accept="image/png, image/jpeg"
            class="cursor-pointer upload-file"
            name="file-upload"
            @change="handleFileUpload($event)"
      />
      <img :src="imagePreview" alt="預覽圖" class="preview" v-if="imagePreview">
    </div>
    <div class="btn-group">
      <button class="clear btn btn-outline-primary px-5 mx-5 py-2 my-3 rounded-3 bg-white">
        清除
      </button>
      <button class="save btn btn-primary px-5 mx-5 py-2 my-3 rounded-3 text-white"
              @click="saveImage()">
        儲存
      </button>
      <button class="goto-editPDF btn btn-primary px-5 mx-5 py-2 my-3 rounded-3 text-white"
              @click="gotoEditPDF()">
        下一步
    </button>
    </div>

  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import signStore from '@/stores/signStore'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapWritableState(signStore, ['signMethod', 'imagePreview', 'color'])
  },
  methods: {
    ...mapActions(signStore, ['getSign', 'saveImage', 'reset', 'handleFileUpload', 'gotoEditPDF'])
  },
  mounted () {
    this.getSign()
  }
}
</script>

<style scoped lang="scss">
.choose-color {
  width: 35px;
  height: 35px;
  &:hover{
    transform: scale(1.1);
  }
}
.black {
  background: #000;
  border-radius: 18px;
}
.black-active{
    border: solid 2px #FFFFFF;
    outline: solid 3px #000;
}
.blue {
  background: #0014C7;
  border-radius: 18px;
}
.blue-active{
    border: solid 2px #FFFFFF;
    outline: solid 3px #0014C7;
}
.red {
  background: #CA0000;
  border-radius: 18px;
}
.red-active{
    border: solid 2px #FFFFFF;
    outline: solid 3px #CA0000;
}
.sign-here {
  background: #FFFFFF;
  border-radius: 26px;
  position: absolute;
  top:250px;
}
.upload-img-here{
  width: 590px;
  height: 224px;
  background: #FFFFFF;
  border-radius: 26px;
  position: relative;
  position: absolute;
  top:250px;
}
.btn-group {
  position: absolute;
  top:530px;
}
.btn-handwriting {
  color: white;
  background: linear-gradient(180deg, #35A483 0%, #077854 100%);
}
.btn-import {
  color: #1C8B6A;
  background: white;
}
.upload-file-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #B7B7B7;
}
.upload-file {
  width: 590px;
  height: 224px;
  opacity: 0;
}
.preview {
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  max-height: 200px;
  // width: 100%;
}
</style>
