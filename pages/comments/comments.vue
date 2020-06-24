<template>
	<view>
		<view class="comments-content" v-for="item in commentList" :key="item.comment_id">
		  <comments-box :comments="item"></comments-box>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article_id: '',
        commentList: [],
        page: 1,
        pageSize: 5
			}
		},
    onLoad(query) {
      this.article_id = query.id;
      this.getComment()
    },
		methods: {
			async getComment() {
			  const {data} = await this.$api.getComment({
			    article_id: this.article_id,
          page: this.page,
          pageSize: this.pageSize
			  });
			  this.commentList = data;
			}
		}
	}
</script>

<style lang="scss">
  .comments-content {
    padding: 0 15px;
  }
</style>
