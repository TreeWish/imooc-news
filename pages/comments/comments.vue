<template>
	<view>
		<view class="comments-content" v-for="item in commentList" :key="item.comment_id">
		  <comments-box :comments="item" @reply="reply"></comments-box>
		</view>
    <uni-load-more v-if="commentList.length === 0 || commentList.length > 5" :status="loading"></uni-load-more>
    <release ref="popup" @submit="submit"></release>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article_id: '',
        commentList: [],
        page: 1,
        pageSize: 5,
        loading: 'loading'
			}
		},
    onLoad(query) {
      this.article_id = query.id;
      this.getComment();
    },
    onReachBottom() {
      if (this.loading === 'noMore') return;
      this.page++;
      this.getComment();
    },
		methods: {
			async getComment() {
			  const {data} = await this.$api.getComment({
			    article_id: this.article_id,
          page: this.page,
          pageSize: this.pageSize
			  });
        if (data.length === 0) {
          this.loading = 'noMore';
          return
        }
        let oldList = JSON.parse(JSON.stringify(this.commentList));
        oldList.push(...data);
			  this.commentList = oldList;
			},
      openPopup(){
        this.$refs.popup.open()
      },
      // 关闭弹窗
      close(){
        this.$refs.popup.close()
      },
      submit(content){
          this.updateComment({content,...this.replyFormData})
      },
      async updateComment(content) {
        const formData = {
         article_id: this.article_id,
         ...content
        }
        // 数据重置，避免key重复，添加重复数据
        this.commentsList =  [];
        this.page = 1;
        this.loading = 'loading';
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
      }
      
		}
	}
</script>

<style lang="scss">
  .comments-content {
    padding: 0 15px;
  }
</style>
