<template>
  <view class="navbar">
    <view class="navbar-fixed">
      <!-- 状态栏 -->
      <view :style="{ height: statusBarHeight + 'px' }"></view>
      <!-- 导航栏内容 -->
      <view>
        <view class="navbar-content" :style="{ width: widowWidth + 'px', height: navBarHeight }">
          <view class="nav-search">
            <view class="nav-search-icons"><uni-icons type="search" size="16" color="#999"></uni-icons></view>
            <view class="nav-search-text">uni vue react</view>
          </view>
        </view>
      </view>
    </view>
    <view :style="{height: statusBarHeight+navBarHeight+'px'}"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: 20,
      navBarHeight: 45,
      widowWidth: 375
    };
  },
  created() {
    // 获取设备系统信息
    const info = uni.getSystemInfoSync();
    // statusBarHeight 状态栏高度
    this.statusBarHeight = info.statusBarHeight;
    // 获取胶囊的位置
    // #ifndef H5 || APP-PLUS || MP-ALIPAY
    const menuBtnInfo = uni.getMenuButtonBoundingClientRect();
    // 导航栏的高度
    // (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
    this.navBarHeight = menuBtnInfo.top - info.statusBarHeight + (menuBtnInfo.bottom - info.statusBarHeight);
    this.widowWidth = menuBtnInfo.left;
    // #endif
  }
};
</script>

<style lang="scss">
.navbar {
  .navbar-fixed {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: $theme-color;
    z-index: 99;
    .navbar-content {
      box-sizing: border-box;
      display: flex;
      height: 45px;
      justify-content: center;
      align-items: center;
      padding: 0 15px;

      .nav-search {
        display: flex;
        align-items: center;
        width: 100%;
        height: 30px;
        border-radius: 30px;
        background-color: #fff;
        padding: 0 10px;

        .nav-search-icons {
          margin-right: 10px;
        }

        .nav-search-text {
          width: 100%;
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
}
</style>
