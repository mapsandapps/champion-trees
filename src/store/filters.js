import cloneDeep from 'lodash/cloneDeep';
import filter from 'lodash/filter';
import includes from 'lodash/includes';

export default {
  namespaced: true,
  state: {
    /**
     * when you create a new filter, be sure to update getters.filtering and actions.resetFilters
     */
    pointsFilter: null,
    typeFilter: null
  },
  getters: {
    filteredTrees: (state, getters, rootState, rootGetters) => {
      let trees = rootGetters['trees/trees'];
      if (!getters.filtering) {
        return trees;
      } else {
        if (getters.pointsFilterActive) {
          trees = filter(trees, tree => {
            return tree.points >= state.pointsFilter.min && tree.points <= state.pointsFilter.max;
          });
        }
        if (getters.typeFilterActive) {
          trees = filter(trees, tree => {
            return includes(state.typeFilter, tree.type);
          });
        }
        return trees;
      }
    },
    filteredTreesCount: (state, getters) => {
      return getters.filteredTrees.length;
    },
    filtering: (state, getters) => {
      if (getters.pointsFilterActive ||
        getters.typeFilterActive) {
        return true;
      }
      return false;
    },
    pointsFilter: state => {
      return state.pointsFilter;
    },
    pointsFilterActive: state => {
      return Boolean(state.pointsFilter);
    },
    typeFilter: (state, getters, rootState, rootGetters) => {
      if (state.typeFilter) {
        return state.typeFilter;
      } else {
        return rootGetters['trees/treeTypeList'];
      }
    },
    typeFilterActive: (state, getters, rootState, rootGetters) => {
      return getters.typeFilter.length !== rootGetters['trees/treeTypeList'].length;
    }
  },
  actions: {
    filterPoints({ commit }, value) {
      commit('SET_POINTS_FILTER', value);
    },
    filterTypes({ commit }, value) {
      commit('SET_TYPES_FILTER', value);
    },
    resetFilters({ commit, rootGetters }) {
      commit('SET_POINTS_FILTER', null);
      commit('SET_TYPES_FILTER', cloneDeep(rootGetters['trees/treeTypeList']))
    }
  },
  mutations: {
    SET_POINTS_FILTER(state, value) {
      state.pointsFilter = value;
    },
    SET_TYPES_FILTER(state, value) {
      state.typeFilter = value.sort();
    }
  }
};
