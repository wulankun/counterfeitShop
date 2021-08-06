<template>

<div class="cart">
  <nav-bar class="nav-bar"><div slot="center"> 购物车({{cartLength}})</div></nav-bar>
  <cart-list></cart-list>
  <car-botton-bar></car-botton-bar>
</div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'

import {mapGetters} from 'vuex'
import CartList from './children/CartList'
import CarBottonBar from './children/CarBottonBar'


export default {
   name:'Car',
  components: { 
    NavBar,
    CartList,
    CarBottonBar,
  },
  computed:{
    ...mapGetters(['cartLength']) ,  //方法一
    // a(){
    //   return this.$store.getters.cartLength      //方法二
    // }
  }
}

</script>

<style scoped>
.nav-bar{
  background: var(--color-tint);
  color: #fff;
  /* font-weight: 700; */
}
.cart{
  height: 100vh;
  overflow: hidden;
  
}

</style>