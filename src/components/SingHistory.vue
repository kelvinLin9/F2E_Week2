<template>
  <div v-for="item in imgs" :key="item">
    <img class="show-img"
        :src = "item"
        @click="pushImage(item)"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapWritableState } from 'pinia'
import pdfStore from '@/stores/pdfStore'
export default {
  data () {
    return {
      // imgs: []
    }
  },
  computed: {
    ...mapState(pdfStore, ['imgs'])
  },
  methods: {
    ...mapActions(pdfStore, ['pushImage', 'getSignHistory'])
  },
  created () {
    this.getSignHistory()
  },
  mounted () {

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
