<template>
  <view class="login-box">
    <uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
    <button type="primary" class="login-btn" @click="getUserInfo" >一键登录</button>
    <text class="text">登陆后尽享更多权益</text>
  </view>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
  export default {
    name:"my-login",
    data() {
      return {
      };
    },
    computed:{
      ...mapState('user',['redirectInfo']) 
      }
    ,
    methods:{
      ...mapMutations('user',['updateUserInfo','updateToken','updateRedirectInfo']),
      getUserInfo(){
        uni.getUserProfile({
          desc:'个人学习使用',
          success:(res)=>{
            // console.log(res.userInfo)
            this.updateUserInfo(res.userInfo)
            
            // 获取登录成功之后的token字符串
            this.getToken(res)
          },
          fail(res1) {
            if(res1) return uni.$showMsg('您取消了授权！')
          }
        })
      },
      async getToken(info){
       const [err,res]=  await uni.login().catch(err=>err)
      // console.log(res);
      if(err || res.errMsg!== "login:ok") return uni.$showMsg('登录失败！')
       // console.log(res.code);
       // 准备参数
       const query ={
         code:res.code,
         encryptedData:info.encryptedData,
         iv:info.iv,
         rawData:info.rawData,
         signature:info.signature
       }
       const {data:loginResule}= await uni.$http.post('/api/public/v1/users/wxlogin',query)
       // console.log(loginResule);
       if(loginResule.meta.status!==400) return uni.$showMsg('登录失败！')
       // uni.$showMsg('登录成功！')
       // 模拟token
       const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
       this.updateToken(token)
        // 判断 vuex 中的 redirectInfo 是否为 null
         // 如果不为 null，则登录成功之后，需要重新导航到对应的页面
         this.navigateBack()
      },
      navigateBack(){
        if(this.redirectInfo && this.redirectInfo.openType=='switchTab'){
          uni.switchTab({
            url:this.redirectInfo.from,
            success: () => {
              this.updateRedirectInfo({}) 
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.login-box{
  height: 750rpx;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  &::after{
    content: ' ';
    display: block;
    width: 100%;
    height: 40px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 100%;
    transform: translateY(50%);
  }
  
  .login-btn{
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
  }
  .text{
    font-size: 12px;
    color: gray;
  }
}
</style>