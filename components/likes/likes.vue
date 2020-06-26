<template>
	<view class="card-icon" @click.stop="likeTap">
		 <uni-icons :type="like?'heart-filled':'heart'" size="20" color="#f07373"></uni-icons>
	</view>
</template>

<script>
	export default {
    props: {
      item: {
        type: Object,
        default() {
          return {}
        }
      }
    },
		data() {
			return {
				like: false,
        article_likes_ids: [],
        userLike: []
			}
		},
    watch: {
    	item(newVal) {
    		this.like = this.item.is_like
      }
    },
    created() {
    	this.like = this.item.is_like
    },
    methods: {
      likeTap() {
        this.like = !this.like;
        this.setLike();
         //this.item["islike"] = 'like';
        //console.log("收藏");
      },
      async setLike() {
        uni.showLoading();
        await this.$api.updateLike({
          user_id: '5ed5b51d770027004c4cbe8a',
          article_id: this.item._id
        });
        this.item["islike"] = 'like';
        uni.hideLoading();
        uni.showToast({
          title: this.like ? '收藏成功' : '取消收藏',
          icon: 'none'
        })
        uni.$emit('updateLike',this.types)
      },
     
    }
	}
</script>

<style lang="scss">
  .card-icon {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
  }
</style>
