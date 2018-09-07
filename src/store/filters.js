import Vue from 'vue';

import filter from 'lodash/filter';

export default {
  namespaced: true,
  state: {
    pointsFilter: null
  },
  getters: {
    filteredTrees: (state, getters, rootState, rootGetters) => {
      let trees = rootGetters['trees/trees'];
      if (!getters.filtering) {
        return trees;
      } else {
        if (state.pointsFilter) {
          trees = filter(trees, tree => {
            return tree.points >= state.pointsFilter.min && tree.points <= state.pointsFilter.max;
          });
        }
        return trees;
      }
    },
    filtering: state => {
      let isFiltering = false;
      if (state.pointsFilter) {
        isFiltering = true;
      }
      return isFiltering;
    },
    pointsFilter: state => {
      return state.pointsFilter;
    }
  },
  actions: {
    filterPoints({ commit }, value) {
      commit('SET_POINTS_FILTER', value);
    },
    resetFilters({ commit }) {
      commit('RESET_FILTERS' , false);
    }
  },
  mutations: {
    RESET_FILTERS(state) {
      state.pointsFilter = null;
    },
    SET_POINTS_FILTER(state, value) {
      state.pointsFilter = value;
    }
  }
};
