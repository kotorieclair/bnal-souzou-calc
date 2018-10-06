import statusData from 'data/status';

let store = {};
let validData = {};

export default {
  init({ bungo, cards }) {
    if (!bungo || !cards) {
      throw new Error('Store: init - static data for validation must be provided!');
    }
    validData = { bungo, cards };
  },

  add(slotId) {
    if (Object.keys(validData).length === 0) {
      throw new Error('Store: add - init the store with statics before adding!');
    }

    if (!store[slotId]) {
      const state = {
        bungo: '',
        cardId: '',
        cardLv: '',
        tech: '',
        genius: '',
        beauty: '',
        theme: '',
        truth: '',
      };

      const actions = {
        setBungo(bungo) {
          if (bungo !== '' && !validData.bungo.hasOwnProperty(bungo)) {
            throw new Error('Store.action: setBungo - unknown bungo id!');
          }
          state.bungo = bungo;
        },
        setCardId(cardId) {
          if (cardId !== '' && !validData.cards.hasOwnProperty(cardId)) {
            throw new Error('Store.action: setCardId - unknown cardId id!');
          }
          state.cardId = cardId;
        },
        setCardLv(cardLv) {
          if (cardLv !== '') {
            if (!state.cardId) {
              throw new Error('Store.action: setCardLv - set cardId before setting cardLv!');
            }
            if (!validData.cards[state.cardId].status.hasOwnProperty(cardLv)) {
              throw new Error('Store.action: setCardLv - unknown cardLv!');
            }
          }
          state.cardLv = cardLv;
        },
        setBaseStatus(key, val) {
          if (!statusData.base.hasOwnProperty(key)) {
            throw new Error('Store.action: setBaseStatus - unknown baseStatus key!');
          }
          if (val !== '' && !Number.isInteger(val)) {
            throw new Error(`Store.action: setBaseStatus - ${key} must be an integer!`);
          }
          if (val <= -1) {
            state[key] = 1;
          } else {
            state[key] = val;
          }
        },
        copyStateTo: (to) => {
          let copyTo;
          try {
            copyTo = this.get(to);
          } catch (e) {
            throw new Error('Store: copyStateTo - unknown slotId!');
          }

          copyTo.actions.setBungo(state.bungo);
          copyTo.actions.setCardId(state.cardId);
          copyTo.actions.setCardLv(state.cardLv);
          copyTo.actions.setBaseStatus('tech', state.tech);
          copyTo.actions.setBaseStatus('genius', state.genius);
          copyTo.actions.setBaseStatus('beauty', state.beauty);
          copyTo.actions.setBaseStatus('theme', state.theme);
          copyTo.actions.setBaseStatus('truth', state.truth);
        },
      };

      store[slotId] = { state, actions };
    }

    return store[slotId];
  },

  get(slotId) {
    if (!store[slotId]) {
      throw new Error('Store: get - unknown slotId!');
    }
    return store[slotId];
  },

  delete(slotId) {
    if (!store[slotId]) {
      throw new Error('Store: delete - unknown slotId!');
    }

    delete store[slotId];
  },

  destroy() {
    store = {};
    validData = {};
  },

  _getAllStore() {
    return store;
  },

  _getValidData() {
    return validData;
  }
};
