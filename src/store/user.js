import cloneDeep from 'lodash/cloneDeep';
import includes from 'lodash/includes';
import pull from 'lodash/pull';

export default {
  namespaced: true,
  state: {
    checked: cloneDeep(JSON.parse(localStorage.getItem('checked'))) || [],
    coordinates: {
      latitude: null,
      longitude: null
    },
    currentListingView: localStorage.getItem('currentListingView') || 'list',
    geolocationAttempted: false,
    geolocationSucceeded: false
  },
  actions: {
    checkTree({ commit }, tree) {
      commit('CHECK_TREE', tree);
      commit('UPDATE_CHECKLIST')
    },
    findUserLocation({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            commit('SET_GEOLOCATION_SUCCEEDED', true);
            commit('SET_GEOLOCATION_ATTEMPTED', true);
            dispatch('setLocation', position.coords);
            resolve();
          }, error => {
            console.log('Geolocation error');
            commit('SET_GEOLOCATION_ATTEMPTED', true);
            reject();
          });
        } else {
          console.log('Error: no geolocation');
          commit('SET_GEOLOCATION_ATTEMPTED', true);
          reject();
        }
      });
    },
    setLocation({ commit, dispatch }, coords) {
      dispatch('trees/setTreeDistances', null, { root: true });
      commit('SET_COORDINATES', coords);
    },
    uncheckTree({ commit }, tree) {
      commit('UNCHECK_TREE', tree);
      commit('UPDATE_CHECKLIST')
    }
  },
  getters: {
    coordinates: state => {
      return state.coordinates;
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
    UNCHECK_TREE(state, tree) {
      state.checked = pull(cloneDeep(state.checked), tree.ID);
    },
    UPDATE_CHECKLIST(state) {
      localStorage.setItem('checked', JSON.stringify(state.checked));
    }
  }
};
