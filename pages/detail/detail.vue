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
      <button type="default" class="header-btn" @click="follow">{{formData.is_author_like?'取消关注':'关注'}}</button>
    </view>
    <view class="detail-content">
      <view class="detail-html">
        <uparse :content="formData.content" :noData="noData"></uparse>
      </view>
      <view class="detail-comment">
        <view class="comment-title">最新评论</view>
        <view class="comment-content" v-for="item in commentList" :key="item.comment_id">
          <comments-box :comments="item" @reply="reply"></comments-box>
        </view>
      </view>
    </view>
    <view class="detail-bottom">
      <view class="bottom-input" @click="openPopup">
        <text>谈谈你的看法</text>
       <uni-icons type="compose" size="16" color="#F07373"></uni-icons>
      </view>
      <view class="bottom-icons">
        <view class="icons-box" @click="detailComment">
          <uni-icons type="chat" size="22" color="#F07373"></uni-icons>
        </view>
        <view class="icons-box" @click="likeTap">
          <uni-icons :type="formData.is_like?'heart-filled':'heart'" size="22" color="#F07373"></uni-icons>
        </view>
        <view class="icons-box" @click="thumbsUp">
          <uni-icons :type="formData.is_thumbs_up?'hand-thumbsup-filled':'hand-thumbsup'" size="22" color="#F07373"></uni-icons>
        </view>
      </view>
    </view>
    <release ref="popup" @submit="submit"></release>
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
        commentsValue: '',
        commentList: [],
        replyFormData: {}
			}
		},
    onLoad(query) {
      this.formData = JSON.parse(query.params);
      this.getDetail();
      this.getComment();
    },
		methods: {
			async getDetail() {
        const {data} = await this.$api.getDetail({
          article_id: this.formData._id
        });
        this.formData = data;
      },
      async getComment() {
        const {data} = await this.$api.getComment({
          article_id: this.formData._id
        });
        this.commentList = data;
      },
      async updateComment(content) {
        const formData = {
         article_id: this.formData._id,
         ...content
        }
        uni.showLoading();
        await this.$api.updateComment(formData);
        uni.hideLoading()
        uni.showToast({
          title:'评论发布成功'
        })
        this.getComment();
        this.close();
        this.replyFormData = {};
        this.commentsValue = '';
      },
      openPopup() {
        // 打开窗口之前清空内容 
        this.commentsValue = '';
        this.$refs.popup.open();
      },
      submit(content) {
        this.updateComment({content, ...this.replyFormData})
      },
      close() {
        this.$refs.popup.close();
      },
      reply(e) {
        this.replyFormData = {
          "comment_id": e.comments.comment_id,
          "is_reply": e.is_reply
        }
        if (e.comments.reply_id) {
          this.replyFormData.reply_id = e.comments.reply_id
        }
        //console.log(this.replyFormData);
        this.openPopup();
      },
      // 关注作者
      follow() {
        this.updateAuthor();
       
      },
      async updateAuthor() {
        uni.showLoading();
        await this.$api.updateAuthor({
          author_id: this.formData.author.id
        })
        uni.hideLoading();
        this.formData.is_author_like = !this.formData.is_author_like;
        uni.showToast({
          title: this.formData.is_author_like?'关注作者成功':'取消关注作者',
          icon:'none'
        })
        uni.$emit('updateFollow', 'follow');
      },
      // 收藏文章
      likeTap() {
        this.updateLike();
      },
      async updateLike() {
        uni.showLoading();
        await this.$api.updateLike({
          article_id: this.formData._id
        })
        uni.hideLoading();
        this.formData.is_like = !this.formData.is_like;
        // detail页面收藏改变之后，通知首页重新加载
        uni.$emit('updateLike');
        uni.showToast({
          title: this.formData.is_like?'收藏文章':'取消收藏',
          icon:'none'
        })
      },
      // 点赞
      thumbsUp() {
        this.updateUp();
      },
      async updateUp() {
        if (this.formData.is_thumbs_up) {
          uni.showToast({
            title: '您已经点过赞了',
            icon:'none'
          })
          return
        }
        uni.showLoading();
        await this.$api.updateUp({
          article_id: this.formData._id
        })
        uni.hideLoading();
        this.formData.is_thumbs_up = true;
        this.getDetail();
      },
      detailComment(article_id) {
        uni.navigateTo({
          url: '/pages/comments/comments?id='+this.formData._id
        })
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
        top: 0;
        right: 15px;
        flex-shrink: 0;
        width: 80px;
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
    .detail-comment {
      margin-top: 30px;
     .comment-title {
       padding: 10px 15px;
       font-size: 14px;
       color: #666;
       border-bottom: 1px solid #F5F5F5;
     }
      .comment-content {
        padding: 0 15px;
        border-top: 1px solid #eee;
      }
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
  
</style>
