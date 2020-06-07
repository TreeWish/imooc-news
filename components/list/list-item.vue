<template>
  <list-scroll class="list-scroll" @loadmore="loadmore">
    <list-card :item="item" v-for="item in list" :key="item._id"></list-card>
    <uni-load-more :status="load.loading" v-if="list.length === 0 || list.length > 7"></uni-load-more>
  </list-scroll>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      },
      load: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      loadmore() {
        this.$emit('loadmore')
      }
    }
  }
</script>

<style lang="scss">
  .list-scroll {
    height: 100%;
  }
</style>
