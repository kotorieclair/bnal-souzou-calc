import * as mutationTypes from '../mutationTypes'

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
  actions: {
    setBungo({ commit }, bungo) {
      commit(mutationTypes.SET_BUNGO, { bungo });
    },
    setCardId({ commit }, cardId) {
      commit(mutationTypes.SET_CARD_ID, { cardId });
      // commit(mutationTypes.SET_CARD_LV);
    },
    setCardLv({ commit }, cardLv) {
      commit(mutationTypes.SET_CARD_LV, { cardLv });
    }
  },
  mutations: {
    [mutationTypes.SET_BUNGO](state, { bungo }) {
      // if (bungo !== '' && !validData.bungo.hasOwnProperty(bungo)) {
      //   throw new Error('Store.action: setBungo - unknown bungo id!');
      // }
      state.bungo = bungo;
    },
    [mutationTypes.SET_CARD_ID](state, { cardId }) {
      // if (cardId !== '' && !validData.cards.hasOwnProperty(cardId)) {
      //   throw new Error('Store.action: setCardId - unknown cardId id!');
      // }
      state.cardId = cardId;
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
      state.cardLv = cardLv;
    },
    [mutationTypes.SET_BASE_STATUS](state, { key, val }) {
      // if (!statusData.base.hasOwnProperty(key)) {
      //   throw new Error('Store.action: setBaseStatus - unknown baseStatus key!');
      // }
      // if (val !== '' && !Number.isInteger(val)) {
      //   throw new Error(`Store.action: setBaseStatus - ${key} must be an integer!`);
      // }
      if (val <= -1) {
        state[key] = 1;
      } else {
        state[key] = val;
      }
    },
    [mutationTypes.COPY_SLOT_TO](state, { to }) {
      console.log(to);
      // state.slots[to] = { ...state.slots[from] };
    }
  },
};