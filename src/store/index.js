import Vue from 'vue'
import Vuex from 'vuex'
import Tabletop from 'tabletop';

import find from 'lodash/find';
import floor from 'lodash/floor';
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
    latitude: null,
    longitude: null,
    treeDataLoaded: false,
    trees: []
  },
  actions: {
    fetchTreeData({ commit }) {
      tabletop = Tabletop.init({
        key: 'https://docs.google.com/spreadsheets/d/1r0KzMrtXVKGkphr_XYU2Gi-7-0OfJ4tkOECAGrHHHlQ/edit?usp=sharing',
        callback: function(data, tabletop) {
          commit('setTreeData');
        }
      });
    },
    findUserLocation({ commit, dispatch }) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          commit('setCoordinates', position.coords);
          dispatch('setTreeDistances');
        });
      } else {
        console.log('Error: no geolocation');
      }
    },
    setTreeDistances({ state, commit, getters }) {
      state.trees.forEach((tree, index) => {
        if (tree.Latitude && tree.Longitude) {
          const distanceMiles = getters.distanceFromUser(tree);
          var distanceHuman;
          // TODO: convert this to a filter
          if (distanceMiles >= 1) {
            let miles = floor(distanceMiles, 1);
            distanceHuman = `${miles} ${miles === 1 ? 'mile' : 'miles'}`;
          } else {
            distanceHuman = `${Math.floor(distanceMiles * 1760)} yards`;
          }
          const bearing = getters.bearingFromUser(tree);
          const details = {
            index,
            distanceMiles,
            distanceHuman,
            bearing
          };
          commit('setTreeDistance', details);
        }
      });
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
    distanceFromUser: state => tree => {
      return distance(
        [ state.longitude, state.latitude ],
        [ tree.Longitude, tree.Latitude ],
        { units: 'miles'}
      );
    },
    getTree: state => id => {
      const idInt = parseInt(id);
      return find(state.trees, ['ID', id]);
    },
    getTrees: state => {
      return state.trees;
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
    setTreeData(state) {
      state.trees = tabletop.sheets('trees').elements;
      state.treeDataLoaded = true;
    },
    setTreeDistance(state, details) {
      const { index, distanceMiles, distanceHuman, bearing } = details;
      Vue.set(state.trees[index], 'distanceMiles', distanceMiles);
      Vue.set(state.trees[index], 'distanceHuman', distanceHuman);
      Vue.set(state.trees[index], 'bearing', bearing);
    }
  }
})

export default store
