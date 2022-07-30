<template>
  <view> 
    <!-- 滚动包裹盒子 -->
    <view class="scrollContainer">
      <!-- 左侧滚动区域 -->
      <scroll-view class="leftScroll"  scroll-y="true" style="height: 100vh;">
        <block v-for="(item,i) in cateList" :key="i">
          <view :class="['leftScrollItem',i===active?'active':'']"  @click="activeChange(i)">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- 右侧滚动区域 -->
      <scroll-view class="rightScroll" scroll-y="true" style="height: 100vh;" :scroll-top="scrollTop">
       <view class="catelv2" v-for="(item,i) in cateLevel2" :key="i">
         <!-- 二级分类标题 -->
         <view class="catelv2-title">
           /{{item.cat_name}}/ 
         </view>
         <!-- 渲染三级分类列表数据 -->
         <view class="catelv3-list">
           <view class="catelv3-item" v-for="(item2,i2) in item.children" :key="i2" @click="gotoGoodsList(item2)">
             <!-- 图片和文本 -->
             <image :src="item2.cat_icon"></image>
            <text>{{item2.cat_name}}</text>
           </view>
         </view>
        
       </view>
      </scroll-view>
       
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
  // 分类数据列表
    cateList: [],
    // 二级数据
    cateLevel2:[],
    // 激活项
    active:0,
    scrollTop:0
      };
    },
    onLoad() {
      this.getCateList()
    },
    methods:{
     async getCateList(){
        const {data:res} =await uni.$http.get('/api/public/v1/categories')
        // console.log(res);
        if(res.meta.status!==200) return uni.$showMsg()
        this.cateList=res.message
        // 
        this.cateLevel2=res.message[0].children
      },
      activeChange(i){
        this.active=i
        // 重新为二级分类赋值
        this.cateLevel2=this.cateList[i].children
        this.scrollTop= this.scrollTop==0?1:0
      },
      // 跳转到商品列表页面
      gotoGoodsList(item){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
        })
      }
      
    }
  }
</script>

<style lang="scss" scoped>
.scrollContainer{
  display: flex; 
  .leftScroll{
    width: 120px;
    background-color: #F7F7F7;
    .leftScrollItem{
      line-height: 60px;
      text-align: center;
      font-size: 12px;
      
      &.active {
        background-color: #fff;
        position: relative;
        &::before{
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #C00000;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  } 
  .rightScroll{
    background-color: #fff;
  }
}
.catelv2-title{
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  padding: 15px 0;
}
.catelv3-list{
  display: flex;
  // justify-content: space-around;
  flex-wrap: wrap;
  .catelv3-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    width: 33.33%;
    margin-bottom:10px ;
    image{
      width: 60px;
      height: 60px;
    }
    text{
      font-size: 12px
    }
  }
}
</style>
