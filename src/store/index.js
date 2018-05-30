let store = {};
let validData = {};

export default {
  init({ bungo, cards }) {
    validData = { bungo, cards };
  },

  add(slotId, from) {
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
          state.cardLv = cardLv;
        },
        setTech(tech) {
          state.tech = tech;
        },
        setGenius(genius) {
          state.genius = genius;
        },
        setBeauty(beauty) {
          state.beauty = beauty;
        },
        setTheme(theme) {
          state.theme = theme;
        },
        setTruth(truth) {
          state.truth = truth;
        },
        copyState: (to) => {
          let copyTo;
          try {
            copyTo = this.get(to);
          } catch (e) {
            throw new Error('Store: copyState - unknown slotId!');
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
