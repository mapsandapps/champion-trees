import Vue from 'vue'
import Vuex from 'vuex'

import filters from './filters'
import trees from './trees'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    filters,
    trees,
    user
  }
});

export default store;
