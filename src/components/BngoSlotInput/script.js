import { bungo, cards, weapons, status } from '../../data';

export default {
  name: 'BngoSlotInput',
  props: {
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
    baseStatus: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showStatusInput: false,
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
    this.bungoData = bungo;
    this.cardsData = cards;
    this.weaponsData = weapons;
    this.statusData = status;
  },
  methods: {
    setBungo(e) {
      this.$emit('changeInputtedValue', 'bungo', parseInt(e.target.value));
    },
    setCardId(e) {
      const id = parseInt(e.target.value);
      this.$emit('changeInputtedValue', 'cardId', id);

      if (!this.cardsData[id].status[this.cardLv]) {
        const lv = parseInt(Object.keys(this.cardsData[id].status)[0]);
        this.$emit('changeInputtedValue', 'cardLv', lv);
      }
    },
    setCardLv(e) {
      this.$emit('changeInputtedValue', 'cardLv', parseInt(e.target.value));
    },
    setBaseStatus(key, e) {
      const val = e.target.value ? parseInt(e.target.value) : '';
      const inputs = Object.assign({}, this.baseStatus, { [key]: val });
      this.$emit('changeInputtedValue', 'baseStatus', inputs);
    },
  }
}
