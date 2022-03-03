<template>
  <div class="goods">
    <goods-list-itme v-for="item in goods" :goods-item="item"></goods-list-itme>
  </div>
</template>
<script>
import GoodsListItme from './GoodsListItem.vue'
export default {
  name:'GoodsList',
  props:{
    type:Array,
    default(){
      return []
    }
  },
  components:{
    GoodsListItme
  }
}
</script>
<style scoped>

</style>