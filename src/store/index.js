import Vue from 'vue'
import Vuex from 'vuex'
import Tabletop from 'tabletop';

import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import bearing from '@turf/bearing';
import distance from '@turf/distance';

Vue.use(Vuex)

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

var tabletop;

const store = new Vuex.Store({
  state: {
    currentListingView: 'list',
    geolocationAttempted: false,
    geolocationSucceeded: false,
    latitude: null,
    longitude: null,
    treeDataLoaded: false,
    trees: []
  },
  actions: {
    fetchTreeData({ commit, dispatch }) {
      tabletop = Tabletop.init({
        key: 'https://docs.google.com/spreadsheets/d/1r0KzMrtXVKGkphr_XYU2Gi-7-0OfJ4tkOECAGrHHHlQ/edit?usp=sharing',
        callback: function(data, tabletop) {
          commit('setTreeData');
          dispatch('setTreeDistances');
        }
      });
    },
    findUserLocation({ commit, dispatch }) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          commit('setCoordinates', position.coords);
          commit('setGeolocationSucceeded', true);
          commit('setGeolocationAttempted', true);
          dispatch('setTreeDistances');
        }, error => {
          commit('setGeolocationAttempted', true);
        });
      } else {
        console.log('Error: no geolocation');
        commit('setGeolocationAttempted', true);
      }
    },
    setTreeDistances({ state, getters }) {
      if (state.trees.length > 0) {
        state.trees.forEach((tree, index) => {
          if (tree.Latitude && tree.Longitude) {
            Vue.set(state.trees[index], 'distance', getters.treeDistance(tree.ID));
          }
        });
      }
    }
  },
  getters: {
    bearingFromUser: state => tree => {
      return bearing(
        [ state.longitude, state.latitude ],
        [ tree.Longitude,tree.Latitude ],
        { final: true }
      );
    },
    getTree: state => id => {
      const idInt = parseInt(id);
      return find(state.trees, ['ID', id]);
    },
    getTrees: state => {
      return state.trees;
    },
    treeDistance: (state, getters) => id => {
      if (state.latitude && state.longitude) {
        const tree = getters.getTree(id);
        const treeDistance = distance(
          [ state.longitude, state.latitude ],
          [ tree.Longitude, tree.Latitude ],
          { units: 'miles' }
        );
        const treeIndex = findIndex(state.trees, ['ID', id]);
        Vue.set(state.trees[treeIndex], 'distance', treeDistance);
        return treeDistance;
      }
      return null;
    }
  },
  mutations: {
    setCoordinates(state, coordinates) {
      state.latitude = coordinates.latitude;
      state.longitude = coordinates.longitude;
    },
    setCurrentListingView(state, view) {
      state.currentListingView = view;
    },
    setGeolocationAttempted(state, value) {
      state.geolocationAttempted = value;
    },
    setGeolocationSucceeded(state, value) {
      state.geolocationSucceeded = value;
    },
    setTreeData(state) {
      state.trees = tabletop.sheets('trees').elements;
      state.treeDataLoaded = true;
    }
  }
})

export default store
