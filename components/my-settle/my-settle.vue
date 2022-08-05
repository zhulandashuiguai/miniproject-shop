<template>
  <view class="settle-box">
  <!--全选 -->
  <view class="">
    <label class="radio">
      <radio color="#c00000" @click="checkedAllClick" :checked="isFullChecked" /><text>全选</text>
    </label>
  </view>
  <!-- 合计 -->
  <view class="amout-box">
    合计：<text class="amout" >￥{{checkedGoodsAmount}}</text>
  </view>
 <!-- 结算 -->
  <view class="btn-settle" @click="settlement">
  结算({{checkedCount}})
  </view>

  </view>
</template>

<script>
  import {mapGetters,mapMutations,mapState} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        // 倒计时秒数
        seconds:3
      };
    },
    computed:{
      ...mapGetters('cart',['checkedCount','total','checkedGoodsAmount']),
      ...mapGetters('user',['addstr']),
      ...mapState('user',['token']),
      ...mapState('cart',['cart']),
      isFullChecked(){
        return this.checkedCount===this.total
      }
    },
    methods:{
      ...mapMutations('cart',['updateCheckedAll']), 
      ...mapMutations('user',['updateRedirectInfo']),
      checkedAllClick(){
        this.updateCheckedAll(!this.isFullChecked)
      },
      // 点击结算按钮
      settlement(){
          // 1. 先判断是否勾选了要结算的商品
        if(this.checkedCount==0)  return uni.$showMsg('请选择要结算的商品！')
          // 2. 再判断用户是否选择了收货地址
          if(this.addstr=='') return uni.$showMsg('请选择收货地址！')
          // 3. 最后判断用户是否登录了
          // if(!this.token) return uni.$showMsg('请先登录！')
          if(!this.token) this.delayNavigate()
        // 4. 实现微信支付功能
          this.payOrder()
      },
     async payOrder(){
        // 1.创建订单
        // 1.1 组织订单的信息对象
        const orderInfo={
          order_price:0.01,
          consignee_addr:this.addstr,
          goods:this.cart.filter(item=>item.goods_state).map(goods=>{
            return {
              goods_id:goods.goods_id,
              goods_number:goods.goods_count,
              goods_price:goods.goods_price
            }
          })
        }
        // 1.2 发起请求创建订单
        const {data:res} = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
       // console.log(res);
        // if(res.meta.status !==200) return uni.$showMsg('创建订单失败！')
        
        
        // 1.3 得到服务器响应的“订单编号”
         // const orderNumber = res.message.order_number
         const orderNumber = 'HMDD20200901000000001949'
         // c'nsole.log(orderNumber);'
           // 2. 订单预支付
           // 2.1 发起请求获取订单的支付信息
        const {data:res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:orderNumber})
            // 2.2 预付订单生成失败
            if(res2.meta.status!==200)  return uni.$showMsg('预付订单生成失败！')
            // 2.3 得到订单支付相关的必要参数
            const payInfo = res2.message.pay
            console.log(payInfo); 
             // 3. 发起微信支付
              // 3.1 调用 uni.requestPayment() 发起微信支付
                const [err, succ] = await uni.requestPayment(payInfo)
                // 3.2 未完成支付
                if (err) return uni.$showMsg('订单未支付！')
                // 3.3 完成了支付，进一步查询支付的结果
                const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
                // 3.4 检测到订单未支付
                if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
                // 3.5 检测到订单支付完成
                uni.showToast({
                  title: '支付完成！',
                  icon: 'success'
                })
      }, 
      // 展示倒计时提示消息
      showTips(n){
        uni.showToast({
          icon:'none',
          title:'请登陆后再结算！ '+n+"秒之后自动跳转到登录页",
          mask:true,
          duration:1010
        })
      },
      // 演示导航到登陆页面
      delayNavigate(){
        this.seconds=3
        this.showTips(this.seconds)
          let timer= setInterval(()=>{
            this.seconds--
            this.showTips(this.seconds)
            if(this.seconds==0){
              this.seconds=3
              clearInterval(timer)
              uni.switchTab({
                url:'/pages/my/my',
                success:()=>{
                  let info = {
                    openType:'switchTab',
                    from:'/pages/cart/cart'
                  }
                  this.updateRedirectInfo(info)
                }
              })
            }
          },1000)
        }
      }
    }

</script>

<style lang="scss" scoped>
.settle-box{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
font-size: 14px;
  padding-left: 5px;
.radio{
  display: flex;
  align-items: center;
}
  .amout-box{
    .amout{
      color: #C00000;
      font-weight: 700;
    }
  }
  .btn-settle{
    background-color: #C00000;
    height: 50px;
    color: white;
    padding:0 10px;
    line-height: 50px;
    min-width: 100px;
    text-align: center;
  }
}



</style>