<template>
  <div v-for="item in signs" :key="item">
    <img class="show-img"
        :src = "item"
        @click="pushImageToPDF(event, item)"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import pdfStore from '@/stores/pdfStore'
import signStore from '@/stores/signStore'
export default {
  data () {
    return {
      // imgs: []
    }
  },
  computed: {
    ...mapState(signStore, ['signs']),
    ...mapState(pdfStore, ['event'])
  },
  methods: {
    ...mapActions(pdfStore, ['pushImageToPDF'])
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.show-img {
  width: 100px;
  height: 60px;
  border: 1px solid ;
}
</style>
