<template>
  <view>
    <view class="search-box">
      <uni-search-bar :radius="100" @confirm="search"	 placeholder="请输入搜索内容" cancelButton="none" @input="input">
      </uni-search-bar>
    </view>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length!==0">
        <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item)">
          <view class="goods-name">{{item.goods_name}}</view>
          <uni-icons type="forward" size="16"></uni-icons>
        </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 头 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clean"></uni-icons>
      </view>
      <!--  列表-->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
 
    data() {
      return {
      timer:null,
      kw:'',
      //搜索结果列表
      searchResults:[],
      // 搜索历史数组
      historyList:[]
      };
    },
    onLoad() {
      // let his = uni.getStorageSync('kw')
      // if(his){
      // this.historyList=JSON.parse(his)
      // }
      // 高级写法
      this.historyList=JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    computed:{
      histories(){
        return [...this.historyList].reverse()
      }
    },
    methods:{
      input(e){ 
        clearTimeout(this.timer)
        this.timer=setTimeout(()=>{
          // console.log(e);
          this.kw=e
          this.getSearchList()
        },500)
      },
     async getSearchList(){
        // 判断搜索关键词是否为空
        if(this.kw.trim()==''){
        this.searchResults=[]
        return
        }
       const {data:res}= await uni.$http.get('/api/public/v1/goods/qsearch',{ query: this.kw})
       if(res.meta.status!==200) return uni.$showMsg()
       // console.log(res);
       this.searchResults=res.message
       // 存入搜索关键字到搜索历史
       this.saveSerachHistory()
      },
      saveSerachHistory(){
        // if(this.historyList.includes(this.kw)) return
        // this.historyList.push(this.kw)
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList= Array.from(set)
        //将搜索历史记录持久化存储到本地、
         uni.setStorageSync('kw',JSON.stringify(this.historyList))
      }
      ,
      gotoDetail(item){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
        })
      },
      clean(){
        this.historyList=[]
        uni.setStorageSync('kw','[]')
      },
      gotoGoodsList(item){
        uni.navigateTo({
          url:'../goods_list/goods_list?query='+item
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.search-box{
  background-color: #C00000;
  position: sticky;
  top: 0;
  z-index: 99;
}

.sugg-list{
  padding: 0 5px;
  .sugg-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #ccc;
    .goods-name{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

.history-box{
  padding:0 5px;
  .history-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
  border-bottom: 1px solid #ccc ;
  }
  .history-list{
    display: flex;
    flex-wrap: wrap;
    uni-tag{
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}


</style>
