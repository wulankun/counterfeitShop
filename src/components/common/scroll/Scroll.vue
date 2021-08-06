<template>
<div class="wrapper" ref="wrapper">
    
   <div class="content">
       <slot></slot>

   </div>
 
</div>
  
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,                                                                
            default:false
        }


    },
   
    data(){
        return {
            scroll:null,
            // pro:this.probeType
          
        }
    },
    mounted(){
        this.scroll=new BScroll(this.$refs.wrapper,{
            
           click: true,
           observeDOM:true,
           probeType:this.probeType,                //可以滚动
           pullUpLoad:this.pullUpLoad,             //上拉加载
           observeImage:true,
           
          
         
           
           
        }),
        // console.log(this.scroll);
        this.scroll.on('scroll',(position)=>{
            // console.log(position);
            this.$emit('scroll',position)

        })
        this.scroll.on('pullingUp',()=>{                                  
          this.$emit('pullingUp')
        })
       

 
        
    },
    methods:{
        scrollTo(x,y,time=500){
           this.scroll&&this.scrollTo&&this.scroll.scrollTo(x ,y,time)
        },
        finishPullUp(){
          this.scroll.finishPullUp()
            
        },
        refresh(){                          //  1111加也可以但是scroll2.0版本不用了
            this.scroll.refresh()
            console.log('打印几次');
            
        },
        // getScrollY(){
        //     return  this.scroll.y ?this.scroll.y :0
        // }

    },


}
</script>

<style scoped>

</style>