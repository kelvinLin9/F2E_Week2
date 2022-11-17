<template>
  <div v-for="item in imgs" :key="item">
    <img class="show-img"
        :src = "item"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgs: []
    }
  },
  methods: {
    getSignHistory () {
      const showImage = document.querySelectorAll('.show-img')
      this.imgs = JSON.parse(localStorage.getItem('imgs'))
      console.log(this.imgs)
      // showImage[0].src = JSON.parse(localStorage.getItem('imgs'))[0]
      // showImage[1].src = JSON.parse(localStorage.getItem('imgs'))[1]
    }

  },
  mounted () {
    this.getSignHistory()
  }
}
</script>

<style lang="scss" scoped>
.show-img {
  width: 250px;
  height: 150px;
  border: 1px solid ;
}
</style>
