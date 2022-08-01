<template>
  <view>
    <view class="goodslist">
      <view v-for="(item,i) in goodsList" :key="i" @click="gotoDetail(item)">
        <goods-item :item="item"></goods-item>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        isLoading:false,
        // 请求参数对象
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || '';
      this.queryObj.cid = options.cid || '';
      // console.log(options);

      this.getGoodsList()
    },
    onReachBottom(){
      if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total) return uni.$showMsg('数据加载完毕')
       
      if(this.isLoading) return
      this.queryObj.pagenum += 1
      this.getGoodsList()
    },
    onPullDownRefresh() {
      // console.log('123321');
      this.queryObj.pagenum=1
      this.total=0
      this.goodsList=[]
      this.getGoodsList(()=>uni.stopPullDownRefresh())
    },
    methods: {
      // 获取商品列表数据
      async getGoodsList(cb) {
        // 打开节流阀
        this.isLoading=true
        
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        // 关闭节流阀
        this.isLoading=false
        cb&&cb()
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      gotoDetail(item){
        uni.navigateTo({
          url:'../goods_detail/goods_detail?goods_id='+item.goods_id
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .goodslist {}
</style>
