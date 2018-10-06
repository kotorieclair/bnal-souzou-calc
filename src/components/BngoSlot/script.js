// import { mapMutations } from 'vuex'
import BngoSlotInput from 'components/BngoSlotInput'
import BngoSlotDisplay from 'components/BngoSlotDisplay'
import { bungo, cards, weapons, status } from 'data'
import Store from 'store/_index'
// import { INIT_SLOT, COPY_SLOT_TO } from '../../store/mutationTypes';
import store from 'store'
import slotModule from 'store/modules/slot'

export default {
  name: 'BngoSlot',
  components: { BngoSlotInput, BngoSlotDisplay },
  props: {
    slotId: {
      type: Number,
      required: false,
      default: 1,
    },
    totalSlot: {
      type: Number,
      required: false,
      default: 1,
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
    copyButtonsList() {
      const total = []
      if (this.totalSlot <= 1) {
        return total
      }
      for (let n of Array(this.totalSlot).keys()) {
        if (n + 1 !== this.slotId) {
          total.push(n + 1)
        }
      }
      return total
    },
    // 装像の実際の増減値
    // 不明なレベルの装像の値を保持
    adjustedCardStatus() {
      if (!this.state.cardId || !this.state.cardLv) {
        return {}
      }

      const status = this.cardsData[this.state.cardId].status[this.state.cardLv]
      if (status === null) {
        return this.estimateCardStatus(
          this.cardsData[this.state.cardId].status,
          this.state.cardLv
        )
      }
      return status
    },
    // dataの基礎ステータスをまとめたもの
    baseStatus() {
      const { tech, genius, beauty, theme, truth } = this.state
      if (!tech || !genius || !beauty || !theme || !truth) {
        return {}
      }
      return { tech, genius, beauty, theme, truth }
    },
    // baseStatusからの戦闘ステータス算出
    // baseStatus入力済み時のみ使用
    inputtedBattleStatus() {
      if (!this.state.bungo || Object.keys(this.baseStatus).length === 0) {
        return {}
      }

      return {
        atk: this.calculateAtk(
          this.bungoData[this.state.bungo].weapon,
          this.baseStatus
        ),
        def: this.calculateDef(
          this.bungoData[this.state.bungo].weapon,
          this.baseStatus
        ),
        avd: this.calculateAvd(
          this.bungoData[this.state.bungo].weapon,
          this.baseStatus
        ),
      }
    },
    // adjustedCardStatusとbaseStatusを足した基礎ステータス
    // baseStatus入力済み時のみ使用
    totalBaseStatus() {
      if (
        Object.keys(this.baseStatus).length === 0 ||
        Object.keys(this.adjustedCardStatus).length === 0
      ) {
        return {}
      }

      const totalStatus = {}
      Object.keys(this.statusData.base).forEach(key => {
        totalStatus[key] =
          (this.adjustedCardStatus[key] || 0) + this.baseStatus[key]
        if (totalStatus[key] < 0) {
          totalStatus[key] = 1
        }
      })
      return totalStatus
    },
    // 最終的な戦闘ステータス
    // totalBaseStatusより算出
    // baseStatus入力済み時のみ使用
    finalBattleStatus() {
      if (Object.keys(this.totalBaseStatus).length === 0) {
        return {}
      }

      return {
        atk: this.calculateAtk(
          this.bungoData[this.state.bungo].weapon,
          this.totalBaseStatus
        ),
        def: this.calculateDef(
          this.bungoData[this.state.bungo].weapon,
          this.totalBaseStatus
        ),
        avd: this.calculateAvd(
          this.bungoData[this.state.bungo].weapon,
          this.totalBaseStatus
        ),
      }
    },
    // 装像による戦闘ステータスの増加値
    increasedBattleStatus() {
      // baseStatus未入力ならadjustedCardStatusからそのまま算出
      // baseStatus入力済みならfinalBattleStatus - inputtedBattleStatus
      if (!this.state.bungo || !this.state.cardId || !this.state.cardLv) {
        return {}
      }

      if (Object.keys(this.baseStatus).length === 0) {
        return {
          atk: this.calculateAtk(
            this.bungoData[this.state.bungo].weapon,
            this.adjustedCardStatus
          ),
          def: this.calculateDef(
            this.bungoData[this.state.bungo].weapon,
            this.adjustedCardStatus
          ),
          avd: this.calculateAvd(
            this.bungoData[this.state.bungo].weapon,
            this.adjustedCardStatus
          ),
        }
      }

      if (
        Object.keys(this.finalBattleStatus).length !== 0 &&
        Object.keys(this.inputtedBattleStatus).length !== 0
      ) {
        return {
          atk: this.finalBattleStatus.atk - this.inputtedBattleStatus.atk,
          def: this.finalBattleStatus.def - this.inputtedBattleStatus.def,
          avd: this.finalBattleStatus.avd - this.inputtedBattleStatus.avd,
        }
      }

      return {}
    },
  },
  created() {
    const { actions, state } = Store.add(this.slotId)
    this.actions = actions
    this.state = state
    if (this.slotId > 1) {
      store.registerModule(['slots', this.slotId], slotModule)
    }
  },
  methods: {
    // ...mapMutations(`slots/1`, {
    //   copySlotTo: COPY_SLOT_TO,
    // }),
    copyStateTo(to) {
      try {
        this.actions.copyStateTo(to)
        // this.copySlotTo({ to });
      } catch (error) {
        this.$root.$emit('displayError', error.message)
      }
      this.sendAnalytics('copyStateTo', to)
    },
    estimateCardStatus(status, lv) {
      const adj = lv === 3 ? 2 : lv === 2 ? 1.4 : 1
      const estimated = {}
      Object.keys(status[1]).forEach(key => {
        estimated[key] = Math.ceil(status[1][key] * adj)
      })
      return estimated
    },
    calculateAtk(
      weapon,
      { tech = 0, genius = 0, beauty = 0, theme = 0, truth = 0 }
    ) {
      const base =
        weapon === 'bow'
          ? tech + genius / 2 + beauty / 2 + theme / 2 + truth / 2
          : tech + genius / 2 + beauty + theme / 2

      return Math.round(base / this.weaponsData[weapon].adjustment.atk)
    },
    calculateDef(weapon, { tech = 0, genius = 0, beauty = 0, truth = 0 }) {
      const base =
        weapon === 'bow'
          ? tech + genius + truth
          : tech + genius + beauty / 2 + truth / 2

      return Math.round(base / this.weaponsData[weapon].adjustment.def)
    },
    calculateAvd(weapon, { tech = 0, beauty = 0, truth = 0 }) {
      const base = weapon === 'bow' ? tech + truth : tech + beauty

      return Math.round(base / this.weaponsData[weapon].adjustment.avd)
    },
    sendAnalytics(action, label) {
      if (process.env.NODE_ENV !== 'test') {
        try {
          gtag('event', action, {
            event_category: 'button',
            event_label: `${this.slotId}→${label}`,
          })
        } catch (error) {
          this.$root.$emit('displayError', error.message)
        }
      }
    },
  },
}
