<template>
  <div class="user-sign position-relative">
    <RouterLink to="/" class="logo">
      <img src="../assets/images/logo.png" alt="logo">
    </RouterLink>
    <MakeSign v-if="false"/>
    <SingHistory v-if="false"/>
    <EditPdf v-if="true"/>
  </div>
</template>

<script>
import MakeSign from '@/components/MakeSign.vue'
import SingHistory from '@/components/SingHistory.vue'
import EditPdf from '@/components/EditPdf.vue'
// import { mapState, mapActions } from 'pinia'
export default {
  components: {
    MakeSign,
    SingHistory,
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
</style>
