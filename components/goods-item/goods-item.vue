<template>

    <view class="goods-item">
        <!-- 左边图片 -->
        <view class="goods-item-left">
          <label class="radio" v-if="showRadio" >
            <radio @click="radioClick" :checked="item.goods_state" color="#c00000" />
          </label>
          <image class="image" :src="item.goods_small_logo || defaultPic"></image>
        </view>
        <!-- 右边详情 -->
        <view class="goods-item-right">
          <!-- 商品标题 -->
          <view class="goods-title">{{item.goods_name}}</view>
          <view class="goods-info-box">
            <view class="goods-price">￥{{item.goods_price.toFixed(2)}}</view>
            <!-- 数量控制 -->
            <uni-number-box @change="numChange" class="numbox" min="1" :value="item.goods_count" v-if="showNum"></uni-number-box>
          </view>
        </view>
      </view>

</template>

<script>
  export default {
    name:"goods-item",
    props:{
      item:{
        type:Object,
        default:{}
      },
      showRadio:{
        type:Boolean,
        default:false
      },
      showNum:{
        type:Boolean,
        default:false
      }
    }
    ,
    data() {
      return {
        // 默认图片地址
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    methods:{
      radioClick(){
           this.$emit('radioChangeClick',{
             goods_id:this.item.goods_id,
             goods_state:!this.item.goods_state
           })
      },
      numChange(val){
          this.$emit('numChange',{
            goods_id:this.item.goods_id,
            goods_count:val-0
          })
      }
  },
  }
</script>

<style lang="scss" scoped>

    .goods-item {
      padding: 10px 5px;
      border-bottom: 1px solid #ccc;
      display: flex;

      .goods-item-left {
        margin-right: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .image {
          width: 100px;
          height: 100px;
          display: block;
        }
      }

      .goods-item-right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .goods-title {
          font-size: 13px
        }
        .goods-info-box{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .goods-price{
            font-size: 16px;
            color: #C00000;
          }
          .numbox{
            margin-right: 10px;
          }
        }
      }
    }
    
    
</style>