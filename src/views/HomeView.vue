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
}
.home {
  width: 1280px;
  height: 720px;
}
</style>
