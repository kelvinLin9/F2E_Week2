<template>
  <div class="home d-flex justify-content-center align-items-center position-relative flex-column"
      :class="{'bg-user-history': true}">
    <RouterLink to="/" class="logo">
      <img src="../assets/images/logo.png" alt="logo">
    </RouterLink>
    <div class="homeBgs">
      <div class="bg-grassland-1"></div>
      <div class="bg-home1"></div>
      <div class="bg-home2"></div>
    </div>
    <div class="sapling-0" v-if="!pdfHistory.length">
      <img src="../assets/images/sapling0.png" alt="枯樹苗">
      <p class="fs-18 Noto-Sans-TC mt-3">尚無任何記錄</p>
    </div>
    <div v-if="pdfHistory.length"
          class="pdf-history-warp">
      <div class="Roboto ms-3">
        2022
      </div>
      <div class="pdf-history m-3" v-for="item in pdfHistory" :key="item">
        <div class="Roboto ms-3">
          {{ item.pdfMonth }} / {{ item.pdfDate }}
        </div>
        <div class="Noto-Sans-TC ms-4 text-primary cursor-pointer"
              @click="pdfImage = item.pdfImage,pdfImageUrl = item.pdfImageUrl, gotoEditPDF()">
          {{ item.pdfName }}
        </div>
        <div class="ms-auto me-3 cursor-pointer"
            @click="removePDFHistory(item)">
            <i class="fa-solid fa-trash-can"></i>
        </div>
      </div>
    </div>
    <div v-if="pdfHistory.length" class="sapling-1">
      <img src="../assets/images/sapling1.png" alt="樹苗1"
            v-if="pdfHistory.length >= 1 && pdfHistory.length < 5">
      <img src="../assets/images/sapling5.png" alt="樹苗5"
            v-if="pdfHistory.length >= 5 && pdfHistory.length < 10">
      <img src="../assets/images/sapling10.png" alt="樹苗10"
            v-if="pdfHistory.length >= 10 && pdfHistory.length < 15">
      <img src="../assets/images/sapling15.png" alt="樹苗15"
            v-if="pdfHistory.length >= 15">
    </div>
  </div>

</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import ok from '@/assets/json/ok.json'
import wrong from '@/assets/json/wrong.json'
import { mapState, mapActions, mapWritableState } from 'pinia'
import statusStore from '@/stores/statusStore'
import pdfStore from '@/stores/pdfStore'
import signStore from '@/stores/signStore'
export default {
  data () {
    return {
      ok,
      wrong
    }
  },
  components: {
    Vue3Lottie
  },
  computed: {
    ...mapState(statusStore, ['signHistoryView']),
    ...mapState(pdfStore, ['pdfHistory']),
    ...mapWritableState(pdfStore, ['pdfImage', 'pdfImageUrl'])
  },
  methods: {
    ...mapActions(pdfStore, ['getPDFHistory', 'removePDFHistory']),
    ...mapActions(signStore, ['gotoEditPDF'])
  },
  mounted () {
    this.getPDFHistory()
    // localStorage.clear()
  }
}
</script>

<style lang="scss" scoped>
.logo {
  position: absolute;
  top: 20px;
  left: 30px;
}
.home {
  width: 1280px;
  height: 720px;
}
.sapling-0 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.sapling-1 {
  position: absolute;
  bottom: 50px;
  right: 50px;
}
.pdf-history-warp {
  height: 500px;
  overflow: auto;
}
.pdf-history {
  width: 620px;
  height: 64px;
  display: flex;
  align-items: center;
  background: #FFFFFF;
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.11);
  border-radius: 13px;
  text-decoration: none;
}
</style>
