<template>
	<view class="follow">
		<view class="follow-category">
		  <view>文章</view>
      <view>作者</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
  .follow {
    .follow-category {
      box-sizing: border-box;
      padding: 5px 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      view {
        box-sizing: border-box;
        flex: 1;
        text-align: center;
        padding: 5px 50px;
        color: $theme-color;
        border: 1px solid $theme-color;
      }
      view:nth-child(1) {
        border-right: none;
      }
      
    }
  
  }
</style>
