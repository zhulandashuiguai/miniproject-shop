export default {
  namespaced: true,
  state() {
    return {
      // 购物车的数组，用来存储购物车中每个商品的信息对象
      // 每个商品的信息对象，都包含如下 6 个属性：
      // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
      cart: JSON.parse(uni.getStorageSync('cart') || '[]') 
    }
  },
  mutations:{
    addToCart(state,goods){
      const findResult= state.cart.find(item=>item.goods_id===goods.goods_id)
      // console.log('findResult:'+findResult);
      if(!findResult){
        state.cart.push(goods)
      }else{
        findResult.goods_count++
      }      
      // console.log(state.cart);
      this.commit('cart/saveToStorage')
    },
    saveToStorage(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    // 更新购物车选中状态
    updateGoodsState(state,goods){
      let findResult = state.cart.find(x=>x.goods_id==goods.goods_id)
      if(findResult){
        findResult.goods_state=goods.goods_state
      }
      this.commit('cart/saveToStorage')
    },
    updateGoodsCount(state,goods){
      let findResult = state.cart.find(x=> x.goods_id == goods.goods_id)
      if(findResult){
        findResult.goods_count=goods.goods_count
      }
      this.commit('cart/saveToStorage')
    },
    removeGoodsById(state,goods){
      state.cart = state.cart.filter(x=>x.goods_id !== goods.goods_id)
      this.commit('cart/saveToStorage')
    },
    updateCheckedAll(state,newState){
      state.cart.forEach(item=>item.goods_state=newState)
      this.commit('cart/saveToStorage')
    }
  },
  getters:{
    // 购物车商品总数
    total(state){
      let c=0
      state.cart.forEach(item=> c+=item.goods_count)
      return c
    },
    // 购物车勾选商品数
    checkedCount(state){
      return state.cart.filter(item=>item.goods_state).reduce((total,goods)=>{
        return total+=goods.goods_count
      },0)
    },
    // 已勾选的商品的总价
    checkedGoodsAmount(state) {
      return state.cart.filter(item=>item.goods_state).reduce((total,x)=>{
        return (total+=x.goods_count*x.goods_price)
      },0).toFixed(2)
    }
  } 
}
