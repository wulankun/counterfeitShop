<template>
 <swiper>
  <swiper-item v-for="(item, index) in banners" :key="index">
    <a  :href="item.link">
      <img :src="item.image" alt=""  @load="imageLoad">
    </a>
  </swiper-item>
 
</swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    name:'homeSwiper',
data(){
  return{
    isLoad:false
  }
},
    
    props:{
        banners:{
        type:Array,
        default(){
            return []
        }}
    },
    methods:{
      imageLoad(){
        if(!this.isLoad){
      this.$emit('swipperImageLoad')
      this.isLoad=true
      }}
    },
    components:{
   Swiper,
   SwiperItem

        
    }

}

</script>

<style>

</style>