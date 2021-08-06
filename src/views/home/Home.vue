<template>

  <div id="home" class="wrapper" >   
    
<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
<tab-control 
 
 class="tab-control"  
  :titles="['流行','新款','精选']" 
  @tabClick="tabClick" 
  ref="tabControl1" 
      v-show="isTabFixed"  />

  <scroll class="content" 
   ref="scroll"
   :probe-type="3" 
    @scroll="contentScroll" 
    :pull-up-load="true" 
  @pullingUp="loadMore" 
    >
<home-swiper :banners="banners"
             @swipperImageLoad="swipperImageLoad" 
             >
 </home-swiper>                      <!--  111 /*组件间传值*/     -->    
<recommend-view :recommends="recommends" ></recommend-view>
<feature-view></feature-view>

<tab-control 
 
 
  :titles="['流行','新款','精选']" 
  @tabClick="tabClick" 
  ref="tabControl2" 
 />

<goods-list :goods="showGoods" />

  </scroll>
<back-top @click.native="backClick"  v-show="isShowBackTop"></back-top>

  </div>
  
 
</template>

<script>



import HomeSwiper from './children/homeSwiper'
import RecommendView from './children/RecommendView'
import FeatureView from './children/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
// import BackTop from 'components/content/backtop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'

// import {debounce} from 'commom/utils'
import {itemListennerMixin,backTopMixin} from '../../commom/mixin'



export default {
    name:'Home',
  mixins:[itemListennerMixin,backTopMixin],   
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      // BackTop,
     
    },
  
    data(){
      return{
        banners:[],
        recommends:[],
        
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',
        // isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false ,
        saveY:0,
        
      }
    },

    computed:{
        showGoods(){
            return  this.goods[this.currentType].list
        }
    },
    created(){
     this.getHomeMultidata()
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
    },
    mounted(){
      // console.log('我是home啊');
      this.tabClick(0)
    },
     activated(){
      this.$refs.scroll.scrollTo(0,this.saveY)
      this.$refs.scroll.refresh()
     },
     deactivated(){
       this.saveY=this.$refs.scroll.scroll.y
      //  console.log(this.saveY);
      this.$bus.$off('itemImageLoad',this.itemImgListenner)
     },
      
    
    methods:{
// 事件监听相关的方法
tabClick(index){
  switch(index){
    case 0:
      this.currentType='pop'
      break;
      case 1:
      this.currentType='new'
      break;
      case 2:
      this.currentType='sell'
      break;

  }
  this.$refs.tabControl1.currentIndex=index
    this.$refs.tabControl2.currentIndex=index

},
// backClick(){
//   // this.$refs.scroll.scroll.scrollTo(0, 0,1000)
//   this.$refs.scroll.scrollTo(0,0,1000)
  
// },
contentScroll(position){
  // console.log(position);
 this.isShowBackTop=(-position.y)>1000
 this.isTabFixed=(-position.y)>this.tabOffsetTop


},
loadMore(){
  this.getHomeGoods(this.currentType)                               
  this.$refs.scroll.scroll.refresh()

},
swipperImageLoad(){
  this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop

  
},

 
// 网络请求相关的
      getHomeMultidata(){
         getHomeMultidata().then(res=>{
        this.banners=res.data.banner.list
        this.recommends=res.data.recommend.list
      })

      },
      getHomeGoods(type){
        const page=this.goods[type].page+1
         getHomeGoods(type,page).then(res=>{
               this.goods[type].list.push(...res.data.list)       //*重点* 获取到的新数据push进数组，这样就能展示前面的图片+后面获取的
               this.goods[type].page+=1
              this.$refs.scroll.finishPullUp()      
              // console.log(res);       //上拉加载                            

      })

      },
    }

}
</script>

<style scoped>
.home-nav{
 background-color: var(--color-tint);
 color: #fff;
 /* position: fixed;
 left: 0;
 top: 0;
 right: 0; */
 z-index: 9;
 
}
#home{
  /* padding-top:44px ; */
  height: 100vh;
  position: relative;
}

/* .tab-control{
  position: sticky ;
  top: 44px;                    // 不起作用了
  background: pink;
  z-index: 9;
} */

.content{
  /* height: 480px;       方法一 */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;       /* b  方法二 */
  left: 0px;
  right: 0px;

}
/* .content{
  height: calc(100% - 93px);
  margin-top: 44px;

overflow: hidden;
 
}  */
.tab-control{
  position: relative;
  z-index: 99;
  background: white;
}

</style>