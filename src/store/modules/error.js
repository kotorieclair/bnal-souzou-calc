import * as mutationTypes from '../mutationTypes'

export default {
  namespaced: true,
  state: {
    errtype: null,
    message: null,
  },
  mutations: {
    seterrType(state, mes) {
      state.errtype = mes;
    }
  }
}
