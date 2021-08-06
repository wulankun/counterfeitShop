import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast'
import FastClick from 'fastclick'
import vuelazyload from 'vue-lazyload'
 //使用toast 需要三个地方  Toast.vue  index.js  main.js   使用是 this.$toast.show1('你好啊',2000) 
Vue.prototype.$bus=new Vue()

Vue.use(toast)

FastClick.attach(document.body)

Vue.use(vuelazyload,{
  loading:require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
