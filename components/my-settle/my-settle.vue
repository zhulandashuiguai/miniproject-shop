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
  <view class="btn-settle">
  结算({{checkedCount}})
  </view>

  </view>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        
      };
    },
    computed:{
      ...mapGetters('cart',['checkedCount','total','checkedGoodsAmount']),
      isFullChecked(){
        return this.checkedCount===this.total
      }
    },
    methods:{
      ...mapMutations('cart',['updateCheckedAll']),
      checkedAllClick(){
        this.updateCheckedAll(!this.isFullChecked)
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