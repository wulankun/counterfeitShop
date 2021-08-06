<template>
<div id="detail">
<detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
<scroll class="content" :pull-up-load="true" :probe-type="3" ref="scroll"  @scroll="contentScroll" >


    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods" />
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo"  @imageLoad="imageLoad"/>
    <detail-param-info :param-info="paramInfo" ref="param"/>
    <detail-comment-info :comment-info="commentInfo" ref="comment"/>
    <goods-list :goods="recommends" ref="recommend"/>
   

</scroll>
 <detail-bottom-bar  @addToCart="addToCart1"/>
 <back-top @click.native="backClick"  v-show="isShowBackTop"></back-top>
 <!-- <toast :message="message" :show="show"/> -->


</div> 
</template> 

<script>

import DetailNavBar from './children/DetailNavBar'
import DetailSwiper from './children/DetailSwiper'
import DetailBaseInfo from './children/DetailBaseInfo'
import DetailShopInfo from './children/DetailShopInfo'
import DetailGoodsInfo from './children/DetailGoodsInfo'
import DetailParamInfo from './children/DetailParamInfo'
import DetailCommentInfo from './children/DetailCommentInfo'



import Scroll from 'components/common/scroll/Scroll'
import GoodsList from '../../components/content/goods/GoodsList'
// import BackTop from 'components/content/backtop/BackTop'


import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '../../network/detail'
// import {debounce} from '../../commom/utils'  
import {itemListennerMixin,backTopMixin} from '../../commom/mixin'
import { debounce } from '../../commom/utils'
import DetailBottomBar from './children/DetailBottomBar'

import {mapActions} from 'vuex'

// import Toast from '../../components/common/toast/Toast'










export default {
 
name:'Detail',


data(){
    return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],              //这个函数是push 商品 参数 评论 推荐的 offsetTop  的值进来这个数组的
        getThemeTopY:null,
        currentIndex:0,
        // isShowBackTop:false,
        // message:'',
        // show:false
       
        
        
    }
},
mixins:[itemListennerMixin,backTopMixin],
components:{
DetailNavBar,
DetailSwiper,
DetailBaseInfo,
DetailShopInfo,
Scroll,
DetailGoodsInfo,
DetailParamInfo,
DetailCommentInfo,
GoodsList,
DetailBottomBar,
// Toast,
// BackTop,

},
created(){
   
 this.iid=this.$route.params.iid      
      //获取详情页的params    $route 获得当前页面的iid
          
 
 getDetail(this.iid).then(res=>{
    //  console.log(res);
    const data=res.result
    
    //  this.topImages=res.result.itemInfo.topImages
     this.topImages=data.itemInfo.topImages
   
    this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

    this.shop=new Shop(data.shopInfo)

    this.detailInfo=data.detailInfo

    this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

    if(data.rate.cRate !==0) {
    this.commentInfo=data.rate.list[0]
    }
    // this.$nextTick(()=>{
       
    //     this.themeTopYs=[]
    //     this.themeTopYs.push(0)
    //     this.themeTopYs.push(this.$refs.param.$el.offsetTop+250)
    //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop+250)
    //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop+250)
    //     console.log(this.themeTopYs);

    // })
    
 }),
 getRecommend().then(res=>{
     this.recommends=res.data.list
     
 }),
 this.getThemeTopY=debounce(()=>{
    
      this.themeTopYs=[]
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop-50)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-50)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-50)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
       


 },500)

},
mounted(){
// //  console.log('我是detail');
// this.themeTopYs.push(0)
// this.themeTopYs.push(this.$refs.param.$el.offsetTop)
// this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
// this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)


},
destroyed(){
this.$bus.$off('itemImgLoad',this.itemImglistnner)
},


methods:{
    ...mapActions(['addCart']
        
    ),
    imageLoad(){
        // this.$refs.scroll.refresh()              //二选一 下面这个也可以
        this.newrefresh()
        this.getThemeTopY()


       
        
    },
    titleClick(index){
      
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index])

    },
    contentScroll(position){
       const positionY= -position.y
     
 
    let length=this.themeTopYs.length
    for(let i=0;i<length-1;i++ ){
        
      
        // if(this.currentIndex!==i && ((i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||
        // (i===length-1&&positionY>=this.themeTopYs[i]))){
           
        //     this.currentIndex=i
    
        // this.$refs.nav.currentIndex=this.currentIndex
       
        // }
        if(this.currentIndex!==i&&(positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])){
                 this.currentIndex=i
    
        this.$refs.nav.currentIndex=this.currentIndex
       

        }
    }
     this.isShowBackTop=(-position.y)>1000
    },
//     backClick(){
//   // this.$refs.scroll.scroll.scrollTo(0, 0,1000)
//   this.$refs.scroll.scrollTo(0,0,1000)
  
// },
addToCart1(){
    const product={}
    product.image=this.topImages[0]
    product.title=this.goods.title
    product.desc=this.goods.desc
    product.price=this.goods.realPrice
    product.iid=this.iid

    // this.$store.commit('addCart',product)
    this.$store.dispatch('addCart',product).then(res=>{
        // this.show=true,
        // this.message=res,
        // setTimeout(()=>{
        //     this.show=false
        //     this.message=''
        // },1500)
        
     
       this.$toast.show1(res,2000)
        
    })

},
}
}
</script>

<style scoped>
#detail{
    position:relative;
    z-index:9;
   background:white;
   height: 100vh;
   overflow: hidden;
    
}
.content{
    height: calc(100% - 44px)
}
.detail-nav{
position: relative;
z-index: 9;
background-color: #fff;
}

</style>