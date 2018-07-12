import { bungo, cards, weapons, status } from '../../data';
import Store from '../../store';

export default {
  name: 'BngoSlotInput',
  props: {
    order: {
      type: Number,
      required: false,
      default: 0,
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
  computed: {
    groupedCardsData() {
      const grouped = {};

      Object.keys(this.cardsData).map(id => {
        const currentCard = this.cardsData[id];
        const currentRare = currentCard.rare;

        if (!grouped[currentRare]) {
          grouped[currentRare] = {};
        }
        grouped[currentRare][id] = currentCard;
      });

      return grouped;
    },
    groupedBungoData() {
      const grouped = {};

      Object.keys(this.bungoData).map(id => {
        const currentBungo = this.bungoData[id];
        const currentWeapon = currentBungo.weapon === 'bow_alt' ? 'bow' : currentBungo.weapon;

        if (!grouped[currentWeapon]) {
          grouped[currentWeapon] = {};
        }
        grouped[currentWeapon][id] = currentBungo;
      });

      return grouped;
    },
  },
  created() {
    const { actions, state } = Store.get(this.order);
    this.actions = actions;
    this.state = state;
  },
  methods: {
    setBungo(e) {
      this.actions.setBungo(parseInt(e.target.value));
      this.sendAnalytics('bungo', '文豪');
      },
    setCardId(e) {
      const id = parseInt(e.target.value);
      this.actions.setCardId(id);

      if (!this.cardsData[id].status.hasOwnProperty(this.state.cardLv)) {
        const lv = parseInt(Object.keys(this.cardsData[id].status)[0]);
        this.actions.setCardLv(lv);
      }

      this.sendAnalytics('cardId', '装像');
    },
    setCardLv(e) {
      this.actions.setCardLv(parseInt(e.target.value));
      this.sendAnalytics('cardLv', '装像Lv');
    },
    setBaseStatus(key, e) {
      const val = e.target.value ? parseInt(e.target.value) : '';
      this.actions.setBaseStatus(key, val);
    },
    sendBaseStatusAnalytics(key) {
      this.sendAnalytics('baseStatus', `ステータス:${this.statusData.base[key]}`);
    },
    sendAnalytics(action, label) {
      if (process.env.NODE_ENV !== 'test') {
        gtag('event', action, {
          'event_category': 'input',
          'event_label': `${label}/${this.order}`,
        });
      }
    },
  },
};
