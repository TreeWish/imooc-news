<template>
	<view>
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
</template>

<script>
	export default {
		data() {
			return {
				commentsValue: ''
			};
		},
    methods: {
      open() {
        // 打开窗口之前清空内容 
        this.commentsValue = '';
        this.$refs.popup.open();
      },
      submit() {
        // 评论消息不能为空
        if (!this.commentsValue) {
          uni.showToast({
            title: '请输入评论内容',
            icon: 'none'
          })
          return
        }
        this.$emit('submit',this.commentsValue);
      },
      close() {
        // 关闭窗口清空内容 
        this.commentsValue = '';
        this.$refs.popup.close();
      }
    }
	}
</script>

<style lang="scss">
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
