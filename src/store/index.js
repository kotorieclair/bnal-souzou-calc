export default {
  store: [],

  get(slotId) {
    if (!this.store[slotId]) {
      this.add(slotId);
    }
    return this.store[slotId];
  },

  add(slotId) {
    if (!this.store[slotId]) {
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
          state.bungo = bungo;
        },
        setCardId(cardId) {
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
        copySlot: (to) => {
          Object.keys(state).forEach((key) => {
            this.store[to].state[key] = state[key];
          });
        },
      };

      this.store[slotId] = { state, actions };
    }

    return this.store[slotId];
  },
};
