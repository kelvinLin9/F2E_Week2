<template>
  <div class="user-sign position-relative">
    <RouterLink to="/" class="logo">
      <img src="../assets/images/logo.png" alt="logo">
    </RouterLink>
    <MakeSign v-if="true"/>
    <SignHistory v-if="true" class="sign-history"/>
    <EditPdf v-if="true"/>
  </div>
</template>

<script>
import MakeSign from '@/components/MakeSign.vue'
import SignHistory from '@/components/SignHistory.vue'
import EditPdf from '@/components/EditPdf.vue'
// import { mapState, mapActions } from 'pinia'
export default {
  components: {
    MakeSign,
    SignHistory,
    EditPdf
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
.sign-history {
  position: absolute;
  right: 50px;
}
</style>
