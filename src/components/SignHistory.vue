<template>
  <div class="sign-history d-flex justify-content-center align-items-center flex-column">
    <div v-for="item in signs" :key="item" class="d-flex justify-content-center align-items-center my-2">
      <img class="show-img me-3"
          :src = "item"
          @click="addImage(item)"
      />
      <div @click="removeImage(item)">
        X
      </div>
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
.sign-history {
  width: 343px;
  background: #F0F0F0;
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.11);
  border-radius: 16px;
}
.show-img {
  width: 271px;
  height: 61px;
  background: #FFFFFF;
  border-radius: 16px;
}
</style>
