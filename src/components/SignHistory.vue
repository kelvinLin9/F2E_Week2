<template>
  <div class="d-flex justify-content-center align-items-center flex-column">
    <div v-for="item in signs" :key="item" class="d-flex justify-content-center align-items-center my-2">
      <div class="img-wrap d-flex justify-content-center align-items-center me-3">
        <img class="show-img cursor-pointer me-3"
          :src = "item"
          @click="addImage(item)"
        />
      </div>
      <div class="cursor-pointer"
          @click="removeImage(item)">
        <i class="fa-solid fa-trash-can"></i>
      </div>
    </div>
    <div class="addSign cursor-pointer text-primary py-2 me-auto ms-3"
      @click="gotoSign()">
      + 新增簽名
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
    ...mapActions(pdfStore, ['addImage', 'removeImage', 'gotoSign']),
    ...mapActions(signStore, ['removeImage'])
  }
}
</script>

<style lang="scss" scoped>
.img-wrap {
  width: 271px;
  height: 61px;
  background: #FFFFFF;
  border-radius: 16px;
}
.show-img {
  max-width: 260px;
  max-height: 55px;
  height: 100%;

}
</style>
