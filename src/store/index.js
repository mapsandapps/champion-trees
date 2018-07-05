import Vue from 'vue'
import Vuex from 'vuex'
import Tabletop from 'tabletop';

import find from 'lodash/find';
import floor from 'lodash/floor';

Vue.use(Vuex)

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

var tabletop;

const store = new Vuex.Store({
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
          console.log(position);
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
          const distanceMiles = getters.distanceFromUser(tree.Latitude, tree.Longitude);
          var distanceHuman;
          // TODO: convert this to a filter
          if (distanceMiles >= 1) {
            let miles = floor(distanceMiles, 1);
            distanceHuman = `${miles} ${miles === 1 ? 'mile' : 'miles'}`;
          } else {
            distanceHuman = `${Math.floor(distanceMiles * 1760)} yards`;
          }
          const details = {
            index,
            distanceMiles,
            distanceHuman
          };
          commit('setTreeDistance', details);
          console.log(distanceMiles);
        }
      });
    }
  },
  getters: {
    distanceFromUser: state => (lat1, lon1) => {
      // distance in miles between earth coordinates
      if (!state.latitude || ! state.longitude) return null;

      lat1 = Number(lat1);
      lon1 = Number(lon1);

      var lat2 = state.latitude;
      var lon2 = state.longitude;
      var earthRadiusMiles = 3959;

      var dLat = degreesToRadians(lat2-lat1);
      var dLon = degreesToRadians(lon2-lon1);

      lat1 = degreesToRadians(lat1);
      lat2 = degreesToRadians(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return earthRadiusMiles * c;
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
    setTreeData(state) {
      state.trees = tabletop.sheets('trees').elements;
    },
    setTreeDistance(state, details) {
      const { index, distanceMiles, distanceHuman } = details;
      Vue.set(state.trees[index], 'distanceMiles', distanceMiles);
      Vue.set(state.trees[index], 'distanceHuman', distanceHuman);
    }
  },
  state: {
    latitude: null,
    longitude: null,
    trees: []
  }
})

export default store
