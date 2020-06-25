<template>
	<view class="follow">
		<view class="follow-tab">
		  <view class="tab-box">
		    <view class="tab-item" :class="{active:activeIndex === 0}" @click="tab(0)">文章</view>
		    <view class="tab-item" :class="{active:activeIndex === 1}" @click="tab(1)">作者</view>
		  </view>
		</view>
    <view class="follow-list">
      <swiper class="follow-swiper" :current="activeIndex" @change="change">
        <swiper-item class="swiper-item">
          <list-scroll class="list-scroll">
            <uni-load-more v-if="list.length === 0 && !articleShow" iconType="snow" status="loading"></uni-load-more>
            <list-card v-for="item in list" :key="item._id"  types="follow" :item="item"></list-card>
            <view class="no-data" v-if="articleShow">没有收藏文章</view>
          </list-scroll>
        </swiper-item>
        <swiper-item class="swiper-item">
          <list-scroll>
            <list-author v-for="item in  authorList" :key="item.id" :item="item"></list-author>
            <view class="no-data" v-if="followShow">没有关注作者</view>
          </list-scroll>
        </swiper-item>
      </swiper>
      
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
        list: [],
        authorList: [],
        articleShow: false,
        followShow: false
        
			}
		},
    onLoad() {
      uni.$on('updateLike', () => {
         this.getFollow();
      })
      this.getFollow();
      this.getAuthor();
    },
		methods: {
			tab(index) {
        this.activeIndex = index;
      },
      change(e) {
        this.activeIndex = e.detail.current
      },
      async getFollow() {
        const {data} = await this.$api.getFollow();
        this.list = data;
        this.articleShow = this.list.length === 0 ? true : false;
      },
      async getAuthor() {
        const {data} = await this.$api.getAuthor();
        this.authorList = data;
        this.followShow = this.authorList.length === 0 ? true : false;
      }
		}
	}
</script>

<style lang="scss">
  page {
    height: 100%;
    display: flex;
  }
  .follow {
    box-sizing: border-box;
    flex-direction: column;
    display: flex;
    flex: 1;
 
    .follow-tab {
      height: 30px;
      padding: 10px 20px;
      border-bottom: 1px solid #ccc;
      .tab-box {
        display: flex;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        border: 1px solid $theme-color;
        .tab-item {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #666;
          font-size: 14px;
          width: 100%;
        }
        .tab-item:nth-child(1) {
          border-right: 1px solid $theme-color;
        }
        .active {
          color: $theme-color;
        }
      }   
    }
    .follow-list {
      flex: 1;
      .follow-swiper {
        height: 100%;
        .swiper-item {
          height: 100%;
          overflow: hidden;
          .list-scroll {
            height: 100%;
          }
        }
      }
    }
  
  }
  .no-data {
    padding: 50px;
    font-size: 14px;
    color: #999;
    text-align: center;
  }
</style>
