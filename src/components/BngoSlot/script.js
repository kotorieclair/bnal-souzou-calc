import BngoSlotInput from '../BngoSlotInput';
import BngoSlotDisplay from '../BngoSlotDisplay';
import { bungo, cards, weapons, status } from '../../data';
import store from '../../store';

export default {
  name: 'BngoSlot',
  components: { BngoSlotInput, BngoSlotDisplay },
  props: {
    order: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      bungo: '',
      cardId: '',
      cardLv: '',
      tech: '',
      genius: '',
      beauty: '',
      theme: '',
      truth: '',
      state: null,
    };
  },
  computed: {
    // 装像の実際の増減値
    // 不明なレベルの装像の値を保持
    adjustedCardStatus() {
      if (!this.cardId || !this.cardLv) {
        return {};
      }

      const status = this.cardsData[this.cardId].status[this.cardLv];
      if (status === null) {
        return this.estimateCardStatus(this.cardsData[this.cardId].status, this.cardLv);
      }
      return status;
    },
    // dataの基礎ステータスをまとめたもの
    baseStatus() {
      const { tech, genius, beauty, theme, truth } = this;
      if (!tech || !genius || !beauty || !theme || !truth) {
        return {};
      }
      return { tech, genius, beauty, theme, truth };
    },
    // baseStatusからの戦闘ステータス算出
    // baseStatus入力済み時のみ使用
    inputtedBattleStatus() {
      if (!this.bungo || Object.keys(this.baseStatus).length === 0) {
        return {};
      }

      return {
        atk: this.calculateAtk(this.bungoData[this.bungo].weapon, this.baseStatus),
        def: this.calculateDef(this.bungoData[this.bungo].weapon, this.baseStatus),
        avd: this.calculateAvd(this.bungoData[this.bungo].weapon, this.baseStatus),
      };
    },
    // adjustedCardStatusとbaseStatusを足した基礎ステータス
    // baseStatus入力済み時のみ使用
    totalBaseStatus() {
      if (Object.keys(this.baseStatus).length === 0 || Object.keys(this.adjustedCardStatus).length === 0) {
        return {};
      }

      const totalStatus = {};
      Object.keys(this.statusData.base).forEach((key) => {
        totalStatus[key] = (this.adjustedCardStatus[key] || 0) + this.baseStatus[key];
        if (totalStatus[key] < 0) {
          totalStatus[key] = 1;
        }
      });
      return totalStatus;
    },
    // 最終的な戦闘ステータス
    // totalBaseStatusより算出
    // baseStatus入力済み時のみ使用
    finalBattleStatus() {
      if (Object.keys(this.totalBaseStatus).length === 0) {
        return {};
      }

      return {
        atk: this.calculateAtk(this.bungoData[this.bungo].weapon, this.totalBaseStatus),
        def: this.calculateDef(this.bungoData[this.bungo].weapon, this.totalBaseStatus),
        avd: this.calculateAvd(this.bungoData[this.bungo].weapon, this.totalBaseStatus),
      };
    },
    // 装像による戦闘ステータスの増加値
    increasedBattleStatus() {
      // baseStatus未入力ならadjustedCardStatusからそのまま算出
      // baseStatus入力済みならfinalBattleStatus - inputtedBattleStatus
      if (!this.bungo || !this.cardId || !this.cardLv) {
        return {};
      }

      if (Object.keys(this.baseStatus).length === 0) {
        return {
          atk: this.calculateAtk(this.bungoData[this.bungo].weapon, this.adjustedCardStatus),
          def: this.calculateDef(this.bungoData[this.bungo].weapon, this.adjustedCardStatus),
          avd: this.calculateAvd(this.bungoData[this.bungo].weapon, this.adjustedCardStatus),
        };
      }

      if (Object.keys(this.finalBattleStatus).length !== 0 && Object.keys(this.inputtedBattleStatus).length !== 0) {
        return {
          atk: this.finalBattleStatus.atk - this.inputtedBattleStatus.atk,
          def: this.finalBattleStatus.def - this.inputtedBattleStatus.def,
          avd: this.finalBattleStatus.avd - this.inputtedBattleStatus.avd,
        };
      }

      return {};
    },
  },
  created() {
    this.bungoData = bungo;
    this.cardsData = cards;
    this.weaponsData = weapons;
    this.statusData = status;

    const { actions, state } = store.add(this.order);
    this.actions = actions;
    this.state = state;
  },
  methods: {
    setInputtedValue(key, payload) {
      if (!this.hasOwnProperty(key)) {
        throw new Error('BungoSlot: setInputtedValue - unappropriate key!');
      };

      if (key === 'baseStatus') {
        if (typeof payload !== 'object') {
          throw new Error('BungoSlot: setInputtedValue - unappropriate baseStatus type!');
        }

        if (Object.keys(payload).length !== 0) {
          const keycheck = Object.keys(payload).every((status) => {
            return Object.keys(this.statusData.base).includes(status);
          });

          if (!keycheck) {
            throw new Error('BungoSlot: setInputtedValue - unappropriate baseStatus key!');
          }

          const valcheck = Object.keys(payload).every((status) => {
            return Number.isInteger(payload[status]);
          });

          if (!valcheck) {
            throw new Error('BungoSlot: setInputtedValue - unappropriate baseStatus val!');
          }
        }
      } else {
        if (payload !== '') {
          if (key === 'bungo' && !this.bungoData.hasOwnProperty(payload)) {
            throw new Error('BungoSlot: setInputtedValue - unknown bungo id!');
          }

          if (key === 'cardId' && !this.cardsData.hasOwnProperty(payload)) {
            throw new Error('BungoSlot: setInputtedValue - unknown cardId!');
          }

          if (key === 'cardLv' && !this.cardsData[this.cardId].status.hasOwnProperty(payload)) {
            throw new Error('BungoSlot: setInputtedValue - unknown cardLv!');
          }
        }
      }

      this[key] = payload;
    },
    copySlot(to) {
      this.actions.copySlot(to);
    },
    estimateCardStatus(status, lv) {
      const adj = lv === 3 ? 2 : lv === 2 ? 1.4 : 1;
      const estimated = {};
      Object.keys(status[1]).forEach((key) => {
        estimated[key] = Math.ceil(status[1][key] * adj);
      });
      return estimated;
    },
    calculateAtk(weapon, { tech = 0, genius = 0, beauty = 0, theme = 0, truth = 0 }) {
      const base = weapon === 'bow' ?
        tech + genius/2 + beauty/2 + theme/2 + truth/2 :
        tech + genius/2 + beauty + theme/2;

      return Math.round(base / this.weaponsData[weapon].adjustment.atk);
    },
    calculateDef(weapon, { tech = 0, genius = 0, beauty = 0, theme = 0, truth = 0 }) {
      const base = weapon === 'bow' ?
        tech + genius + truth :
        tech + genius + beauty/2 + truth/2;

      return Math.round(base / this.weaponsData[weapon].adjustment.def);
    },
    calculateAvd(weapon, { tech = 0, genius = 0, beauty = 0, theme = 0, truth = 0 }) {
      const base = weapon === 'bow' ?
        tech + truth :
        tech + beauty;

      return Math.round(base / this.weaponsData[weapon].adjustment.avd);
    },
  },
};
