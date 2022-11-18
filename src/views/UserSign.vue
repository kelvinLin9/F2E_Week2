<template>
  <div class="user-sign position-relative">
    <RouterLink to="/" class="logo">
      <img src="../assets/images/logo.png" alt="logo">
    </RouterLink>
    <button class="btn btn-primary text-white sign-history-btn"
            @click="signHistoryView = true"
    >
      歷史紀錄{{signHistoryView}}
    </button>
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
  top: 70px;
  right: 30px;
  z-index: 100;
}
</style>
