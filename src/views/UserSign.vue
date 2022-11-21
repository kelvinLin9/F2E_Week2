<template>
  <div class="user-sign position-relative">
    <RouterLink to="/" class="logo">
      <img src="../assets/images/logo.png" alt="logo">
    </RouterLink>
    <!-- <button class="btn btn-primary text-white sign-history-btn"
            @click="signHistoryView = !signHistoryView"
    >
      管理簽名檔
    </button> -->
    <div class="sign-history">
      <SignHistory v-if="signHistoryView"/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import SignHistory from '@/components/SignHistory.vue'

export default {
  components: {
    SignHistory
  },
  data () {
    return {
      signHistoryView: false
    }
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
  top: 20px;
  right: 30px;
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
