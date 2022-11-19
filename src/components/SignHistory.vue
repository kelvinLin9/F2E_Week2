<template>
  <div v-for="item in signs" :key="item">
    <img class="show-img"
        :src = "item"
        @click="addImage(item)"
    />
    <div @click="removeImage(item)">
      X
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import pdfStore from '@/stores/pdfStore'
import signStore from '@/stores/signStore'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(signStore, ['signs'])
  },
  methods: {
    ...mapActions(pdfStore, ['addImage', 'removeImage']),
    ...mapActions(signStore, ['removeImage'])
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
