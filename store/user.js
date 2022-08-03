export default {
  namespaced:true,
  
  state(){
    return{
      address:JSON.parse(uni.getStorageSync('address') || '{}')
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
    }
  },
  
  getters:{
    addstr(state){
      if(!state.address.provinceName){return ''} 
      
      return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
    }
  }
  
}