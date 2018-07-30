import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import slot from './modules/slot'
import error from './modules/error'

Vue.use(Vuex);

const store = new Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    namespaced: true,
    slots: {
      namespaced: true,
      modules: {
        1: slot,
      },
    },
    error,
  },
});

export default store