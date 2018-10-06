import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import BngoSlot from '../../src/components/BngoSlot'
import Store from '../../src/store'
import {
  testBungo,
  testCards,
  expectedCardStatus,
  testStatus,
} from '../testData'

describe('components: BngoSlot', () => {
  let wrapper
  let store

  before(() => {
    Store.init({
      bungo: testBungo,
      cards: testCards,
    })
  })

  beforeEach(() => {
    wrapper = shallowMount(BngoSlot, {
      propsData: {
        order: 1,
        bungoData: testBungo,
        cardsData: testCards,
      },
    })
    store = Store.get(1)
  })

  afterEach(() => {
    Store.delete(1)
  })

  after(() => {
    Store.destroy()
  })

  describe('computed: copyButtonsList', () => {
    it('returns an empty array when totalSlot <= 1')

    it('returns an array of correct slot number when totalSlot >= 2')
  })

  describe('computed: adjustedCardStatus', () => {
    it('returns an empty object when either cardId or cardLv is not set', () => {
      store.state.cardId = ''
      store.state.cardLv = 1
      expect(wrapper.vm.adjustedCardStatus).to.be.empty

      store.state.cardId = 101
      store.state.cardLv = ''
      expect(wrapper.vm.adjustedCardStatus).to.be.empty
    })

    it('returns an object containing selected card status', () => {
      const [id, lv] = [201, 3]
      store.state.cardId = id
      store.state.cardLv = lv
      expect(wrapper.vm.adjustedCardStatus).to.eql(testCards[id].status[lv])
    })

    it("returns estimated card status when selected card's level status is null", () => {
      const [id, lv] = [101, 2]
      store.state.cardId = id
      store.state.cardLv = lv
      expect(wrapper.vm.adjustedCardStatus).to.eql(
        expectedCardStatus[id].base[lv]
      )
    })
  })

  describe('computed: baseStatus', () => {
    it('returns an empty object when not all baseStatus data is inputted', () => {
      store.state.tech = 30
      store.state.theme = 45
      expect(wrapper.vm.baseStatus).to.be.empty
    })

    it('returns an object containig all baseStatus data', () => {
      const status = {
        tech: 30,
        genius: 32,
        beauty: 50,
        theme: 45,
        truth: 33,
      }
      store.state.tech = status.tech
      store.state.genius = status.genius
      store.state.beauty = status.beauty
      store.state.theme = status.theme
      store.state.truth = status.truth
      expect(wrapper.vm.baseStatus).to.eql(status)
    })
  })

  describe('computed: inputtedBattleStatus', () => {
    it('returns an empty object when bungo is not set', () => {
      store.state.bungo = ''
      expect(wrapper.vm.inputtedBattleStatus).to.be.empty
    })

    it('returns an empty object when baseStatus is not inputted', () => {
      store.state.tech = ''
      store.state.genius = ''
      store.state.beauty = ''
      store.state.theme = ''
      store.state.truth = ''
      expect(wrapper.vm.inputtedBattleStatus).to.be.empty
    })

    it('returns a battle status object calculated from baseStatus', () => {
      store.state.bungo = 1
      store.state.tech = testStatus.blade.base.tech
      store.state.genius = testStatus.blade.base.genius
      store.state.beauty = testStatus.blade.base.beauty
      store.state.theme = testStatus.blade.base.theme
      store.state.truth = testStatus.blade.base.truth
      expect(wrapper.vm.inputtedBattleStatus).to.eql(testStatus.blade.battle)
    })
  })

  describe('computed: totalBaseStatus', () => {
    it('returns an empty object when baseStatus is not inputted', () => {
      expect(wrapper.vm.totalBaseStatus).to.be.empty
    })

    it('returns an empty object when adjustedCardStatus is not ready', () => {
      store.state.tech = 10
      store.state.genius = 10
      store.state.beauty = 10
      store.state.theme = 10
      store.state.truth = 10
      expect(wrapper.vm.totalBaseStatus).to.be.empty
    })

    it('adds adjustedCardStatus to baseStatus', () => {
      const [bungo, id, lv] = [1, 201, 3]
      store.state.bungo = bungo
      store.state.cardId = id
      store.state.cardLv = lv
      store.state.tech = testStatus.blade.base.tech
      store.state.genius = testStatus.blade.base.genius
      store.state.beauty = testStatus.blade.base.beauty
      store.state.theme = testStatus.blade.base.theme
      store.state.truth = testStatus.blade.base.truth
      expect(wrapper.vm.totalBaseStatus).to.eql(testStatus.blade.totalBase201_3)
    })

    it('adjusts values to 1 when result <= 0', () => {
      const [bungo, id, lv] = [1, 202, 3]
      store.state.bungo = bungo
      store.state.cardId = id
      store.state.cardLv = lv
      store.state.tech = testStatus.neg.base.tech
      store.state.genius = testStatus.neg.base.genius
      store.state.beauty = testStatus.neg.base.beauty
      store.state.theme = testStatus.neg.base.theme
      store.state.truth = testStatus.neg.base.truth
      expect(wrapper.vm.totalBaseStatus).to.eql(testStatus.neg.totalBase202_3)
    })
  })

  describe('computed: finalBattleStatus', () => {
    it('returns an empty object when totalBaseStatus is empty', () => {
      expect(wrapper.vm.finalBattleStatus).to.be.empty
    })

    it('returns a battle status object calculated from totalBaseStatus', () => {
      const [bungo, id, lv] = [1, 201, 3]
      store.state.bungo = bungo
      store.state.cardId = id
      store.state.cardLv = lv
      store.state.tech = testStatus.blade.base.tech
      store.state.genius = testStatus.blade.base.genius
      store.state.beauty = testStatus.blade.base.beauty
      store.state.theme = testStatus.blade.base.theme
      store.state.truth = testStatus.blade.base.truth
      expect(wrapper.vm.finalBattleStatus).to.eql(
        testStatus.blade.finalBattle201_3
      )
    })
  })

  describe('computed: increasedBattleStatus', () => {
    it('returns an empty object when bungo or cardId or cardLv is not set', () => {
      store.state.bungo = 2
      store.state.cardId = ''
      store.state.cardLv = ''
      expect(wrapper.vm.increasedBattleStatus).to.be.empty

      store.state.bungo = ''
      store.state.cardId = 101
      store.state.cardLv = ''
      expect(wrapper.vm.increasedBattleStatus).to.be.empty

      store.state.bungo = ''
      store.state.cardId = ''
      store.state.cardLv = 1
      expect(wrapper.vm.increasedBattleStatus).to.be.empty
    })

    it.skip("returns a battle status object calculated from card's status when baseStatus is not inputted", () => {
      const [bungo, id, lv] = [1, 201, 2]
      store.state.bungo = bungo
      store.state.cardId = id
      store.state.cardLv = lv
      expect(wrapper.vm.increasedBattleStatus).to.eql(
        expectedCardStatus[id].battle[lv]
      )
    })

    it('returns a diff of finalBattleStatus and inputtedBattleStatus when both are ready', () => {
      const [bungo, id, lv] = [1, 201, 3]
      store.state.bungo = bungo
      store.state.cardId = id
      store.state.cardLv = lv
      store.state.tech = testStatus.blade.base.tech
      store.state.genius = testStatus.blade.base.genius
      store.state.beauty = testStatus.blade.base.beauty
      store.state.theme = testStatus.blade.base.theme
      store.state.truth = testStatus.blade.base.truth
      expect(wrapper.vm.increasedBattleStatus).to.eql({
        atk:
          testStatus.blade.finalBattle201_3.atk - testStatus.blade.battle.atk,
        def:
          testStatus.blade.finalBattle201_3.def - testStatus.blade.battle.def,
        avd:
          testStatus.blade.finalBattle201_3.avd - testStatus.blade.battle.avd,
      })
    })
  })

  describe('DOM: copyStateTo buttons', () => {
    it('calls copyStateTo action with appropriate payload when clicked')
  })

  describe('methods: estimateCardStatus()', () => {
    const id = 102

    it('returns correct estimated value for unknown lv2 card status', () => {
      const result = wrapper.vm.estimateCardStatus(testCards[id].status, 2)
      expect(result).to.eql(expectedCardStatus[id].base[2])
    })

    it('returns correct estimated value for unknown lv3 card status', () => {
      const result = wrapper.vm.estimateCardStatus(testCards[id].status, 3)
      expect(result).to.eql(expectedCardStatus[id].base[3])
    })
  })

  describe('methods: calculateAtk()', () => {
    it('returns correct atk value for blade', () => {
      const result = wrapper.vm.calculateAtk('blade', testStatus.blade.base)
      expect(result).to.equal(testStatus.blade.battle.atk)
    })

    it('returns correct atk value for bow', () => {
      const result = wrapper.vm.calculateAtk('bow', testStatus.bow.base)
      expect(result).to.equal(testStatus.bow.battle.atk)
    })

    it('returns correct atk value for bow_alt', () => {
      const result = wrapper.vm.calculateAtk('bow_alt', testStatus.bow_alt.base)
      expect(result).to.equal(testStatus.bow_alt.battle.atk)
    })

    it('returns correct atk value for gun', () => {
      const result = wrapper.vm.calculateAtk('gun', testStatus.gun.base)
      expect(result).to.equal(testStatus.gun.battle.atk)
    })

    it('returns correct atk value for whip', () => {
      const result = wrapper.vm.calculateAtk('whip', testStatus.whip.base)
      expect(result).to.equal(testStatus.whip.battle.atk)
    })
  })

  describe('methods: calculateDef()', () => {
    it('returns correct def value for blade', () => {
      const result = wrapper.vm.calculateDef('blade', testStatus.blade.base)
      expect(result).to.equal(testStatus.blade.battle.def)
    })

    it('returns correct def value for bow', () => {
      const result = wrapper.vm.calculateDef('bow', testStatus.bow.base)
      expect(result).to.equal(testStatus.bow.battle.def)
    })

    it('returns correct def value for bow_alt', () => {
      const result = wrapper.vm.calculateDef('bow_alt', testStatus.bow_alt.base)
      expect(result).to.equal(testStatus.bow_alt.battle.def)
    })

    it('returns correct def value for gun', () => {
      const result = wrapper.vm.calculateDef('gun', testStatus.gun.base)
      expect(result).to.equal(testStatus.gun.battle.def)
    })

    it('returns correct def value for whip', () => {
      const result = wrapper.vm.calculateDef('whip', testStatus.whip.base)
      expect(result).to.equal(testStatus.whip.battle.def)
    })
  })

  describe('methods: calculateAvd()', () => {
    it('returns correct avd value for blade', () => {
      const result = wrapper.vm.calculateAvd('blade', testStatus.blade.base)
      expect(result).to.equal(testStatus.blade.battle.avd)
    })

    it('returns correct avd value for bow', () => {
      const result = wrapper.vm.calculateAvd('bow', testStatus.bow.base)
      expect(result).to.equal(testStatus.bow.battle.avd)
    })

    it('returns correct avd value for bow_alt', () => {
      const result = wrapper.vm.calculateAvd('bow_alt', testStatus.bow_alt.base)
      expect(result).to.equal(testStatus.bow_alt.battle.avd)
    })

    it('returns correct avd value for gun', () => {
      const result = wrapper.vm.calculateAvd('gun', testStatus.gun.base)
      expect(result).to.equal(testStatus.gun.battle.avd)
    })

    it('returns correct avd value for whip', () => {
      const result = wrapper.vm.calculateAvd('whip', testStatus.whip.base)
      expect(result).to.equal(testStatus.whip.battle.avd)
    })
  })
})
