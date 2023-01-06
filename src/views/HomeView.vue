<template>
  <div v-if="isLoading">
    <section class="loading">
      <Vue3Lottie :animationData="loading" class="loading-icon"/>
      <p class="loading-text1 fs-23">上傳中...</p>
    </section>
  </div>
  <div
      class="home d-flex justify-content-center align-items-center position-relative flex-column">
    <div class="logo">
      <img src="../assets/images/logo.png" alt="logo">
    </div>
    <RouterLink to="/UserHistory" class="pdf-history Noto-Sans-TC fs-18 d-flex justify-content-center align-items-center px-3 py-1 ">
      歷史紀錄
    </RouterLink>
    <HomePage v-if="!isLoading"/>
    <div class="homeBgs">
      <div class="bg-grassland-1"></div>
      <div class="bg-home1"></div>
      <div class="bg-home2"></div>
    </div>
    <div class="text-center Noto-Serif-TC pb-3 fs-12 design">
    小綠簽 © Code: <a href="https://github.com/kelvinLin9" class="text-primary text-decoration-none">Kelvin Lin</a>   /  Design: <a href="https://www.behance.net/KT_Designer" class="text-primary text-decoration-none">KT</a>
  </div>
  </div>
</template>

<script>
import HomePage from '@/components/HomePage.vue'
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import loading from '@/assets/json/loading.json'
import ok from '@/assets/json/ok.json'
// import wrong from '@/assets/json/wrong.json'
import { mapState } from 'pinia'
import statusStore from '@/stores/statusStore'
export default {
  data () {
    return {
      loading,
      ok
    }
  },
  components: {
    HomePage,
    Vue3Lottie
  },
  computed: {
    ...mapState(statusStore, ['isLoading'])
  }
}
</script>

<style lang="scss" scoped>
.logo {
  position: absolute;
  top: 20px;
  left: 30px;
}
.pdf-history {
  position: absolute;
  top: 35px;
  right: 130px;
  border: 2px solid #1C8B6A;
  border-radius: 16px;
  text-decoration: none;
  @media (max-width: 576px) {
    right: 30px;
  }
}
.home {
  width: 1280px;
  height: 720px;
  @media (max-width: 576px) {
    width: 375px;
    background: #F0F0F0;
  }
}
.design {
  width: 300px;
  position: absolute;
  right: 20px;
  bottom: 0;
  @media (max-width: 576px) {
      left:50%;
      transform: translate(-50%);
  }
}
</style>
