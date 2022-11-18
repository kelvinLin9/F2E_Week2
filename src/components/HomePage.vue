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
          <div class="bg-gradient text-white px-5 py-2 rounded-3">
            <input type="file"
              accept="application/pdf"
              placeholder="選擇PDF檔案"
              @change="getPdf($event)"
              />
          </div>
          <p class="fs-16 my-0">或拖曳檔案到此處</p>
          <p class="fs-14 text-primary">(限10MB 內的PDF或JPG檔)</p>
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
  <!-- <canvas id="canvas" style="border: 1px solid #000"> </canvas>  -->
</template>

<script>
import { mapActions } from 'pinia'
import pdfStore from '@/stores/pdfStore'
import signStore from '@/stores/signStore'
export default {
  methods: {
    ...mapActions(pdfStore, ['getPdf']),
    ...mapActions(signStore, ['getSign'])
  },
  mounted () {
    // this.getSign()
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
</style>
