<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
	  <swiper-item v-for="(item, index) in tab" :key="index">
	    <view class="swiper-item">
        <list-item :list="listCacheData[index]"></list-item>
      </view>
	  </swiper-item>
	</swiper>
</template>

<script>
  import listItem from './list-item.vue'
	export default {
    props: {
      activeIndex: {
        type: Number,
        default: 0
      },
      tab: {
        type: Array,
        default() {
          return []
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
        listCacheData: {}
			};
		},
    created() {
      this.getList(this.activeIndex)
      
    },
    mounted() {
      console.log(this.tab);
    },
    watch: {
      activeIndex(newVal) {
      	if (newVal) {
          this.getList(newVal);
        } else {
          this.getList(this.activeIndex)
        }
        console.log(this.tab[newVal].name);
      	//this.listCacheData = {}
      
        //console.log(newVal[this.activeIndex]);
      }
    },
    methods: {
      change(e) {
        const {current} = e.detail;
        this.$emit('change', current)
      },
      async getList(current) {
        const {data} = await this.$api.getList({
          label: this.tab[current].name
        });
        //this.list = data;
        // this.$set 方法实现数据懒加载
        //this.listCacheData = data;
        this.$set(this.listCacheData, current, data);
      }
    }
	}
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
