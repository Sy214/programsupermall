<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2" 
    class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScrol2" 
    :pull-up-load=true @pulling-up="loadMore">
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" / @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" ></tab-control>
      
    </scroll>
    <back-top @backClick.native="backClick" v-show="isShowBackTop"></back-top>
      
    
   
    <!-- <goods-list :goods="goods[currentType].list"></goods-list> -->
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
    <div>11</div>
    <div>12</div>
    <div>13</div>
    <div>14</div>
    <div>15</div>
    <div>16</div>
    <div>17</div>
    <div>18</div>
    <div>19</div>
    <div>20</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
    <div>11</div>
    <div>12</div>
    <div>13</div>
    <div>14</div>
    <div>15</div>
    <div>16</div>
  </div>
</template>
<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import RecommendView from "./RecommendView.vue";
import FeatureView from "./FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "../../network/home";

import { Swiper, SwiperItem } from "../../components/common/swiper/index";

import TabControl from "../../components/content/tabControl/TabControl.vue";

import Scroll from '../../components/common/scroll/Scroll.vue'
import BackTop from '../../components/content/backTop/BackTop.vue'

// import GoodsList from '../../components/content/goods/GoodsList.vue'
export default {
  name: "Home",
  components: {
    NavBar,
    Swiper,
    SwiperItem,
    RecommendView,
    FeatureView,
    TabControl,
    Scroll,
    BackTop
    // GoodsList
  },
  computed:{
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.scroll.refresh()

    },
    deactivated(){
      //1.保存Y值
      this.saveY = this.$refs.scroll.scroll.y
      //2.取消全局事件的监听
      this.$bus.$off('itemImgLoad')

    }

  },
  data() {
    return {
      banners: [],
      recommends: [],
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
      itemImgListener:null
      // goods: {
      //   'pop': { page: 0, list: [] },
      //   'new': { page: 0, list: [] },
      //   'sell': { page: 0, list: [] },
      // },
      // currentType = 'pop'
    };
  },
  created() {
    getHomeMultidata().then((res) => {
      // console.log(res);
      // console.log(res.data.recommend.list);
      //1.请求多个数据
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      //2.请求商品数据
      // this.getHomeGoods('pop')
      // this.getHomeGoods('new')
      // this.getHomeGoods('sell')
    });
    
  },
  mounted(){
    //这个地方img标签确实被挂载，但是其中的图片还没有占据高度
    

    //3.监听item中图片加载完成
    const refresh = this.debounce(this.$refs.scroll.refresh,200)
    this.$bus.$on('imgLoad',()=>{
      console.log('----------e');
      refresh()
    })
    //获取tabContent的offsetTop
    //所有的组件都有一个属性$el  用于获取组件中的元素
    this.tabOffsetTop = this.$refs.TabControl
  },
  /**
  事件监听相关的方法
   */
  


  /**网络请求相关的方法 */
  methods: {
    debounce(func,delay) {
      let timer = null
      return function (...args) {
        if (timer)  clearTimeout(timer)
        timer = setTimeout(()=>{
          func.apply(this,args)
        },delay)
      }

    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
        // this.$refs.scroll.scroll.refresh()
      });
    },
    tabClick(index){
    console.log(index);
    switch (index) {
      case 0:
        this.currentType = 'pop'
        break
        case 1:
        this.currentType = 'new'
        break
        case 2:
        this.currentType = 'sell'
    }
    //让两个TabControl的currentIndex保持一致
    this.$refs.TabControl1.currentIndex = index;
    this.$refs.TabControl2.currentIndex = index;
    
  },
  backClick(){
    this.$refs.scroll.scrollTo(0,0,500)
  },
  contentScroll(position){
    //判断BackTop是否显示
    this.isShowBackTop = (-position.y) > 1000
    //决定tabControl是否吸顶(position:fixed)
    this.isTabFixed = (-position.y)>this.tabOffsetTop
  },
  loadMore(){
    // console.log('上拉加载更多');
    this.getHomeGoods(this.currentType)
  },
  imgLoad(){
    this.tabOffsetTop = this.$refs.TabControl.$el.offsetTop;
  },
  

  },
  
  
};
</script>
<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: pink;
  color: #fff;
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* .tab-control {
  position: sticky;
  top: 44px;
} */
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
.tab-control {
  position: relative;
  z-index: 9;
}

</style>