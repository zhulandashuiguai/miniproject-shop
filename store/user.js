export default {
  namespaced:true,
  
  state(){
    return{
      address:JSON.parse(uni.getStorageSync('address') || '{}'),
      token:uni.getStorageSync('token') || '',
      userInfo:JSON.parse(uni.getStorageSync('userInfo') || "{}"),
      // 重定向的 object 对象 { openType, from }
        redirectInfo: null
    }
  },
  mutations:{
   //更新收货地址 
    updateAddress(state,address){
      state.address=address
      this.commit('user/saveToStorage')
    },
    // 持久化存储address
    saveToStorage(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    },
    // 修改用户信息
    updateUserInfo(state,userInfo){
      state.userInfo=userInfo
      this.commit('user/saveUserInfoToStorage')
    },
    saveUserInfoToStorage(state){
      uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
    },
    updateToken(state,token){
      state.token=token
      this.commit('user/saveTokenToStorage')
    },
    saveTokenToStorage(state){
      uni.setStorageSync('token',state.token)
    },
     // 更新重定向的信息对象
      updateRedirectInfo(state, info) {
        state.redirectInfo = info
        console.log(info);
      }
    
  },
  
  getters:{
    addstr(state){
      if(!state.address.provinceName){return ''} 
      
      return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
    }
  }
  
}