<template>
  <view v-if="goods_info.goods_name" class="goods-container">
    <!-- 轮播图区域 -->
    <swiper class="swiperList" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
      :circular="true">
      <swiper-item v-for="(item,i) in goods_info.pics" :key="i">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <!-- 轮播图区域 end-->
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">￥{{goods_info.goods_price}}</view>
      <!-- 商品信息主题区域 -->
      <view class="goods-info-body">
        <!--商品名 -->
        <view class="goods-name">{{goods_info.goods_name}}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费区域 -->
      <view class="yf">
        快递：免运费
      </view>
    </view>
    <!-- 详情信息 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <!-- 商品导航组件区域 -->
    <view class="goods-nav">
      <uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 商品详情对象
        goods_info: {},
        // goods-nav参数
        options: [{
        			icon: 'headphones',
        			text: '客服'
        		}, {
        			icon: 'shop',
        			text: '店铺',
        		
        			infoBackgroundColor:'#007aff',
        			infoColor:"red"
        		}, {
        			icon: 'cart',
        			text: '购物车',
        			info: 2
        		}],
        	    buttonGroup: [{
        	      text: '加入购物车',
        	      backgroundColor: '#ff0000',
        	      color: '#fff'
        	    },
        	    {
        	      text: '立即购买',
        	      backgroundColor: '#ffa200',
        	      color: '#fff'
        	    }
        	    ]
      };
    },
    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id)
    },
    methods: {
      async getGoodsDetail(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        
        this.goods_info = res.message
        this.goods_info.goods_introduce=this.goods_info.goods_introduce.replace(/<img /g,'<img style="display: block;" ').replace(/webp/g,'jpg')
           
      },
      preview(i) {
        uni.previewImage({
          current: i,
          urls: this.goods_info.pics.map(x => x.pics_big)
        })
      },
      // goods-nav方法
        onClick (e) {
          if(e.content.text=="购物车"){
            uni.switchTab({
              url:'/pages/cart/cart'
            })
          }
      	  },
      	  buttonClick (e) {
      	    console.log(e)
      	    this.options[2].info++
      	  }
    }
  }
</script>

<style lang="scss" scoped>
  .swiperList {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .price {
      color: #c00000;
      font-size: 18px;
      margin: 10px 0;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
        margin-right: 10px;
      }

      .favi {
        width: 120px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-left: 1px solid #ccc;
        color: gray;
      }
    }

    .yf {
      color: gray;
      font-size: 12px;
      margin: 10px 0;
    }
  }
  .goods-nav{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .goods-container{
    padding-bottom:50px ;
  }
</style>
