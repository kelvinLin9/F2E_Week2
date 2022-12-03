<template>
  <div v-if="isLoading">
    <section class="loading">
      <Vue3Lottie :animationData="ok" class="loading-icon"/>
      <p class="loading-text1 fs-23">上傳中...</p>
    </section>
  </div>
  <div
      class="home d-flex justify-content-center align-items-center position-relative flex-column">
    <RouterLink to="/" class="logo">
      <img src="../assets/images/logo.png" alt="logo">
    </RouterLink>
    <div class="homeBgs">
      <div class="bg-grassland-1"></div>
      <div class="bg-home1"></div>
      <div class="bg-home2"></div>
    </div>
  </div>
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import ok from '@/assets/json/ok.json'
import wrong from '@/assets/json/wrong.json'
import { mapState } from 'pinia'
import statusStore from '@/stores/statusStore'
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
.home {
  width: 1280px;
  height: 720px;
}
</style>
