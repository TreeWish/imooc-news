<template>
  <view class="home">
    <!-- 自定义导航栏 -->
    <navbar></navbar>
    <!-- 选项卡 -->
    <tab :list="labelList" @tab="tab" :tabIndex="tabIndex"></tab>
    <!-- 卡片视图 -->
    <view class="home-list">
      <list :tab="labelList" :activeIndex="activeIndex" @change="change"></list>
    </view>
  </view>
</template>

<script>
// easyCom 如果组件命名格式：组件名/组件名 无需import 和 components注册
export default {
  data() {
    return {
      labelList: [],
      activeIndex: 0,
      tabIndex: 0
    };
  },
  onLoad() {
    this.getLabel();
  },
  methods: {
    async getLabel() {
      const { data } = await this.$api.getLabel();
      // 向数组的开头添加一个或更多元素,并返回新的长度
      data.unshift({
        name: '全部'
      })
      this.labelList = data;
    },
    tab(data) {
      this.activeIndex = data.index;
    },
    change(cur) {
      this.tabIndex = cur;

    }
  }
};
</script>

<style lang="scss">
  page {
    height: 100%;
    display: flex;
  }
  .home {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    .home-list {
      flex: 1;
      box-sizing: border-box;
    }
  }
</style>
