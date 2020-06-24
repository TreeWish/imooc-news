<template>
  <view class="comments-box">
    <view class="comments-header">
      <view class="logo"><image :src="comments.author.avatar" mode="aspectFill"></image></view>
      <view class="info">
        <view v-if="comments.is_reply" class="title">
          {{ comments.author.author_name }}
          <text class="to-reply">回复</text>
          {{comments.to}}
        </view>
        <view v-else class="title">{{ comments.author.author_name }}</view>
        <view>{{ comments.create_time | dateFormat }}</view>
      </view>
    </view>
    <view class="comments-content">
      <view>{{ comments.comment_content }}</view>
      <view class="comments-info">
        <view class="reply-btn" @click="reply({ comments, is_reply: replys })">回复</view>
      </view>
      <view class="comments-reply" v-for="item in comments.reply" :key="item.comment_id">
        <comments-box :comments="item" :replys="true" @reply="reply"></comments-box>
      </view>
    </view>
  </view>
</template>

<script>
import commentsBox from '@/components/comments-box/comments-box.vue'
import {parceTime} from '@/utils/time.js' 
export default {
  name: 'comments-box',
  components: {
    commentsBox
  },
  props: {
    comments: {
      type: Object,
      default() {
        return {}
      }
    },
    replys: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    dateFormat(time) {
      return parceTime(time);
    }
  },
  data() {
    return {};
  },
  methods: {
    reply(comments) {
      // 为了区分 主回复，还是子回复
      if (comments.is_reply) {
        comments.comments.reply_id = comments.comments.comment_id;
        comments.comments.comment_id = this.comments.comment_id;
      }
      this.$emit('reply', comments)
    }
  }
};
</script>

<style lang="scss">
.comments-box {
  margin: 15px 0;
  .comments-header {
    display: flex;
    .logo {
      width: 30px;
      height: 30px;
      flex-shrink: 0;
      border-radius: 5px;
      overflow: hidden;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      padding-left: 15px;
      font-size: 12px;
      color: #999;
      line-height: 1;
      .title {
        margin-bottom: 10px;
        font-size: 14px;
        color: #333;
        .to-reply {
          margin: 0 10px;
          font-weight: bold;
        }
      }
    }
  }
  .comments-content {
    margin-top: 10px;
    font-size: 14px;
    color: #000;
    .comments-info {
      margin-top: 15px;
      display: flex;
      .reply-btn {
        padding: 2px 10px;
        color: #999;
        font-size: 12px;
        border-radius: 20px;
        border: 1px solid #ccc;
      }
    }
    .comments-reply {
      display: flex;
      margin: 15px 0;
      padding: 0 10px;
      border: 1px solid #eee;
    }
  }
}
</style>
