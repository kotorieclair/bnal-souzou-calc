// import * as mutationTypes from '../mutationTypes'
import * as validData from 'data'
import { actionTypes as errorActionTypes } from 'store/modules/error'

export const actionTypes = {
  setBungo: 'setBungo',
  setCardId: 'setCardId',
  setCardLv: 'setCardLv',
  setBaseStatus: 'setBaseStatus',
}

export const mutationTypes = {
  SET_BUNGO: 'SET_BUNGO',
  SET_CARD_ID: 'SET_CARD_ID',
  SET_CARD_LV: 'SET_CARD_LV',
  SET_BASE_STATUS: 'SET_BASE_STATUS',
  COPY_SLOT_TO: 'COPY_SLOT_TO',
}

export const getStoreState = (key, vm) => {
  return vm.$store.state.slots[vm.slotId][key]
}

export const dispatchAction = (action, payload, vm) => {
  return vm.$store.dispatch(`slots/${vm.slotId}/${action}`, payload)
}

export default {
  namespaced: true,
  state() {
    return {
      bungo: '',
      cardId: '',
      cardLv: '',
      tech: '',
      genius: '',
      beauty: '',
      theme: '',
      truth: '',
    }
  },
  getters: {},
  actions: {
    [actionTypes.setBungo]({ dispatch, commit }, bungo) {
      if (bungo !== '' && !validData.bungo.hasOwnProperty(bungo)) {
        dispatch(
          errorActionTypes.showErrorMes,
          'Store.action: setBungo - unknown bungo id!'
        )
        // throw new Error('Store.action: setBungo - unknown bungo id!');
      } else {
        commit(mutationTypes.SET_BUNGO, { bungo })
      }
    },
    [actionTypes.setCardId]({ commit }, cardId) {
      commit(mutationTypes.SET_CARD_ID, { cardId })
      // commit(mutationTypes.SET_CARD_LV);
    },
    [actionTypes.setCardLv]({ commit }, cardLv) {
      commit(mutationTypes.SET_CARD_LV, { cardLv })
    },
    [actionTypes.setBaseStatus]({ commit }, { statusKey, val }) {
      commit(mutationTypes.SET_BASE_STATUS, { statusKey, val })
    },
  },
  mutations: {
    [mutationTypes.SET_BUNGO](state, { bungo }) {
      state.bungo = bungo
    },
    [mutationTypes.SET_CARD_ID](state, { cardId }) {
      // if (cardId !== '' && !validData.cards.hasOwnProperty(cardId)) {
      //   throw new Error('Store.action: setCardId - unknown cardId id!');
      // }
      state.cardId = cardId
    },
    [mutationTypes.SET_CARD_LV](state, { cardLv }) {
      // if (cardLv !== '') {
      //   if (!state.cardId) {
      //     throw new Error('Store.action: setCardLv - set cardId before setting cardLv!');
      //   }
      //   if (!validData.cards[state.cardId].status.hasOwnProperty(cardLv)) {
      //     throw new Error('Store.action: setCardLv - unknown cardLv!');
      //   }
      // }
      state.cardLv = cardLv
    },
    [mutationTypes.SET_BASE_STATUS](state, { statusKey, val }) {
      // if (!statusData.base.hasOwnProperty(key)) {
      //   throw new Error('Store.action: setBaseStatus - unknown baseStatus key!');
      // }
      // if (val !== '' && !Number.isInteger(val)) {
      //   throw new Error(`Store.action: setBaseStatus - ${key} must be an integer!`);
      // }
      if (val <= -1) {
        state[statusKey] = 1
      } else {
        state[statusKey] = val
      }
    },
    // [mutationTypes.COPY_SLOT_TO](state, { to }) {
    //   console.log(to)
    //   // state.slots[to] = { ...state.slots[from] };
    // },
  },
}
