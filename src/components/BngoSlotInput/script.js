// import { mapMutations } from 'vuex'
import { bungo, cards, weapons, weaponOptions, status } from 'data'
// import Store from 'store/_index'
// import // SET_BUNGO,
// // SET_CARD_ID,
// // SET_CARD_LV,
// // SET_BASE_STATUS,
// '../../store/mutationTypes'
import { actionTypes } from 'store/modules/slot'

export default {
  name: 'BngoSlotInput',
  props: {
    slotId: {
      type: Number,
      required: true,
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
    weaponOptions: {
      type: Object,
      required: false,
      default() {
        return weaponOptions
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
        const currentWeapon = this.getOptionLabel(currentBungo)

        if (!grouped[currentWeapon]) {
          grouped[currentWeapon] = {}
        }
        grouped[currentWeapon][id] = currentBungo
      })

      return grouped
    },
    bungo: {
      get() {
        return this.getStoreState('bungo')
      },
      set(val) {
        return this.setBungo(val)
      },
    },
    cardId: {
      get() {
        return this.getStoreState('cardId')
      },
      set(val) {
        return this.setCardId(val)
      },
    },
    cardLv: {
      get() {
        return this.getStoreState('cardLv')
      },
      set(val) {
        return this.setCardLv(val)
      },
    },
    tech: {
      get() {
        return this.getStoreState('tech')
      },
      set(val) {
        this.setBaseStatus('tech', val)
      },
    },
    genius: {
      get() {
        return this.getStoreState('genius')
      },
      set(val) {
        return this.setBaseStatus('genius', val)
      },
    },
    beauty: {
      get() {
        return this.getStoreState('beauty')
      },
      set(val) {
        return this.setBaseStatus('beauty', val)
      },
    },
    theme: {
      get() {
        return this.getStoreState('theme')
      },
      set(val) {
        return this.setBaseStatus('theme', val)
      },
    },
    truth: {
      get() {
        return this.getStoreState('truth')
      },
      set(val) {
        return this.setBaseStatus('truth', val)
      },
    },
    baseStatusMap() {
      return {
        tech: this.tech,
      }
    },
  },
  created() {
    // const { actions, state } = Store.get(this.slotId)
    // this.actions = actions
    // this.state = state
  },
  methods: {
    getOptionLabel(bungo) {
      switch (bungo.weapon) {
        case 'bow_alt':
          return 'bow'
        case 'alchemy':
        case 'fight':
          return 'special'
        default:
          return bungo.weapon
      }
    },
    getStoreState(key) {
      return this.$store.state.slots[this.slotId][key]
    },
    // setStoreState(mutationType, payload) {
    //   return this.$store.commit(`slots/${this.slotId}/${mutationType}`, payload)
    // },
    dispatchAction(action, payload) {
      return this.$store.dispatch(`slots/${this.slotId}/${action}`, payload)
    },
    // ...mapMutations('slots', {
    //   setBaseStatus(commit, payload) {
    //     return commit(`${this.slotId}/${SET_BASE_STATUS}`, payload)
    //   },
    // }),
    setBungo(bungo) {
      // try {
      //   this.actions.setBungo(parseInt(e.target.value));
      // } catch(error) {
      //   this.$root.$emit('displayError', error.message);
      // }
      this.sendAnalytics('bungo', '文豪')
      return this.dispatchAction(actionTypes.setBungo, bungo)
    },
    setCardId(cardId) {
      // const id = parseInt(e.target.value);
      // this.actions.setCardId(id);
      // this.setCardId({ cardId: id });

      if (!this.cardsData[cardId].status.hasOwnProperty(this.cardLv)) {
        const cardLv = parseInt(Object.keys(this.cardsData[cardId].status)[0])
        // this.setStoreState(SET_CARD_LV, { cardLv: lv });
        this.dispatchAction(actionTypes.setCardLv, cardLv)
        //   try {
        //     this.actions.setCardLv(lv);
        //     this.setCardLv({ cardLv: lv });
        //   } catch(error) {
        //     this.$root.$emit('displayError', error.message);
        //   }
      }

      this.sendAnalytics('cardId', '装像')

      return this.dispatchAction(actionTypes.setCardId, cardId)
    },
    setCardLv(cardLv) {
      // this.actions.setCardLv(parseInt(e.target.value));
      // this.setCardLv({ cardLv: parseInt(e.target.value) });

      this.sendAnalytics('cardLv', '装像Lv')

      return this.dispatchAction(actionTypes.setCardLv, cardLv)
    },
    setBaseStatus(statusKey, _val) {
      const val = _val ? parseInt(_val) : ''
      return this.dispatchAction(actionTypes.setBaseStatus, { statusKey, val })
    },
    // changeBaseStatus(key, e) {
    //   const val = e.target.value ? parseInt(e.target.value) : ''

    //   try {
    //     this.actions.setBaseStatus(key, val)
    //     this.setBaseStatus({ key, val })
    //   } catch (error) {
    //     this.$root.$emit('displayError', error.message)
    //   }
    // },
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
            event_label: `${label}/${this.slotId}`,
          })
        } catch (error) {
          this.$root.$emit('displayError', error.message)
        }
      }
    },
  },
}
