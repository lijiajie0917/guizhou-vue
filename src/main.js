// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'lib-flexible'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import $ from 'jquery'
import httpPlugin from '@/assets/js/http'
import 'echarts/extension/bmap/bmap';
import store from './store'//引入store
// import axios from 'axios'
// import Qs from 'qs'
import 'echarts/map/js/china.js';  //引入echarts中map.js

import Echarts from 'echarts'
Vue.prototype.echarts = Echarts
Vue.use(Echarts)
import 'echarts/extension/bmap/bmap';

Vue.use(ElementUI)
// Vue.use($)
Vue.use(httpPlugin)
Vue.config.productionTip = false
Vue.prototype.foo = 'bar'

// // 创建一个axios实例
// var axios_instance = axios.create({
// // config里面有这个transformRquest，这个选项会在发送参数前进行处理。
// // 这时候我们通过Qs.stringify转换为表单查询参数
//   transformRequest: [function (data) {
//     data = Qs.stringify(data)
//     return data
//   }],
//   // 设置Content-Type
//   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
// })
// Vue.use(VueAxios, axios_instance)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
