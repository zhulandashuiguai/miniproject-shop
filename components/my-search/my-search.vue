<template>
  <view class="searchContainer" :style="'background-color:' +bgColor" @click="gotoSearch">
    <view class="searchBox" :style="'border-radius:'+radius+'px' ">
      <icon type="search" size="17" />
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-search",
    props:{
    // 背景颜色
    bgColor:{
      type:String,
      default:'#C00000'
    },
    // 圆角尺寸
    radius:{
      type:Number,
      default:18//px
    }
    },
    data() {
      return {

      };
    },
    methods:{
      gotoSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
        this.$emit('click')
      }
    }
    
  }
</script>

<style lang="scss" scoped>
  .searchContainer {
    height: 50px;
    // background-color: #C00000;
    display: flex;
    align-items: center;
    padding: 0 10px;
    .searchBox{
      height: 36px;
      background-color: #fff;
      // border-radius: 18px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .placeholder{
        font-size: 15px;
        margin-left: 5px;
      }
    }
  }
</style>
