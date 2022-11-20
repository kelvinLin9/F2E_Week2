<template>
  <div class="position-relative d-flex flex-column justify-content-center align-items-center Noto-Sans-TC">
    <div class="mt-5">
      <button class="btn py-2 my-3"
              @click="this.signMethod = 'handwriting'"
              :class="{'btn-handwriting' :this.signMethod === 'handwriting',
                        'btn-import' :this.signMethod === 'import',}"
      >
        手寫簽名
      </button>
      <button class="btn py-2 my-3"
              @click="this.signMethod = 'import'"
              :class="{'btn-handwriting' :this.signMethod === 'import',
                      'btn-import' :this.signMethod === 'handwriting',}"
      >
        匯入簽名檔
        </button>
    </div>
    <div class="d-flex"
        v-if="this.signMethod === 'handwriting'"
    >
      <div class="choose-color black mx-2 my-4"
          @click="chooseColor('black')"></div>
      <div class="choose-color blue mx-2 my-4"
          @click="chooseColor('blue')"></div>
      <div class="choose-color red mx-2 my-4"
          @click="chooseColor('red')"></div>
    </div>
    <div class="sign-here"
        v-if="this.signMethod === 'handwriting'">
      <canvas
        id="canvasImage"
        width="590"
        height="224"
      ></canvas>
    </div>
    <div class="upload-img-here"
        v-if="this.signMethod === 'import'">
      <label for="upload" class="cursor-pointer upload-file-label" accept="image/png, image/jpeg">
        請選擇檔案
      </label>
      <input type="file" id="upload"
            accept="image/png, image/jpeg"
            class="cursor-pointer upload-file test"
            name="file-upload"
            @change="uploadImage($event)"
      />
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
import { mapActions, mapWritableState } from 'pinia'
import signStore from '@/stores/signStore'
export default {
  data () {
    return {
      color: 'black'
    }
  },
  computed: {
    ...mapWritableState(signStore, ['signMethod'])
  },
  methods: {
    ...mapActions(signStore, ['getSign', 'chooseColor', 'saveImage', 'reset', 'uploadImage'])
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
.cursor-pointer {
  cursor:pointer;
}
.upload-file-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.upload-file {
  width: 590px;
  height: 224px;
  opacity: 0;
}
</style>
