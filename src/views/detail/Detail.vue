<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @title-click="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <shop-detail-info :shop="shop"></shop-detail-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :param-info="paramsInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar :addCart="addToCart"></detail-bottom-bar>
    <toast :message="message" :show="show"></toast>
  </div>
</template>
<script>
import detailNavBar from "./childComps/detailNavBar.vue";
import detailSwiper from "./childComps/detailSwiper.vue";
import detailBaseInfo from "./childComps/detailBaseInfo.vue";
import shopDetailInfo from "./childComps/shopDetailInfo.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import detailGoodsInfo from "../../views/detail/childComps/DetailGoodsInfo.vue";
import detailParamInfo from "../../views/detail/childComps/detailParamInfo.vue";
import detailBaseInfo from "./childComps/detailCommentInfo.vue";
import detailBottomBar from './childComps/detailBottomBar.vue'
import {mapActions} from 'vuex'

import Toast from '../../components/common/toast/Toast.vue'

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "../../network/detail";
import DetailCommentInfo from "./childComps/detailCommentInfo.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
export default {
  name: "Detail",
  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    shopDetailInfo,
    detailGoodsInfo,
    detailParamInfo,
    detailBaseInfo,
    Scroll,
    DetailCommentInfo,
    GoodsList,
    detailBottomBar,
    Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [0, 1000, 2000, 3000],
      getThemeTopY:null,
      currentIndex:0,
      message:'',
      show:false
    };
  },
  created() {
    //1.保存iid的信息
    this.iid = this.$route.params.iid;
    //2.根据iid请求详情页数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      //1.获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //5.获取参数的信息
      this.paramsInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //6.取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      /*
      //第一次获取，值不对
      // 值不对的原因:this.$refs.params.$el压根没有渲染
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offset - top);
      this.themeTopYs.push(this.$refs.comment.$el.offset - top);
      this.themeTopYs.push(this.$refs.recommend.$el.offset.top);
      this.$nextTick(() => {
        // 第二次获取，值不对
        // 值不对的原因：图片没有计算在内
        //根据最新的数据，对应的DOM是已经被渲染出来
        // 但是图片依然是没有加载完成(获取到的offset-top是不含图片的)
        // offsetTop值不对的时候，都是因为图片的问题
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offset - top);
        this.themeTopYs.push(this.$refs.comment.$el.offset - top);
        this.themeTopYs.push(this.$refs.recommend.$el.offset.top);
      });
      */
    });
    //给getThemeTopY赋值(这里进行了防抖操作)
    this.getThemeTopY = debounce(()=>{
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offset - top);
        this.themeTopYs.push(this.$refs.comment.$el.offset - top);
        this.themeTopYs.push(this.$refs.recommend.$el.offset.top);
    },100)
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  mounted() {},

  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY()
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      //1.获取y值
      const positionY = -position.y 
      //2.positionY和主题中值进行比较
      //[0,7938,9120,9452]
      //positionY 在 0 和 7938 之间，index = 0
      //positionY 在 7938 和 9120 之间，index = 1
      //positionY 在 9120 和 9452 之间，index = 2
      //positionY 超过 9452 值，index = 3
      let length = this.themeTopYs.length
      for(let i =0;i<length;i++ ) {
        if(this.currentIndex !==i && ((i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1]) || (i ===length-1 && positionY>=this.themeTopYs[i]))){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex


        }
      }
      //3.是否显示回到顶部
      this.isShowBackTop = -position.y > BACK_POSITION

    },
    addToCart() {
      //获取购物车需要展示的商品信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.realPrice;
      product.iid = this.iid;
      //2.将商品添加到购物车中
      this.addCart(product).then(res => {
        this.show = true
        this.message = res
        setTimeout(()=>{
          this.show = false;
          this.message = ''
        },1500)
      })

      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // })

    }
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100%-44px-49px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>