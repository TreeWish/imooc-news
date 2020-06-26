<template>
	<view>
    <uni-load-more v-if="list.length === 0" iconType="snow" status="loading"></uni-load-more>
    <list-card v-for="item in list" :key="item._id"  types="follow" :item="item"></list-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
    onLoad() {
      this.getMyArticle();
    },
		methods: {
			async getMyArticle() {
        const {data} = await this.$api.getMyArticle();
        this.list = data;
      }
		}
	}
</script>

<style>

</style>
