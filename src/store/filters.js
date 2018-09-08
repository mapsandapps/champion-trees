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
    searchTerm: null,
    stateChampionFilter: false,
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
        if (getters.searchTerm) {
          trees = filter(trees, tree => {
            return includes(JSON.stringify(tree).toLowerCase(), state.searchTerm);
          });
        }
        if (getters.stateChampionFilterActive) {
          trees = filter(trees, tree => {
            return Boolean(tree['State Champion'].toLowerCase() === 'yes')
          })
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
        getters.searchActive ||
        getters.stateChampionFilterActive ||
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
    searchTerm: state => {
      return state.searchTerm;
    },
    searchActive: state => {
      return Boolean(state.searchTerm);
    },
    stateChampionFilter: state => {
      return state.stateChampionFilter;
    },
    stateChampionFilterActive: state => {
      return state.stateChampionFilter;
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
    filterStateChampion({ commit }, value) {
      commit('SET_STATE_CHAMPION_FILTER', value);
    },
    filterTypes({ commit }, value) {
      commit('SET_TYPES_FILTER', value);
    },
    resetFilters({ commit, rootGetters }) {
      commit('SET_POINTS_FILTER', null);
      commit('SET_SEARCH', null);
      commit('SET_STATE_CHAMPION_FILTER', false);
      commit('SET_TYPES_FILTER', cloneDeep(rootGetters['trees/treeTypeList']))
    },
    search({ commit }, value) {
      commit('SET_SEARCH', value);
    }
  },
  mutations: {
    SET_POINTS_FILTER(state, value) {
      state.pointsFilter = value;
    },
    SET_SEARCH(state, value) {
      state.searchTerm = value;
    },
    SET_STATE_CHAMPION_FILTER(state, value) {
      state.stateChampionFilter = value;
    },
    SET_TYPES_FILTER(state, value) {
      state.typeFilter = value.sort();
    }
  }
};
