<template>
  <view>
    <!-- 基础卡片 -->
    <view class="listcard">
      <view class="card-img"><image src="/static/logo.png" mode="aspectFill"></image></view>
      <view class="card-content">
        <view class="card-title">
          <text>uni app</text>
        </view>
        <view class="card-desc">
          <view class="card-label">前端</view>
          <view class="card-reader">100浏览人数</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.listcard {
  display: flex;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  .card-img {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    border-radius: 5px;
    overflow: hidden;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;
    width: 100%;
    .card-title {
      font-size: 14px;
      color: #333;
      font-weight: 400;
      line-height: 1.2;
      
      text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;  /*设置为弹性盒子*/
        -webkit-line-clamp: 2;  /*最多显示2行*/
        -webkit-box-orient: vertical;
        
      }
    }
    .card-desc {
      
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      .card-label {
        display: flex;
        padding: 0 5px;
        margin-right: 5px;
        border-radius: 15px;
        color: $theme-color;
        border: 1px solid $theme-color;
      }
      .card-reader {
        color: #999;
        line-height: 1.5;
      }
    }
  }
}
</style>
