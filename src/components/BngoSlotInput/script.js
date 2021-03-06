import { bungo, cards, weapons, weaponOptions, status } from '../../data';

export default {
  name: 'BngoSlotInput',
  props: {
    order: {
      type: Number,
      required: false,
      default: 0,
    },
    bungo: {
      type: [String, Number],
      required: true,
    },
    cardId: {
      type: [String, Number],
      required: true,
    },
    cardLv: {
      type: [String, Number],
      required: true,
    },
    tech: {
      type: [String, Number],
      required: true,
    },
    genius: {
      type: [String, Number],
      required: true,
    },
    beauty: {
      type: [String, Number],
      required: true,
    },
    theme: {
      type: [String, Number],
      required: true,
    },
    truth: {
      type: [String, Number],
      required: true,
    },
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
        const currentWeapon = this.getOptionLabel(currentBungo);
        
        if (!grouped[currentWeapon]) {
          grouped[currentWeapon] = {};
        }
        grouped[currentWeapon][id] = currentBungo;
      });

      return grouped;
    },
  },
  created() {
    this.bungoData = bungo;
    this.cardsData = cards;
    this.weaponsData = weapons;
    this.weaponOptions = weaponOptions;
    this.statusData = status;
  },
  methods: {
    getOptionLabel(bungo) {
      switch (bungo.weapon) {
        case 'bow_alt':
          return 'bow';
        case 'alchemy':
        case 'fight':
          return 'special';
        default:
          return bungo.weapon;
      }
    },
    setBungo(e) {
      this.$emit('changeInputtedValue', 'bungo', parseInt(e.target.value));
      this.sendAnalytics('bungo', '文豪');
    },
    setCardId(e) {
      const id = parseInt(e.target.value);
      this.$emit('changeInputtedValue', 'cardId', id);

      if (!this.cardsData[id].status.hasOwnProperty(this.cardLv)) {
        const lv = parseInt(Object.keys(this.cardsData[id].status)[0]);
        this.$emit('changeInputtedValue', 'cardLv', lv);
      }

      this.sendAnalytics('cardId', '装像');
    },
    setCardLv(e) {
      this.$emit('changeInputtedValue', 'cardLv', parseInt(e.target.value));
      this.sendAnalytics('cardLv', '装像Lv');
    },
    setBaseStatus(key, e) {
      const val = e.target.value ? parseInt(e.target.value) : '';
      this.$emit('changeInputtedValue', key, val);
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
