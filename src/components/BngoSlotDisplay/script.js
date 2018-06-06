import { bungo, cards, weapons, status } from '../../data';

export default {
  name: 'BngoSlotDisplay',
  props: {
    bungo: {
      type: [String, Number],
      required: false,
    },
    cardId: {
      type: [String, Number],
      required: false,
    },
    cardLv: {
      type: [String, Number],
      required: false,
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
    return {};
  },
  created() {
  },
};
