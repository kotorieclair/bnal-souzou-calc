import { bungo, cards, weapons, status } from '../../data'
import Store from '../../store'

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
    groupedCardsData() {
      const grouped = {}

      Object.keys(this.cardsData).map(id => {
        const currentCard = this.cardsData[id]
        const currentRare = currentCard.rare

        if (!grouped[currentRare]) {
          grouped[currentRare] = {}
        }
        grouped[currentRare][id] = currentCard
      })

      return grouped
    },
    groupedBungoData() {
      const grouped = {}

      Object.keys(this.bungoData).map(id => {
        const currentBungo = this.bungoData[id]
        const currentWeapon =
          currentBungo.weapon === 'bow_alt' ? 'bow' : currentBungo.weapon

        if (!grouped[currentWeapon]) {
          grouped[currentWeapon] = {}
        }
        grouped[currentWeapon][id] = currentBungo
      })

      return grouped
    },
  },
  created() {
    const { actions, state } = Store.get(this.order)
    this.actions = actions
    this.state = state
  },
  methods: {
    setBungo(e) {
      try {
        this.actions.setBungo(parseInt(e.target.value))
      } catch (error) {
        this.$root.$emit('displayError', error.message)
      }
      this.sendAnalytics('bungo', '文豪')
    },
    setCardId(e) {
      const id = parseInt(e.target.value)
      this.actions.setCardId(id)

      if (!this.cardsData[id].status.hasOwnProperty(this.state.cardLv)) {
        const lv = parseInt(Object.keys(this.cardsData[id].status)[0])
        try {
          this.actions.setCardLv(lv)
        } catch (error) {
          this.$root.$emit('displayError', error.message)
        }
      }

      try {
        this.sendAnalytics('cardId', '装像')
      } catch (error) {
        this.$root.$emit('displayError', error.message)
      }
    },
    setCardLv(e) {
      this.actions.setCardLv(parseInt(e.target.value))
      try {
        this.sendAnalytics('cardLv', '装像Lv')
      } catch (error) {
        this.$root.$emit('displayError', error.message)
      }
    },
    setBaseStatus(key, e) {
      const val = e.target.value ? parseInt(e.target.value) : ''
      try {
        this.actions.setBaseStatus(key, val)
      } catch (error) {
        this.$root.$emit('displayError', error.message)
      }
    },
    sendBaseStatusAnalytics(key) {
      this.sendAnalytics(
        'baseStatus',
        `ステータス:${this.statusData.base[key]}`
      )
    },
    sendAnalytics(action, label) {
      if (process.env.NODE_ENV !== 'test') {
        try {
          gtag('event', action, {
            event_category: 'input',
            event_label: `${label}/${this.order}`,
          })
        } catch (error) {
          this.$root.$emit('displayError', error.message)
        }
      }
    },
  },
}
