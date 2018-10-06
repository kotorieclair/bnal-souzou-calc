import { mapState } from 'vuex'
import { bungo, cards, weapons, status } from '../../data'
import Store from '../../store/_index'

export default {
  name: 'BngoSlotDisplay',
  props: {
    slotId: {
      type: Number,
      required: true,
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
        return bungo
      },
    },
    cardsData: {
      type: Object,
      required: false,
      default() {
        return cards
      },
    },
    weaponsData: {
      type: Object,
      required: false,
      default() {
        return weapons
      },
    },
    statusData: {
      type: Object,
      required: false,
      default() {
        return status
      },
    },
  },
  data() {
    return {
      state: null,
    }
  },
  computed: {
    ...mapState('slots', {
      bungo(state) {
        return state[this.slotId].bungo
      },
      cardId(state) {
        return state[this.slotId].cardId
      },
      cardLv(state) {
        return state[this.slotId].cardLv
      },
    }),
  },
  created() {
    const { actions, state } = Store.get(this.slotId)
    this.actions = actions
    this.state = state
  },
}
