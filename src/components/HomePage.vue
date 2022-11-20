<template>
  <div class="main container position-relative">
    <div class="free text-white d-flex justify-content-center align-items-center Noto-Sans-TC fs-24">
        免費試用版
    </div>
    <div class="row">
      <div class="col ps-5 pt-5 mt-5 Noto-Sans-TC">
        <h1 class="fs-50 text-primary fw-bolder pt-5">
          小綠簽
        </h1>
        <p class="">
          護樹、永續、減碳的綠色生活<br>
          響應環保無紙化電子簽署，<br>
          省時便利又環保。
        </p>
      </div>
      <div class="col Noto-Sans-TC">
        <div class="input-pdf d-flex flex-column justify-content-center align-items-center mt-5">
          <img src="../assets/images/pdf-input.png" alt="">
          <div class="bg-gradient text-white rounded-3 position-relative">
            <label for="upload" class="cursor-pointer upload-file-label" accept="application/pdf">
              選擇檔案
            </label>
            <input type="file" id="upload"
              accept="application/pdf"
              class="cursor-pointer upload-file"
              name="file-upload"
              @change="uploadPDF($event)"
              />
          </div>
          <p class="fs-16 my-0">或拖曳檔案到此處</p>
          <p class="fs-14 text-primary">(限10MB 內的PDF檔)</p>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-grassland-2"></div>
  <div class="bg-people4"></div>
  <div class="bg-people1"></div>
  <div class="bg-people2"></div>
  <div class="bg-people3"></div>
  <div class="bg-potted-plant"></div>
  <div class="bg-seed"></div>
  <div class="text-center Noto-Serif-TC pb-3 fs-12 design">
    小綠簽 © Code: <a href="https://github.com/kelvinLin9" class="text-primary text-decoration-none">Kelvin Lin</a>   /  Design: <a href="https://www.behance.net/KT_Designer" class="text-primary text-decoration-none">KT</a>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import pdfStore from '@/stores/pdfStore'
import signStore from '@/stores/signStore'
export default {
  methods: {
    ...mapActions(pdfStore, ['uploadPDF']),
    ...mapActions(signStore, ['getSign'])
  }
}
</script>

<style scoped lang="scss">
.main {
  background: rgba(240, 240, 240, 0.58);
  width: 1036px;
  height: 558px;
  border-radius: 34px;
}
.free {
  position: absolute;
  width: 225px;
  height: 62px;
  top: 0%;
  left: 0%;
  background: linear-gradient(180deg, #35A483 0%, #077854 100%);
  border-radius: 34px 0px;
}
.input-pdf {
  width: 417px;
  height: 376px;
  padding: 20px 10px 82px;
  gap: 20px;
  background: #FFFFFF;
  border: 2px dashed #B7B7B7;
  border-radius: 26px;
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
  width: 227px;
  height: 60px;
  opacity: 0;
}
.design {
  position: absolute;
  right: 20px;
  bottom: 0;
}
</style>
