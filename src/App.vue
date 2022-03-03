<template>
  <div id="app">
   <tab-bar>
      <tab-bar-item path="/home" activeColor="red">
      
        <img slot="item-icon" src="./assets/img/_home.png" alt="" />
        <img slot="item-icon-active" src="./assets/img/home.png" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item  path="/category" activeColor="red">
        <img slot="item-icon" src="./assets/img/_search.png" alt="" />
        <img slot="item-icon-active" src="./assets/img/search.png" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="red">
        <img slot="item-icon" src="./assets/img/_img.png" alt="" />
        <img slot="item-icon-active" src="./assets/img/img.png" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="red">
        <img slot="item-icon" src="./assets/img/_my.png" alt="" />
        <img slot="item-icon-active" src="./assets/img/my.png" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
    
    <router-view></router-view>
  </div>
</template>
<script>
import TabBar from './components/common/tabbar/TabBar.vue'
import TabBarItem from './components/common/tabbar/TabBarItem.vue'

export default {
  name: "App",
  components:{
    TabBar,
    TabBarItem,
    

  }
};
</script>
<style scoped>



.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  vertical-align: middle;
  /* margin-bottom: 2px; */
  font-family: 14px;

 
}
.tab-bar-item img {
  height: 24px;
  width: 24px;
}
</style>
