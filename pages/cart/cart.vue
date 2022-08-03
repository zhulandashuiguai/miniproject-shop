<template>
  <view class="wrap" v-if="cart.length !== 0">
    <!-- 收货地址组件 -->
    <my-address></my-address>
    
    <!-- 购物车标题区域 -->
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="text">购物车</text>
    </view>
    <!-- 商品列表区域 -->
    <uni-swipe-action>
      <block class="goods-list" v-for="(item,i) in cart" :key="i">  
        <uni-swipe-action-item :right-options="options" @click="swipeItemClick(item)" >
          <goods-item :showNum="true" @radioChangeClick="radioChangeClick" :item="item" :showRadio="true"
            @numChange="numChange"></goods-item>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <!-- 结算区域 -->
    <my-settle></my-settle>
  </view>

<!-- 空白购物车页面 -->
<view class="empty" v-else>
  <image src="/static/cart_empty@2x.png" class="empty-img" ></image>
  <text class="empty-text">空空如也~</text>
</view>
</template>

<script>
  import badgeMixin from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [badgeMixin],
    computed: {
      ...mapState('cart', ['cart'])
    },
    onShow() {},
    methods: {
      ...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount','removeGoodsById']),
      // 更新选中状态
      radioChangeClick(e) {
        // console.log(e);
        this.updateGoodsState(e)
      },
      // 更新商品数量
      numChange(e) {
        // console.log(e);
        this.updateGoodsCount(e)
      },
      swipeItemClick(item){
         // console.log(item);
         this.removeGoodsById(item)
        }
    },
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#C00000'
          }
        }]
      };
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    background-color: #fff;
    padding-bottom: 50px;
  }

  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    border-bottom: 1px solid #ccc;

    .text {
      font-size: 14px;
      margin-left: 10px;
    }
  }
  .empty{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    .empty-img{
      width: 90px;
      height: 90px;
    }
    .empty-text{
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
  
</style>
