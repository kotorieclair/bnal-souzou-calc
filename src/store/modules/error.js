// import * as mutationTypes from '../mutationTypes'

export const actionTypes = {
  showErrorMes: 'showErrorMes',
}

export const mutationTypes = {
  SHOW_ERROR_MES: 'SHOW_ERROR_MES'
}

export default {
  namespaced: true,
  state: {
    errtype: null,
    message: null,
  },
  actions: {
    [actionTypes.showErrorMes]({ commit }, message) {
      commit(mutationTypes.SHOW_ERROR_MES, { message })
    },
  },
  mutations: {
    [mutationTypes.SHOW_ERROR_MES](state, { message }) {
      state.message = message
    },
  },
}
