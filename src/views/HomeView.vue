<template>
  <div class="home d-flex justify-content-center align-items-center position-relative test flex-column">
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

export default {
  components: {
    HomePage
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
