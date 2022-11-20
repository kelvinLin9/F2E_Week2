<template>
  <div v-if="isLoading">
    <section class="loading">
      <Vue3Lottie :animationData="loading" class="loading-icon"/>
      <p class="loading-text1 fs-23">上傳中...</p>
    </section>
  </div>
  <div v-else
      class="home d-flex justify-content-center align-items-center position-relative flex-column">
    <div class="logo">
      <img src="../assets/images/logo.png" alt="logo">
    </div>
    <HomePage v-if="true"/>
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
import wrong from '@/assets/json/wrong.json'
import { mapState, mapActions } from 'pinia'
import pdfStore from '@/stores/pdfStore'
export default {
  data () {
    return {
      ok,
      loading,
      wrong
    }
  },
  components: {
    HomePage,
    Vue3Lottie
  },
  computed: {
    ...mapState(pdfStore, ['isLoading'])
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
.loading {
  position: absolute;
  width: 1280px;
  height: 720px;
  }
  .loading-icon {
    position: absolute;
    width: 150px;
    height: 150px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .loading-text1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
