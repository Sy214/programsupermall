<template>
<!-- 导航 -->
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>
  <!-- 商品的列表 -->
  <cart-list></cart-list>
  <!-- 底部的汇总 -->
  <cart-bottom-bar></cart-bottom-bar>
</template>
<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'
import {mapGetters} from 'vuex'
export default {
  name:'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar

  },
  computed:{
    //两种语法
    ...mapGetters(['cartLength'])
    // ...mapGetters({
    //   length:'cartLength'
    // })
  }
}
</script>
<style scoped>
 .cart {
   height: 100vh;
 }
 .nav-bar {
   background-color: pink;
   color: #fff;
   font-weight: 700;
 }
</style>