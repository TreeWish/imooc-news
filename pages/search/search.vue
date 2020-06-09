<template>
	<view class="home">
		<navbar :isSearch="true" v-model="value" @input="change"></navbar>
    <view class="home-list">
      <view class="label-box" v-if="is_histroy">
        <view class="label-header">
          <text class="label-title">搜索历史</text>
          <text class="label-clear" @click="clear">清空</text>
        </view>
        <view class="label-content" v-if="historyList.length > 0">
          <text @click="labelSearch(item)" class="label-item" v-for="(item, index) in historyList" :key="index">{{item.name}}</text>
        </view>
        <view class="no-data" v-else>没有搜索历史</view>
      </view>
      <view class="" v-else>
        <list-scroll class="list-scroll">
          <uni-load-more v-if="loading" status="loading" iconType="snow" ></uni-load-more>
          <list-card :item="item" v-for="item in searchList" :key="item._id" @click="setHistory"></list-card>
          <view v-if="searchList.length === 0 && !loading" class="no-data">
            没有搜索到相关数据
          </view>
        </list-scroll>
      </view>
    </view>
	</view>
</template>

<script>
  import {mapState} from 'vuex'
	export default {
		data() {
			return {
				value:'',
        searchList: [],
        is_histroy: true,
        loading: false
			}
		},
    computed: {
      ...mapState(['historyList'])
    },
		methods: {
			change(value) {
        if (!value) {
          clearTimeout(this.timer)
          this.mark = false
          this.getSearch(value)
          return
        }
        // 做标记
        if (!this.mark) {
          this.mark = true;
          this.timer = setTimeout(() => {
            this.mark = false
            this.getSearch(value)
          }, 1000)
        }
      },
      clear() {
        this.$store.dispatch('clearHistory');
        uni.showToast({
          title: '清空完成'
        })
      },
      setHistory() {
        this.$store.dispatch('setHistoryList', {
          name: this.value
        })
      },
      async getSearch(value) {
        if (!value) {
          this.searchList = [];
          this.is_histroy = true;
          return
        }
        this.is_histroy = false;
        this.loading = true;
        const { data } = await this.$api.getSearch({
          value
        });
        this.loading = false;
        this.searchList = data;
      },
      labelSearch(item) {
        this.value = item.name;
        this.getSearch(this.value);
      }
		}
	}
</script>

<style lang="scss">
  page {
  		height: 100%;
  		display: flex;
  		background-color: #f5f5f5;
  }
  .home {
    display: flex;
    flex-direction: column;
    flex: 1;
    .label-box {
      background-color: #fff;
      margin-bottom: 10px;
      .label-header {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #666;
        padding: 10px 15px;
        border-bottom: 1px #f5f5f5 solid;
        
        .label-title {
          color: $theme-color;
        }
        
        .label-clear {
          color: #30b33a;
          font-weight: bold;
        }
      }
      .label-content {
        display: flex;
        flex-wrap: wrap;
        padding: 15px;
        padding-top: 0;
        
        .label-item {
          padding: 2px 10px;
          margin-top: 12px;
          margin-right: 10px;
          border-radius: 5px;
          border: 1px #666 solid;
          font-size: 14px;
          color: #666;
        }
      }
    }
    
  }
  .no-data {
    height: 200px;
    line-height: 200px;
    width: 100%;
    text-align: center;
    color: #666;
  }

</style>
