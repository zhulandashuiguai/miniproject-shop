
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store/store.js'
// 导入网络请求的包文件
import { $http } from '@escook/request-miniprogram'

// 配置请求的根路径
$http.baseUrl='https://api-hmugo-web.itheima.net'

Vue.config.productionTip = false

App.mpType = 'app'
uni.$http = $http
// 配置请求拦截器
$http.beforeRequest = function (options) {
  // do somethimg...
  uni.showLoading({
    title:'数据加载中...'
  })
  
    // 判断请求的是否为有权限的 API 接口
    // console.log(options);
    if(options.url.indexOf('/my/') !== -1){
      options.header={
        Authorization:store.state.user.token
      }
    }
    
    
}
// 响应拦截器，请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}
// 挂载showtoast方法
uni.$showMsg=function(title="数据加载失败",duration=1500){
      uni.showToast({
        title,
        duration,
        icon:'none'
      })
}

Vue.filter('toFixed',(num)=>{
    return Number(num).toFixed(2)
})

const app = new Vue({
    ...App,
      store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif