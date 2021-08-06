<template>
<!-- 使用toast 需要三个地方  Toast.vue  index.js  main.js   使用是 this.$toast.show1('你好啊',2000) -->

  <div class="toast" v-show="isShow">
      <div >{{message}}</div>
  </div>
</template>

<script>
export default {
name:'Toast',

data(){
    return{
        message:'',
        isShow:false,
    }
},
methods:{
    show1(message='默认文字',duration=2000){

console.log(duration);
        this.isShow=true,
        this.message=message
        setTimeout(()=>{
            this.isShow=false
            this.message=''
        },duration)
    }
}
}
</script>

<style scoped>
.toast{
   
    position: fixed;
    left: 50%;
    top: 50%;
    background:rgba(0, 0, 0, .5);
    color: #fff;
    padding: 8px 10px;
    transform: translate(-50%,-50%);
    z-index: 999;

}
</style>