import Vue from 'vue';

import filter from 'lodash/filter';

export default {
  namespaced: true,
  state: {
    filtering: false,
    filters: {}
  },
  getters: {
    filteredTrees: (state, getters, rootState, rootGetters) => {
      let trees = rootGetters['trees/trees'];
      if (!state.filtering) {
        return trees;
      } else {
        if (state.filters.points) {
          trees = filter(trees, tree => {
            return tree.points >= state.filters.points.min && tree.points <= state.filters.points.max;
          });
        }
        return trees;
      }
    }
  },
  actions: {
    filterPoints({ commit }, value) {
      commit('SET_FILTER', { filter: 'points', value });
    },
    resetFilters({ commit }) {
      commit('SET_FILTERING' , false);
    }
  },
  mutations: {
    SET_FILTERING(state, value) {
      state.filtering = value;
    },
    SET_FILTER(state, payload) {
      const { filter, value } = payload;
      Vue.set(state.filters, filter, value);
      state.filtering = true;
    }
  }
};
