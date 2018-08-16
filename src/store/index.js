import Vue from 'vue'
import Vuex from 'vuex'

import trees from './trees'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    trees,
    user
  }
});

export default store;
