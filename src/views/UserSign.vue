<template>
  <div v-if="isLoading">
    <section class="loading">
      <Vue3Lottie :animationData="loading" class="loading-icon"/>
      <p class="loading-text1 fs-23">簽名優化中...</p>
    </section>
  </div>
  <div class="user-sign position-relative" v-else>
    <RouterLink to="/" class="logo">
      <img src="../assets/images/logo.png" alt="logo">
    </RouterLink>
    <button type="button" class="btn btn-primary text-white sign-history-btn"
            @click="signHistoryView = !signHistoryView"
            v-if="$route.path == '/UserSign/MakeSign'"
    >
      管理簽名檔
    </button>
    <div class="sign-history">
      <SignHistory v-if="signHistoryView"/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapWritableState } from 'pinia'
import SignHistory from '@/components/SignHistory.vue'
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import statusStore from '@/stores/statusStore'
import loading from '@/assets/json/loading.json'

export default {
  components: {
    SignHistory,
    Vue3Lottie
  },
  data () {
    return {
      loading
    }
  },
  computed: {
    ...mapState(statusStore, ['isLoading']),
    ...mapWritableState(statusStore, ['signHistoryView'])
  }
}
</script>

<style lang="scss" scoped>
.user-sign {
  background-color: #f0f0f0;
  width: 1280px;
  height: 720px;
}
.logo {
  position: absolute;
  top: 20px;
  left: 30px;
  z-index: 100;
}
.sign-history-btn{
  position: absolute;
  top: 68px;
  right: 68px;
  z-index: 100;
}
.sign-history {
  position: absolute;
  top: 50%;
  right: 1%;
  transform: translate(0%, -50%);
  background-color: #f0f0f0;
  width: 343px;
  max-height: 321px;
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.11);
  border-radius: 16px;
  z-index: 100;
  overflow: auto;
}
</style>
