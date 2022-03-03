<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>
<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'
export default {
  name:'CartBottomBar',
  methods:{
    checkClick() {
      if(this.isSelectAll) {//全部选中
      this.$store.state.cartList.forEach(item => item.checked = false)
      }else {//全部或者部分不选中
        this.$store.state.cartList.forEach(item =>item.checked =true)
      }
    }
  },
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return '￥'+this.$store.state.cartList.filter(item =>{
        return item.checked
      }).reduce((preValue,item) =>{
        return preValue+item.price * item.count
      },0).toFixed(2) 
    }
  },
  checkLength() {
    return this.$store.state.cartList.filter(item => item.checked).length
  },
  isSelectAll() {
    if(this.$store.state.cartList.length === 0) return false
    //1.使用filter
    return !(this.$store.state.cartList.filter(item => !item.checked).length)
    
    //2.使用find
    // return !this.$store.state.cartList.find(item =>!item.checked)

    //3.使用遍历
  //   for(let item of this.$store.state.cartList) {
  //     if(!item.checked) {
  //       isChecked = false
  //       return false
  //     }
  //   }
  //   return turn }
  }
}
</script>
<style scoped>
 .bottom-bar {
   height: 40px;
   background-color: #eee;
   position: relative;
   bottom: 40px;
   line-height: 40px;
   display: flex;
 }
 .check-content {
   width: 40px;
   display: flex;
   align-items: center;
   margin-left: 10px;
 }
 .check-button {
   width: 20px;
   height: 20px;
   line-height: 20px;
 }
 .price {
   margin-left: 20px;
   flex: 1;
 }
 .calculate {
   width: 90px;
   background-color: red;
   color: white;
   text-align: center;

 }

</style>