<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton :is-checked="itemInfo.checked" @click.native="checkClick"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">{{itemInfo.price}}</div>
        <div class="item-count right">{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'
export default {
  name:'CartListItem',
  props:{
    product: {
      type:Object,
      default() {
        return {}
      }
    }
  },
  components:{
    CheckButton
  },
  methods:{
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked
    }
  }
}
</script>
<style scoped>

</style>