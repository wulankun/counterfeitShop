//<!-- 使用toast 需要三个地方  Toast.vue  index.js  main.js   使用是 this.$toast.show1('你好啊',2000) -->

import Toast from './Toast'


const obj={}

obj.install=function(Vue){
 
const toastContrustor=Vue.extend(Toast)

const toast= new toastContrustor()

toast.$mount(document.createElement('div'))

document.body.appendChild(toast.$el)

Vue.prototype.$toast=toast;


}

export default obj