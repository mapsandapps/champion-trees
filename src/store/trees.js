import Tabletop from 'tabletop';
import Vue from 'vue';

import ceil from 'lodash/ceil';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import map from 'lodash/map';
import maxBy from 'lodash/maxBy';
import sortBy from 'lodash/sortBy';
import sortedUniq from 'lodash/sortedUniq';
import bearing from '@turf/bearing';
import distance from '@turf/distance';

var tabletop;

export default {
  namespaced: true,
  state: {
    treeDataLoaded: false,
    trees: []
  },
  actions: {
    fetchTreeData({ commit, dispatch }) {
      return new Promise(resolve => {
        tabletop = Tabletop.init({
          key: 'https://docs.google.com/spreadsheets/d/1r0KzMrtXVKGkphr_XYU2Gi-7-0OfJ4tkOECAGrHHHlQ/edit?usp=sharing',
          callback: function(data, tabletop) {
            commit('SET_TREE_DATA');
            dispatch('setTreeDistances');
            resolve();
          }
        });
      });
    },
    setTreeDistances({ state, getters }) {
      if (state.trees.length > 0) {
        state.trees.forEach((tree, index) => {
          if (tree.latitude && tree.longitude) {
            Vue.set(state.trees[index], 'distance', getters.treeDistance(tree.ID));
          }
        });
      }
    }
  },
  getters: {
    bearingFromUser: (state, getters, rootState, rootGetters) => tree => {
      const coordinates = rootGetters['user/coordinates'];
      return bearing(
        [ coordinates.longitude, coordinates.latitude ],
        [ tree.longitude, tree.latitude ],
        { final: true }
      );
    },
    getTree: state => id => {
      return find(state.trees, ['ID', id]);
    },
    maxPoints: state => {
      return ceil(maxBy(state.trees, 'points').points);
    },
    treeDistance: (state, getters, rootState, rootGetters) => id => {
      const coordinates = rootGetters['user/coordinates'];
      if (coordinates.latitude && coordinates.longitude) {
        const tree = getters.getTree(id);
        const treeDistance = distance(
          [ coordinates.longitude, coordinates.latitude ],
          [ tree.longitude, tree.latitude ],
          { units: 'miles' }
        );
        const treeIndex = findIndex(state.trees, ['ID', id]);
        Vue.set(state.trees[treeIndex], 'distance', treeDistance);
        return treeDistance;
      }
      return null;
    },
    trees: state => {
      return state.trees;
    },
    treeSpeciesList: state => {
      if (state.trees.length < 1) return [];
      return sortedUniq(sortBy(map(state.trees, 'SPECIES')));
    },
    treeTypeList: state => {
      if (state.trees.length < 1) return [];
      let types = [];
      map(state.trees, tree => {
        types.push(tree['COMMON NAME'].split(' -')[0]);
      });
      return sortedUniq(sortBy(types));
    }
  },
  mutations: {
    SET_TREE_DATA(state) {
      state.trees = tabletop.sheets('trees').elements;
      state.trees.forEach(tree => {
        tree.latitude = Number(tree.Latitude);
        tree.longitude = Number(tree.Longitude);
        tree.points = Number(tree.Points);
        delete tree.Points;
      });
      state.treeDataLoaded = true;
    }
  }
};
