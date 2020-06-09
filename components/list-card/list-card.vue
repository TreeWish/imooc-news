<template>
  <view @click="open">
    <!-- 基础卡片 -->
    <view class="listcard" v-if="item.mode === 'base'">
      <view class="card-img"><image :src="item.cover[0]" mode="aspectFill"></image></view>
      <view class="card-content">
        <view class="card-title">
          <text>{{item.title}}</text>
          <likes :item="item"></likes>
        </view>
        <view class="card-desc">
          <view class="card-label">{{item.classify}}</view>
          <view class="card-reader">{{item.browse_count}}浏览</view>
        </view>
      </view>
    </view>
    <!-- 多图卡片 -->
    <view class="listcard mode-column" v-if="item.mode === 'column'">
      <view class="card-content">
        <view class="card-title">
          <text>{{item.title}}</text>
           <likes :item="item"></likes>
        </view>
        <view class="card-img">
          <view class="img-item" v-if="index < 3" v-for="(item,index) in item.cover" :key="index"><image :src="item" mode="aspectFill"></image></view>
        </view>
        <view class="card-desc">
          <view class="card-label">{{item.classify}}</view>
          <view class="card-reader">{{item.browse_count}}浏览人数</view>
        </view>
      </view>
    </view>
    <!-- 多图卡片 -->
    <view class="listcard mode-image" v-if="item.mode === 'image'">
      <view class="card-img">
        <image :src="item.cover[0]" mode="aspectFill"></image>
      </view>
      <view class="card-content">
        <view class="card-title">
          <text>{{item.title}}</text>
           <likes :item="item"></likes>
        </view>
        <view class="card-desc">
          <view class="card-label">{{item.classify}}</view>
          <view class="card-reader">{{item.browse_count}}浏览人数</view>
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
    return {};
  },
  methods: {
    open() {
      const item = this.item
      this.$emit('click', item)
    }
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
    position: relative;
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
      padding-right: 30px;

      text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; /*设置为弹性盒子*/
        -webkit-line-clamp: 2; /*最多显示2行*/
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
  &.mode-column {
    .card-content {
      width: 100%;
      padding-left: 0;
    }
    .card-img {
      display: flex;
      height: 70px;
      width: 100%;
      margin-top: 10px;
      .img-item {
        margin-left: 10px;
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
        &:nth-child(1) {
          margin-left: 0;
        }
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
    .card-desc {
      margin-top: 10px;
    }
  }
  &.mode-image {
    flex-direction: column;
    .card-img {
      width: 100%;
			height: 100px;
    }
    .card-content {
      padding-left: 0;
      .card-title {
        margin: 10px 0;
      }
      .card-desc {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
