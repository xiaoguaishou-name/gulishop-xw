<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHide"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// import {reqCategoryList} from '@/api'
export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  // 只是测试接口函数是否可用
  // mounted(){
  //   reqCategoryList()
  // }
  mounted() {
    this.getCategoryList();
  },
  methods: {
    getCategoryList() {
      this.$store.dispatch("getCategoryList");
    }
  }
}
</script>

<style lang="less" scoped>
</style>
