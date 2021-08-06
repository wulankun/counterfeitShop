<template>
  <div class="bottom-bar">
      <div class="check-content" >
        <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
        <span>全选</span>
      </div>
      <div class="price-item">
          合计:{{totalPrice}}
      </div>  
      <div class="calculate"  @click="calcClick">
          去计算:{{checkLength}}
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'

export default {
  components: {
       CheckButton 
  },
name:'CarBottonBar',
methods:{
    checkClick(){
      
        if(this.isSelectAll){
            this.cartList.forEach(item=>item.checked=false)
        }else{
            this.cartList.forEach(item=>item.checked=true)
        }
        
    },
    calcClick(){
        if(!this.isSelectAll)
        this.$toast.show1('请选择购买的商品',2000)
    }
},
computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
        return '￥'+ this.$store.state.cartList.filter(item=>{
            return item.checked
        }).reduce((preValue,item)=>{
            return preValue+ item.price*item.count
        },0).toFixed(2)
    },
    checkLength(){
        return this.cartList.filter(item =>item.checked).length
    },
    isSelectAll(){
        if(this.$store.state.cartList.length===0) return false
           return  !(this.cartList.filter(item=>!item.checked).length)        //方法一
        //    return !this.cartList.find(item=>!item.checked)                     //方法二
        //    for(let item of this.cartList){
        //        if(!item.checked){
        //            return false
        //        }
        //                                                    //方法三
        //    }
        //    return true
       
         
    },
    
    
}

}
</script>

<style scoped>
.bottom-bar{
    
    height: 44px;
   position: relative;
   bottom: 0px;
  background: #eee;
   line-height: 44px;
   display: flex;
   
}
.check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 20px;
    margin-right:5px ;

}
.check-content{
    display: flex;
    align-items: center;
    width: 80px;
    
  
}
.price-item{
    position: relative;
    bottom: 0px;
    height: 44px;
    margin-left:15px ;
    width: 150px;
  
}
.calculate{
   
    flex: 1;
    background: red;
    color: #fff;
    text-align: center;
    
}
</style>