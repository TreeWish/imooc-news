<template>
  <view class="tab">
    <scroll-view class="tab-scroll" scroll-x>
      <view class="tab-scroll-box">
        <view class="tab-scroll-item" :class="{ active: activeIndex === index }" v-for="(item, index) in list" :key="index" @click="changeTab(item, index)">{{ item.name }}</view>
      </view>
    </scroll-view>
    <view class="tab-icons"><uni-icons type="gear" size="26" color="#666"></uni-icons></view>
  </view>
</template>

<script>
export default {
  props: {
    list: Array
  },
  data() {
    return {
      activeIndex: 0
    };
  },
  methods: {
    changeTab(item, index) {
      this.activeIndex = index;
      this.$emit('tab', {
        data: item,
        index
      })
    }
  }
};
</script>

<style lang="scss">
.tab {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #f5f5f5;
  box-sizing: border-box;
  .tab-scroll {
    flex: 1;
    box-sizing: border-box;
    overflow: hidden;
    .tab-scroll-box {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      height: 45px;
    }
    .tab-scroll-item {
      flex-shrink: 0;
      padding: 0 10px;
      color: #333;
      font-size: 14px;
      &.active {
        color: $theme-color;
      }
    }
  }
  .tab-icons {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    &::after {
      position: absolute;
      content: '';
      top: 12px;
      bottom: 12px;
      left: 0;
      width: 1px;
      background-color: #ddd;
    }
  }
}
</style>
