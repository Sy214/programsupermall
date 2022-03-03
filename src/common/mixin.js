export const itemListenerMixin = {
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
}
export const BackTopMixin = {
  components: {
    BackTop
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0,0,300)
    },
    data() {
      return {
        isShowBackTop:false
      }
    }
  }
}