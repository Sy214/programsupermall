<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'GoodsListItem',
  props:{
    type:Object,
    default(){
      return {}
    }
  },
  methods:{
    imgLoad(){
    this.$bus.$emit('imgLoad')

    // if(this.$route.path.indexOf('/home')) {
    //   this.$bus.$emit('homeItemImgLoad')
    // } else if (this.$route.path.indexOf('/detail')) {
    //   this.$bus.$emit('detailItemImgLoad')
    // }
  },
  itemClick(){
    this.$router.push('/detail/'+this.goodsItem.iid)

  }

  },
  computed:{
    showImage() {
      return this.product.image || this.product.show.img
    }
  }
}
</script>
<style scoped>

</style>