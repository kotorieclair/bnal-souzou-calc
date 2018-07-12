import { bungo, cards, weapons, status } from '../../data';
import Store from '../../store';

export default {
  name: 'BngoSlotDisplay',
  props: {
    order: {
      type: Number,
      required: false,
      default: 0,
    },
    adjustedCardStatus: {
      type: Object,
      required: false,
    },
    inputtedBattleStatus: {
      type: Object,
      required: false,
    },
    finalBattleStatus: {
      type: Object,
      required: false,
    },
    increasedBattleStatus: {
      type: Object,
      required: false,
    },
    bungoData: {
      type: Object,
      required: false,
      default() {
        return bungo;
      },
    },
    cardsData: {
      type: Object,
      required: false,
      default() {
        return cards;
      },
    },
    weaponsData: {
      type: Object,
      required: false,
      default() {
        return weapons;
      },
    },
    statusData: {
      type: Object,
      required: false,
      default() {
        return status;
      },
    },
  },
  data() {
    return {
      state: null,
    };
  },
  created() {
    const { actions, state } = Store.get(this.order);
    this.actions = actions;
    this.state = state;
  },
};
