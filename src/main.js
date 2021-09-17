import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/mock/mock'
import '@/utils/instance'
import "@/utils/http";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/publiccss/public.css'
import '@/utils/token'
import '@/router/permission'



Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
