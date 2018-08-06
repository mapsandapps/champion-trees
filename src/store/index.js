import Vue from 'vue'
import Vuex from 'vuex'
import Tabletop from 'tabletop';

import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import includes from 'lodash/includes';
import pull from 'lodash/pull';
import bearing from '@turf/bearing';
import distance from '@turf/distance';

Vue.use(Vuex)

var tabletop;

const store = new Vuex.Store({
  state: {
    checked: cloneDeep(JSON.parse(localStorage.getItem('checked'))) || [],
    coordinates: {
      latitude: null,
      longitude: null
    },
    currentListingView: localStorage.getItem('currentListingView') || 'list',
    geolocationAttempted: false,
    geolocationSucceeded: false,
    treeDataLoaded: false,
    trees: []
  },
  actions: {
    checkTree({ commit }, tree) {
      commit('CHECK_TREE', tree);
      commit('UPDATE_CHECKLIST')
    },
    fetchTreeData({ commit, dispatch }) {
      tabletop = Tabletop.init({
        key: 'https://docs.google.com/spreadsheets/d/1r0KzMrtXVKGkphr_XYU2Gi-7-0OfJ4tkOECAGrHHHlQ/edit?usp=sharing',
        callback: function(data, tabletop) {
          commit('SET_TREE_DATA');
          dispatch('setTreeDistances');
        }
      });
    },
    findUserLocation({ commit, dispatch }) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          commit('SET_GEOLOCATION_SUCCEEDED', true);
          commit('SET_GEOLOCATION_ATTEMPTED', true);
          dispatch('setLocation', position.coords);
        }, error => {
          commit('SET_GEOLOCATION_ATTEMPTED', true);
        });
      } else {
        console.log('Error: no geolocation');
        commit('SET_GEOLOCATION_ATTEMPTED', true);
      }
    },
    setLocation({ commit, dispatch }, coords) {
      dispatch('setTreeDistances');
      commit('SET_COORDINATES', coords);
    },
    setTreeDistances({ state, getters }) {
      if (state.trees.length > 0) {
        state.trees.forEach((tree, index) => {
          if (tree.latitude && tree.longitude) {
            Vue.set(state.trees[index], 'distance', getters.treeDistance(tree.ID));
          }
        });
      }
    },
    uncheckTree({ commit }, tree) {
      commit('UNCHECK_TREE', tree);
      commit('UPDATE_CHECKLIST')
    },
  },
  getters: {
    bearingFromUser: state => tree => {
      return bearing(
        [ state.coordinates.longitude, state.coordinates.latitude ],
        [ tree.longitude,tree.latitude ],
        { final: true }
      );
    },
    coordinates: state => {
      return state.coordinates;
    },
    getTree: state => id => {
      const idInt = parseInt(id);
      return find(state.trees, ['ID', id]);
    },
    treeDistance: (state, getters) => id => {
      if (state.coordinates.latitude && state.coordinates.longitude) {
        const tree = getters.getTree(id);
        const treeDistance = distance(
          [ state.coordinates.longitude, state.coordinates.latitude ],
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
    treeSeen: state => id => {
      return includes(state.checked, id);
    }
  },
  mutations: {
    CHECK_TREE(state, tree) {
      if (!includes(state.checked, tree.ID)) {
        state.checked.push(tree.ID);
      }
    },
    SET_COORDINATES(state, coordinates) {
      state.coordinates = coordinates;
    },
    SET_CURRENT_LISTING_VIEW(state, view) {
      state.currentListingView = view;
      localStorage.setItem('currentListingView', view);
    },
    SET_GEOLOCATION_ATTEMPTED(state, value) {
      state.geolocationAttempted = value;
    },
    SET_GEOLOCATION_SUCCEEDED(state, value) {
      state.geolocationSucceeded = value;
    },
    SET_TREE_DATA(state) {
      state.trees = tabletop.sheets('trees').elements;
      state.trees.forEach(tree => {
        tree.latitude = Number(tree.Latitude);
        tree.longitude = Number(tree.Longitude);
      });
      state.treeDataLoaded = true;
    },
    UNCHECK_TREE(state, tree) {
      state.checked = pull(cloneDeep(state.checked), tree.ID);
    },
    UPDATE_CHECKLIST(state) {
      localStorage.setItem('checked', JSON.stringify(state.checked));
    }
  }
})

export default store;
