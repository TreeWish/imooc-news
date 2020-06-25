<template>
	<view class="author-list">
		<view class="author-img">
		  <image :src="item.avatar" mode="aspectFill"></image>
		</view>
    <view class="autho-content">
      <text class="author-name">{{item.author_name}}</text>
      <view class="author-desc">
        <view class="author-professional">{{item.professional}}</view>
        <view class="author-info">
          <text>发帖 {{item.article_ids.length}}</text>
          <text>粉丝 {{item.fans_count}}</text>
        </view>
      </view>
    </view>
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
				
			};
		}
	}
</script>

<style lang="scss">
  .author-list {
    display: flex;
    padding: 10px 0;
    margin: 0 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    .author-img {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      overflow: hidden;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .autho-content {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      .author-name {
        font-size: 14px;
        color: #333;
      }
      .author-desc {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        .author-professional {
          color: #666;
        }
        .author-info {
          color: #999;
          line-height: 1.5;
          text {
            margin: 0 5px;
          }
        }
      }
    }
  }
</style>
