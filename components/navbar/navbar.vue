<template>
  <view class="navbar">
    <view class="navbar-fixed">
      <!-- 状态栏 -->
      <view :style="{ height: statusBarHeight + 'px' }"></view>
      <!-- 导航栏内容 -->
      <view @click.stop="toSearch">
        <view class="navbar-content" :class="{search:isSearch}"
        :style="{ width: widowWidth + 'px', height: navBarHeight }">
          <view v-if="isSearch" class="search-icons" @click="back">
            <uni-icons type="back" size="22" color="#fff"></uni-icons>
          </view>
          <view v-if="!isSearch" class="nav-search">
            <view class="nav-search-icons"><uni-icons type="search" size="16" color="#999"></uni-icons></view>
            <view class="nav-search-text">uni vue react</view>
          </view>
          <view v-else class="nav-search">
            <input type="text" v-model="val" class="nav-search-text"
            placeholder="请输入您要搜索的内容" @input="inputChange">
          </view>
        </view>
      </view>
    </view>
    <view :style="{height: statusBarHeight+navBarHeight+'px'}"></view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    isSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      statusBarHeight: 20,
      navBarHeight: 45,
      widowWidth: 375,
      val: ''
    };
  },
  watch: {
    value(newVal){
    	this.val = newVal
    }
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
  },
  methods: {
    toSearch() {
      if (this.isSearch) return
      uni.navigateTo({
        url: "/pages/search/search"
      })
    },
    back() {
      // uni.navigateBack()
      uni.switchTab({
        url:'/pages/tabbar/index/index'
      })
    },
    inputChange(e) {
      const { value } = e.detail
      this.$emit('input', value)
    }
    
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
      &.search {
        padding-left: 0;
        .search-icons {
          margin:0 10px;
        }
        .nav-search {
					border-radius: 5px;
          .nav-search-text {
            padding-left: 10px;
          }
				}
      }
    }

  }
}
</style>
