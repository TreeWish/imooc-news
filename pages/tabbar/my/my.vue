<template>
	<view>
		<view class="my-header">
		  <view class="header-background">
		    <image :src="userInfo.avatar" mode="aspectFill"></image>
		  </view>
      <view class="header-logo">
        <view class="header-logo-box">
          <image :src="userInfo.avatar" mode="aspectFill"></image>
        </view>
        <text class="my-name">{{userInfo.author_name}}</text>
      </view>
      <view class="my-desc">
        <view class="desc-box">
          <text class="desc-title">被关注</text>
          <text>{{userInfo.follow_count}}</text>
        </view>
        <view class="desc-box">
          <text class="desc-title">粉丝</text>
          <text>{{userInfo.fans_count}}</text>
        </view>
        <view class="desc-box">
          <text class="desc-title">积分</text>
          <text>{{userInfo.integral_count || 0}}</text>
        </view>
      </view>
		</view>
    <view class="my-content">
      <view class="my-content-list" @click="myArticle">
        <view class="my-content-title">
          <uni-icons class="icons" type="contact" size="16" color="#666"></uni-icons>
          <text>我的文章</text>
        </view>
        <uni-icons type="arrowright" size="14" color="#666"></uni-icons>
      </view>
      <view class="my-content-list"  @click="feedback">
        <view class="my-content-title">
          <uni-icons class="icons" type="help" size="16" color="#666"></uni-icons>
          <text>意见反馈</text>
        </view>
        <uni-icons type="arrowright" size="14" color="#666"></uni-icons>
      </view>
    </view>
	</view>
</template>

<script>
  import {mapState} from 'vuex'
	export default {
		data() {
			return {
				userInfo: {}
			}
		},
    computed: {
        //...mapState(['userInfo'])
    },
    onLoad() {
      this.getUserInfo();
    },
		methods: {
			async getUserInfo() {
        const {data} = await this.$api.getUser();
        this.userInfo = data;
      },
      myArticle() {
        uni.navigateTo({
          url: '/pages/my-article/my-article'
        })
      }
		}
	}
</script>

<style lang="scss">
  page {
    background-color: #F5F5F5;
  }
  .my-header {
    position: relative;
    padding-bottom: 15px;
    .header-background {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0.3;
      filter: blur(8px);
      image {
        width: 100%;
        height: 100%;
      }
    }
    .header-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 30px;
      .header-logo-box {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .my-name {
        margin-top: 15px;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .my-desc {
      margin-top: 15px;
      display: flex;
      .desc-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        font-size: 12px;
        color: #999;
        .desc-title {
          font-size: 14px;
          color: #333;
        }
      }
    }
  }
  .my-content {
    .my-content-list {
      display: flex;
      justify-content: space-between;
      padding: 15px;
      margin-bottom: 10px;
      background-color: #FFFFFF;
      color: #333;
      font-size: 14px;
      .my-content-title {
        display: flex;
        align-items: center;
        .icons {
          margin-right: 5px;
        }
      }
    }
  }
</style>
