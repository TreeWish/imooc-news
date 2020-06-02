<template>
  <view class="home">
    <!-- 自定义导航栏 -->
    <navbar></navbar>
    <!-- 选项卡 -->
    <tab :list="labelList" @tab="tab"></tab>
    <!-- 卡片视图 -->
    <view>
      <list-scroll>
       <list-card></list-card>
      </list-scroll>
    </view>
  </view>
</template>

<script>
// easyCom 如果组件命名格式：组件名/组件名 无需import 和 components注册
export default {
  data() {
    return {
      labelList: []
    };
  },
  onLoad() {
    this.getLabel();
  },
  methods: {
    async getLabel() {
      const { data } = await this.$api.getLabel();
      this.labelList = data;
    },
    tab(data) {}
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
}
</style>
