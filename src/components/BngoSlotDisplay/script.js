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
    increasedBattleStatus: {
      type: Object,
      required: false,
    },
    adjustedCardStatus: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {};
  },
  created() {
    this.bungoData = bungo;
    this.cardsData = cards;
    this.weaponsData = weapons;
    this.statusData = status;
  },
}
