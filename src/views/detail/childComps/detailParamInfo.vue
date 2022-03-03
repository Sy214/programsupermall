<template>
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table v-for="(table,index) in paramInfo.size" class="info-size" :key="index">
      <tr v-for="(tr,indey) in table" :key="indey">
        <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(info,index) in paramInfo.infos">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name:'detailParamInfo',
  props:{
    paramInfo: {
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>
<style scoped>
 /* 样式自己做 */
</style>