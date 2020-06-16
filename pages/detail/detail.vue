<template>
  <view class="detail">
    <view class="detail-title">{{formData.title}}</view>
    <view class="detail-header">
      <view class="detail-logo">
        <image :src="formData.author.avatar" mode="aspectFill"></image>
      </view>
      <view class="header-content">
        <view class="author">
          <text>{{formData.author.author_name}}</text>
        </view>
        <view class="detail-info">
          <text>{{formData.create_time}}</text>
          <text>{{formData.browse_count}} 浏览</text>
          <text>{{formData.thumbs_up_count}} 赞</text>
        </view>
      </view>
       <button type="default" class="header-btn">关注</button>
    </view>
    <view class="detail-content">
      <view class="detail-html">
        <uparse :content="formData.content" :noData="noData"></uparse>
      </view>
      <view class="detail-comment">
        <view class="comment-title">最新评论</view>
        <view class="comment-content" v-for="item in 5" :key="item">
          {{item}}com
        </view>
      </view>
    </view>
    <view class="detail-bottom">
      <view class="bottom-input">
        <text>谈谈你的看法</text>
       <uni-icons type="compose" size="16" color="#F07373" @click="openPopup"></uni-icons>
      </view>
      <view class="bottom-icons">
        <view class="icons-box">
          <uni-icons type="chat" size="22" color="#F07373"></uni-icons>
        </view>
        <view class="icons-box">
        <uni-icons type="heart" size="22" color="#F07373"></uni-icons>
        </view>
        <view class="icons-box">
        <uni-icons type="hand-thumbsup" size="22" color="#F07373"></uni-icons>
        </view>
      </view>
    </view>
    <view class="">
      <uni-popup ref="popup" type="bottom" :maskClick="false">
        <view class="popup-wrap">
          <view class="popup-header">
            <text class="popup-header__item" @click="close">取消 </text>
            <text class="popup-header__item" @click="submit">发布 </text>
          </view>
          <view class="popup-content">
            <textarea class="popup-textarea" v-model="commentsValue" maxlength="200" fixed placeholder="请输入评论内容" />
            <view class="popup-count">{{commentsValue.length}}/200</view>
          </view>
        </view>
      </uni-popup>
    </view>
  </view>

</template>

<script>
  import uparse from '@/components/gaoyia-parse/parse.vue'
	export default {
    components: {
      uparse
    },
		data() {
			return {
				formData: {},
        noData:'<p style="text-align:center;color:#666">详情加载中...</p>',
        commentsValue: ''
			}
		},
    onLoad(query) {
      this.formData = JSON.parse(query.params);
      this.getDetail();
    },
		methods: {
			async getDetail() {
        const {data} = await this.$api.getDetail({
          article_id: this.formData._id
        });
        this.formData = data;
        console.log(data);
      },
      openPopup() {
        this.$refs.popup.open();
      },
      submit() {
        this.updateComment(this.commentsValue);
      },
      async updateComment(content) {
        uni.showLoading();
        await this.$api.updateComment({
          article_id: this.formData._id,
          content
        });
        uni.hideLoading()
        uni.showToast({
          title:'评论发布成功'
        })
        this.close();
      },
      close() {
        this.$refs.popup.close();
      }
		}
	}
</script>

<style lang="scss">
  .detail {
    padding: 15px 0;
    padding-bottom: 54px;
    .detail-title {
      padding: 0 15px;
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }
    .detail-header {
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 10px;
      padding: 0 15px;
      .detail-logo {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .header-content {
        position: relative;
        width: 100%;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 12px;
        .author {
          font-size: 14px;
          color: #333;
        }
        .detail-info {
          color: #999;
          text {
             margin-right: 10px;
          }
        }
      }
      .header-btn {
        position: absolute;
        right: 15px;
        width: 70px;
        flex-shrink: 0;
        height: 30px;
        font-size: 12px;
        color: #fff;
        background-color: $theme-color;
      }
    }
  }
  .detail-content {
    margin-top: 20px;
    min-height: 500px;
    .detail-html {
      padding: 0 15px;
    }
  }
  .detail-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 44px;
    border-top: 1px #f5f5f5 solid;
    background-color: #fff;
    box-sizing: border-box;
    .bottom-input {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      width: 100%;
      border: 1px solid #ddd;
      padding: 0 10px;
      margin-left: 10px;
      border-radius: 5px;
      text {
        font-size: 14px;
        color: #999;
      }
    }
    .bottom-icons {
      display: flex;
      flex-shrink: 0;
      padding: 0 10px;
      .icons-box {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
      }
    }
  }
  .popup-wrap {
    background-color: #fff;
    .popup-header {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #666;
      border-bottom: 1px #F5F5F5 solid;
      .popup-header__item {
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
      }
    }
    .popup-content {

      margin-top: 20px;
      padding: 0 15px;
      width: 100%;
      box-sizing: border-box;
      textarea {
        width: 100%;
        height: 200px;
      }
      .popup-count {
        display: flex;
        justify-content: flex-end;
        font-size: 12px;
        color: #999;
      }
    }
  }
</style>
