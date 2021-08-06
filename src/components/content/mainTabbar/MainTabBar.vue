<template>
<tab-bar>
   <!-- 这里可以用动态的传入路径path也可以用静态的 -->
      <tab-bar-item path="/home" activeColor="pink"> 
        <img  slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
         <img  slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
          <div slot="item-text">首页</div>
         

      </tab-bar-item>
       <!-- 这里可以用动态的传入路径也可以用静态的 如果是 -->
      <tab-bar-item path="/category"  activeColor="pink">
          <img  slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
            <img  slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
          <div slot="item-text">分类</div>
      </tab-bar-item>
       
      <tab-bar-item path="/car"  activeColor="pink">
          <img  slot="item-icon" src="~assets/img/tabbar/cart.svg" alt="">
            <img  slot="item-icon-active" src="~assets/img/tabbar/cart_active.svg" alt="">
          <div slot="item-text">购物车</div>


      </tab-bar-item>
      <tab-bar-item path="/profile"  activeColor="pink">
          <img  slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
            <img  slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
          <div slot="item-text">我的</div>


      </tab-bar-item>
  </tab-bar>


  
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'



export default {
    name:'MainTabBar',
    components:{
        TabBar,
        TabBarItem

    }

}
</script>

<style scoped>

</style>