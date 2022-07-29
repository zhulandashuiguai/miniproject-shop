<template>
  <view>
    <!-- 轮播图区域 -->
    <view>
      <swiper :indicator-dots="true" :autoplay="true" :circular="true" :interval="3000" :duration="1000">
        <swiper-item v-for="(item,i) in swiperList" :key="i">
          <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">                 
            <image :src="item.image_src" mode=""></image>
          </navigator>
        </swiper-item>
      </swiper>
    </view>
    <!-- end --> 
    <!-- 分类导航区域 -->
    <view class="navList">
      <view class="navItem" v-for="(item,i) in navList" :key="i" @click="navItemClick(item)" >
        <image :src="item.image_src" ></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floorList">
      <view class="floorListItem" v-for="(item,i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floorTitle"></image>
        <!-- 楼层图片 -->
        <view class="floorImgBox">
          <!-- 左边图片 -->
          <navigator class="leftImgBox" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="'width:'+ item.product_list[0].image_width+'rpx'" mode="widthFix" ></image>
          </navigator>
          <!-- 右边图片 -->
          <view class="rightImgBox">
            <navigator :url="innerItem.url" class="rightImgItem" v-for="(innerItem,index) in item.product_list" :key="index" v-if="index !== 0">
              <image :src="innerItem.image_src" :style="'width:'+innerItem.image_width+'rpx'" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view> 
</template>

<script>
  export default {
    data() {
      return {
        swiperList:[],
        navList:[],
        //  楼层的数据列表
              floorList: [],
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    }, 
    methods:{
      async getSwiperList(){
        const {data:res}= await uni.$http.get('/api/public/v1/home/swiperdata');
        // console.log(res);
        // 请求失败
        if(res.meta.status!==200) return uni.$showMsg()
        // 请求成功
        this.swiperList=res.message
      }, 
      async getNavList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/catitems');
        if(res.meta.status!==200) return uni.$showMsg()
        this.navList=res.message
      },
      async getFloorList(){
       const {data:res}= await uni.$http.get('/api/public/v1/home/floordata')
       if(res.meta.status!==200) return uni.$showMsg()
       // 先对数据进行处理
       res.message.forEach(item=>{
         item.product_list.forEach(prod=>{
           prod.url='/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1] 
         })
       })
       this.floorList=res.message
      }
      ,
      navItemClick(item){ 
        // console.log(item);
        if(item.name==='分类'){
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
        
      }
    },
    
  }
</script>

<style lang="scss">
swiper{
  height: 330rpx;
  .swiper-item,image{
    width: 100%;
    height: 100%;
  }
}
.navList{
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  image{
    width: 128rpx;
    height: 140rpx;
  }
}
.floorList{
  .floorTitle{
     height: 60rpx;
      width: 100%;
      // display: flex;
  }
  .floorImgBox{
    display: flex;
    padding-left: 10rpx;
    .leftImgBox{
      image{
        
      }
    }
    .rightImgBox{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
  }
}
}
</style>
