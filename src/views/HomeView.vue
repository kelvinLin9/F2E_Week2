<template>
  <div class="home d-flex justify-content-center align-items-center position-relative test">
    <div class="logo">
      <img src="../assets/images/logo.png" alt="logo">
    </div>
    <HomePage v-if="false" />
    <MakeSign />
    <div class="homeBgs">
      <div class="bg-grassland-1"></div>
      <div class="bg-home1"></div>
      <div class="bg-home2"></div>
    </div>
  </div>
    <!-- <canvas id="canvas" style="border: 1px solid #000"> </canvas> -->
</template>

<script>
import HomePage from '@/components/HomePage.vue'
import MakeSign from '@/components/MakeSign.vue'
// import { mapState, mapActions } from 'pinia'
export default {
  components: {
    HomePage,
    MakeSign
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
