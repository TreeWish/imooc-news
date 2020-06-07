<template>
  <swiper class="home-swiper" :current="activeIndex" @change="change">
    <swiper-item v-for="(item, index) in tab" :key="index">
      <view class="swiper-item">
        <list-item :list="listCacheData[index]" :load="load[index]" @loadmore="loadmore"></list-item>
      </view>
    </swiper-item>
  </swiper>
</template>

<script>
import listItem from './list-item.vue';
export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    tab: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    listItem
  },
  data() {
    return {
      list: [],
      // js 的限制 listCatchData[index] = data
      listCacheData: {},
      pageSize: 5,
      load: {}
    };
  },
  created() {
    //if (this.tab.length) return;
    this.getList(this.activeIndex);
  },
  watch: {
    tab(newVal) {
      if (newVal.length) return;
      this.getList(this.activeIndex)
    }
  },
  methods: {
    change(e) {
      const { current } = e.detail;
      if (!this.listCacheData[current] || this.listCacheData[current].length === 0) {
        this.getList(current);
      }
      this.$emit('change', current);
    },
    async getList(current) {
      if (!this.load[current]) {
        this.load[current] = {
          page: 1,
          loading: 'loading'
        };
      }
      let label = '';
      if (this.tab.length === 0) {
        label = "全部"
      } else {
        label = this.tab[current].name
      }
      let user_id = '5e76254858d922004d6c9cdc'
      const { data } = await this.$api.getList({
        user_id: user_id,
        name: label,
        page: this.load[current].page,
        pageSize: this.pageSize
      });
      if (data.length === 0) {
        let oldLoad = {};
        oldLoad.loading = 'noMore';
        oldLoad.page = this.load[current].page;
        this.$set(this.load, current, oldLoad);
        // 强制渲染页面
        this.$forceUpdate();
        return;
      }
      let oldList = this.listCacheData[current] || [];
      oldList.push(...data);
      //this.list = data;
      // this.$set 方法实现数据懒加载
      //this.listCacheData = data;
      this.$set(this.listCacheData, current, oldList);
    },
    loadmore() {
      if (this.load[this.activeIndex].loading === 'noMore') return;
      this.load[this.activeIndex].page++;
      this.getList(this.activeIndex);
    }
  }
};
</script>

<style lang="scss">
.home-swiper {
  height: 100%;
  .swiper-item {
    height: 100%;
    overflow: hidden;
  }
}
</style>
