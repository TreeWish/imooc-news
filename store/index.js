import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: uni.getStorageSync('_userInfo') || {},
    historyList: uni.getStorageSync('_history') || [] 
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setHistoryList(state, history) {
      state.historyList = history
    },
    clearHistory(state) {
      state.historyList = []
    }
  },
  actions: {
    setUserInfo({commit, state}) {
      let userInfo = state.userInfo
      uni.setStorageSync('_userInfo', userInfo)
      commit('setUserInfo', userInfo)
    },
    setHistoryList({commit, state}, history) {
      let list = state.historyList;
      list.unshift(history)
      uni.setStorageSync('_history', list)
      commit('setHistoryList', list)
    },
    clearHistory({commit}) {
      uni.removeStorageSync('_history')
      commit('clearHistory')
    }
  }
})

export default store