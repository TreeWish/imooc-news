<template>
  <view class="scroll">
    <scroll-view scroll-y class="scroll-list">
      <view>
        <slot v-for="item in 5">{{item}}</slot>
      </view>
    </scroll-view>
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
.scroll {
  flex: 1;
  box-sizing: border-box;
  overflow: hidden;

  .scroll-list {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
