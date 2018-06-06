let store = {};
let validData = {};

export default {
  init({ bungo, cards }) {
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
          if (!validData.bungo.hasOwnProperty(bungo)) {
            throw new Error('Store.action: setBungo - unknown bungo id!');
          }
          state.bungo = bungo;
        },
        setCardId(cardId) {
          if (!validData.cards.hasOwnProperty(cardId)) {
            throw new Error('Store.action: setCardId - unknown cardId id!');
          }
          state.cardId = cardId;
        },
        setCardLv(cardLv) {
          if (!state.cardId) {
            throw new Error('Store.action: setCardLv - set cardId before setting cardLv!');
          }
          if (!validData.cards[state.cardId].status.hasOwnProperty(cardLv)) {
            throw new Error('Store.action: setCardLv - unknown cardLv!');
          }
          state.cardLv = cardLv;
        },
        setTech(tech) {
          if (!Number.isInteger(tech)) {
            throw new Error('Store.action: setTech - tech must be an integer!');
          }
          state.tech = tech;
        },
        setGenius(genius) {
          if (!Number.isInteger(genius)) {
            throw new Error('Store.action: setGenius - genius must be an integer!');
          }
          state.genius = genius;
        },
        setBeauty(beauty) {
          if (!Number.isInteger(beauty)) {
            throw new Error('Store.action: setBeauty - beauty must be an integer!');
          }
          state.beauty = beauty;
        },
        setTheme(theme) {
          if (!Number.isInteger(theme)) {
            throw new Error('Store.action: setTheme - theme must be an integer!');
          }
          state.theme = theme;
        },
        setTruth(truth) {
          if (!Number.isInteger(truth)) {
            throw new Error('Store.action: setTruth - truth must be an integer!');
          }
          state.truth = truth;
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
          copyTo.actions.setTech(state.tech);
          copyTo.actions.setGenius(state.genius);
          copyTo.actions.setBeauty(state.beauty);
          copyTo.actions.setTheme(state.theme);
          copyTo.actions.setTruth(state.truth);
        },
      };

      store[slotId] = { state, actions };
    }

    return store[slotId];
  },

  get(slotId) {
    if (!store[slotId]) {
      throw new Error('Store: get - unknown slotId!');
      // this.add(slotId);
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
};
