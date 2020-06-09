import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    historyList: uni.getStorageSync('_history') || [] 
  },
  mutations: {
    setHistoryList(state, history) {
      state.historyList = history
    },
    clearHistory(state) {
      state.historyList = []
    }
  },
  actions: {
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