import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import BngoSlot from '../../src/components/BngoSlot';
import { testBungo, testCards, expectedCardStatus, testStatus } from '../testData';

describe('components: BngoSlot', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BngoSlot);
    wrapper.vm.bungoData = testBungo;
    wrapper.vm.cardsData = testCards;
    wrapper.setData({
      bungo: '',
      cardId: '',
      cardLv: '',
      tech: '',
      genius: '',
      beauty: '',
      theme: '',
      truth: '',
    });
  });

  describe('computed: adjustedCardStatus', () => {
    it('returns an empty object when either cardId or cardLv is not set', () => {
      wrapper.setData({
        cardId: '',
        cardLv: 1,
      });
      expect(wrapper.vm.adjustedCardStatus).to.be.empty;

      wrapper.setData({
        cardId: 101,
        cardLv: '',
      });
      expect(wrapper.vm.adjustedCardStatus).to.be.empty;
    });

    it('returns an object containing selected card status', () => {
      const [id, lv] = [201, 3];
      wrapper.setData({
        cardId: id,
        cardLv: lv,
      });
      expect(wrapper.vm.adjustedCardStatus).to.eql(testCards[id].status[lv]);
    });

    it('returns estimated card status when selected card\'s level status is null', () => {
      const [id, lv] = [101, 2];
      wrapper.setData({
        cardId: id,
        cardLv: lv,
      });
      expect(wrapper.vm.adjustedCardStatus).to.eql(expectedCardStatus[id].base[lv]);
    });
  });

  describe('computed: baseStatus', () => {
    it('returns an empty object when not all baseStatus data is inputted', () => {
      wrapper.setData({
        tech: 30,
        theme: 45,
      });
      expect(wrapper.vm.baseStatus).to.be.empty;
    });

    it('returns an object containig all baseStatus data', () => {
      const status = {
        tech: 30,
        genius: 32,
        beauty: 50,
        theme: 45,
        truth: 33,
      };
      wrapper.setData(status);
      expect(wrapper.vm.baseStatus).to.eql(status);
    });
  });

  describe('computed: inputtedBattleStatus', () => {
    it('returns an empty object when bungo is not set', () => {
      expect(wrapper.vm.inputtedBattleStatus).to.be.empty;
    });

    it('returns an empty object when baseStatus is not inputted', () => {
      expect(wrapper.vm.inputtedBattleStatus).to.be.empty;
    });

    it('returns a battle status object calculated from baseStatus', () => {
      wrapper.setData({
        bungo: 1,
        tech: testStatus.blade.base.tech,
        genius: testStatus.blade.base.genius,
        beauty: testStatus.blade.base.beauty,
        theme: testStatus.blade.base.theme,
        truth: testStatus.blade.base.truth,
      });
      expect(wrapper.vm.inputtedBattleStatus).to.eql(testStatus.blade.battle);
    });
  });

  describe('computed: totalBaseStatus', () => {
    it('returns an empty object when baseStatus is not inputted', () => {
      expect(wrapper.vm.totalBaseStatus).to.be.empty;
    });

    it('returns an empty object when adjustedCardStatus is not ready', () => {
      wrapper.setData({
        tech: 10,
        genius: 10,
        beauty: 10,
        theme: 10,
        truth: 10,
      });
      expect(wrapper.vm.totalBaseStatus).to.be.empty;
    });

    it('adds adjustedCardStatus to baseStatus', () => {
      const [bungo, id, lv] = [1, 201, 3];
      wrapper.setData({
        bungo,
        cardId: id,
        cardLv: lv,
        tech: testStatus.blade.base.tech,
        genius: testStatus.blade.base.genius,
        beauty: testStatus.blade.base.beauty,
        theme: testStatus.blade.base.theme,
        truth: testStatus.blade.base.truth,
      });
      expect(wrapper.vm.totalBaseStatus).to.eql(testStatus.blade.totalBase201_3);
    });

    it('adjusts values to 1 when result is less than or equal to 0', () => {
      const [bungo, id, lv] = [1, 202, 3];
      wrapper.setData({
        bungo,
        cardId: id,
        cardLv: lv,
        tech: testStatus.neg.base.tech,
        genius: testStatus.neg.base.genius,
        beauty: testStatus.neg.base.beauty,
        theme: testStatus.neg.base.theme,
        truth: testStatus.neg.base.truth,
      });
      expect(wrapper.vm.totalBaseStatus).to.eql(testStatus.neg.totalBase202_3);
    });
  });

  describe('computed: finalBattleStatus', () => {
    it('returns an empty object when totalBaseStatus is empty', () => {
      expect(wrapper.vm.finalBattleStatus).to.be.empty;
    });

    it('returns a battle status object calculated from totalBaseStatus', () => {
      const [bungo, id, lv] = [1, 201, 3];
      wrapper.setData({
        bungo,
        cardId: id,
        cardLv: lv,
        tech: testStatus.blade.base.tech,
        genius: testStatus.blade.base.genius,
        beauty: testStatus.blade.base.beauty,
        theme: testStatus.blade.base.theme,
        truth: testStatus.blade.base.truth,
      });
      expect(wrapper.vm.finalBattleStatus).to.eql(testStatus.blade.finalBattle201_3);
    });
  });

  describe('computed: increasedBattleStatus', () => {
    it('returns an empty object when bungo or cardId or cardLv is not set', () => {
      wrapper.setData({
        bungo: 2,
        cardId: '',
        cardLv: '',
      });
      expect(wrapper.vm.increasedBattleStatus).to.be.empty;

      wrapper.setData({
        bungo: '',
        cardId: 101,
        cardLv: '',
      });
      expect(wrapper.vm.increasedBattleStatus).to.be.empty;

      wrapper.setData({
        bungo: '',
        cardId: '',
        cardLv: 1,
      });
      expect(wrapper.vm.increasedBattleStatus).to.be.empty;
    });

    it.skip('returns a battle status object calculated from card\'s status when baseStatus is not inputted', () => {
      const [bungo, id, lv] = [1, 201, 2];
      wrapper.setData({
        bungo,
        cardId: id,
        cardLv: lv,
      });
      expect(wrapper.vm.increasedBattleStatus).to.eql(expectedCardStatus[id].battle[lv]);
    });

    it('returns a diff of finalBattleStatus and inputtedBattleStatus when both are ready', () => {
      const [bungo, id, lv] = [1, 201, 3];
      wrapper.setData({
        bungo,
        cardId: id,
        cardLv: lv,
        tech: testStatus.blade.base.tech,
        genius: testStatus.blade.base.genius,
        beauty: testStatus.blade.base.beauty,
        theme: testStatus.blade.base.theme,
        truth: testStatus.blade.base.truth,
      });
      expect(wrapper.vm.increasedBattleStatus).to.eql({
        atk: testStatus.blade.finalBattle201_3.atk - testStatus.blade.battle.atk,
        def: testStatus.blade.finalBattle201_3.def - testStatus.blade.battle.def,
        avd: testStatus.blade.finalBattle201_3.avd - testStatus.blade.battle.avd,
      });
    });
  });

  describe('methods: setInputtedValue()', () => {
    it('throws an error when unknown key is given', () => {
      expect(() => wrapper.vm.setInputtedValue('somekey', 'someval')).to.throw();
    });

    it('throws an error when unknown bungo is given', () => {
      expect(() => wrapper.vm.setInputtedValue('bungo', 'aaa')).to.throw();
      expect(() => wrapper.vm.setInputtedValue('bungo', null)).to.throw();
      expect(() => wrapper.vm.setInputtedValue('bungo', 200)).to.throw();
    });

    it('throws an error when unknown cardId is given', () => {
      expect(() => wrapper.vm.setInputtedValue('cardId', 'bbb')).to.throw();
      expect(() => wrapper.vm.setInputtedValue('cardId', null)).to.throw();
      expect(() => wrapper.vm.setInputtedValue('cardId', 1)).to.throw();
    });

    it('throws an error when unknown cardLv is given', () => {
      wrapper.setData({
        cardId: 301,
      });
      expect(() => wrapper.vm.setInputtedValue('cardLv', 'ccc')).to.throw();
      expect(() => wrapper.vm.setInputtedValue('cardLv', null)).to.throw();
      expect(() => wrapper.vm.setInputtedValue('cardLv', 1)).to.throw();

      wrapper.setData({
        cardId: 102,
      });
      expect(() => wrapper.vm.setInputtedValue('cardLv', 2)).not.to.throw();
    });

    it('throws an error when baseStatus payload is other than an object', () => {
      expect(() => wrapper.vm.setInputtedValue('baseStatus', '')).to.throw();
      expect(() => wrapper.vm.setInputtedValue('baseStatus', null)).to.throw();
      expect(() => wrapper.vm.setInputtedValue('baseStatus', 1)).to.throw();
    });

    it('throws an error when unknown baseStatus key is given', () => {
      expect(() => wrapper.vm.setInputtedValue('baseStatus', { somekey: 1 })).to.throw();
    });

    it('throws an error when baseStatus object value other than a number is given', () => {
      expect(() => wrapper.vm.setInputtedValue('baseStatus', { tech: 'someval' })).to.throw();
    });
  });

  describe('methods: estimateCardStatus()', () => {
    const id = 102

    it('returns correct estimated value for unknown lv2 card status', () => {
      const result = wrapper.vm.estimateCardStatus(testCards[id].status, 2);
      expect(result).to.eql(expectedCardStatus[id].base[2]);
    });

    it('returns correct estimated value for unknown lv2 card status', () => {
      const result = wrapper.vm.estimateCardStatus(testCards[id].status, 3);
      expect(result).to.eql(expectedCardStatus[id].base[3]);
    });
  });

  describe('methods: calculateAtk()', () => {
    it('returns correct atk value for blade', () => {
      const result = wrapper.vm.calculateAtk('blade', testStatus.blade.base);
      expect(result).to.equal(testStatus.blade.battle.atk);
    });

    it('returns correct atk value for bow', () => {
      const result = wrapper.vm.calculateAtk('bow', testStatus.bow.base);
      expect(result).to.equal(testStatus.bow.battle.atk);
    });

    it('returns correct atk value for bow_alt', () => {
      const result = wrapper.vm.calculateAtk('bow_alt', testStatus.bow_alt.base);
      expect(result).to.equal(testStatus.bow_alt.battle.atk);
    });

    it('returns correct atk value for gun', () => {
      const result = wrapper.vm.calculateAtk('gun', testStatus.gun.base);
      expect(result).to.equal(testStatus.gun.battle.atk);
    });

    it('returns correct atk value for whip', () => {
      const result = wrapper.vm.calculateAtk('whip', testStatus.whip.base);
      expect(result).to.equal(testStatus.whip.battle.atk);
    });

    it('returns correct atk value for alchemy', () => {
      const result = wrapper.vm.calculateAtk('alchemy', testStatus.alchemy.base);
      expect(result).to.equal(testStatus.alchemy.battle.atk);
    });

    it('returns correct atk value for fight', () => {
      const result = wrapper.vm.calculateAtk('fight', testStatus.fight.base);
      expect(result).to.equal(testStatus.fight.battle.atk);
    });
  });

  describe('methods: calculateDef()', () => {
    it('returns correct def value for blade', () => {
      const result = wrapper.vm.calculateDef('blade', testStatus.blade.base);
      expect(result).to.equal(testStatus.blade.battle.def);
    });

    it('returns correct def value for bow', () => {
      const result = wrapper.vm.calculateDef('bow', testStatus.bow.base);
      expect(result).to.equal(testStatus.bow.battle.def);
    });

    it('returns correct def value for bow_alt', () => {
      const result = wrapper.vm.calculateDef('bow_alt', testStatus.bow_alt.base);
      expect(result).to.equal(testStatus.bow_alt.battle.def);
    });

    it('returns correct def value for gun', () => {
      const result = wrapper.vm.calculateDef('gun', testStatus.gun.base);
      expect(result).to.equal(testStatus.gun.battle.def);
    });

    it('returns correct def value for whip', () => {
      const result = wrapper.vm.calculateDef('whip', testStatus.whip.base);
      expect(result).to.equal(testStatus.whip.battle.def);
    });

    it('returns correct def value for alchemy', () => {
      const result = wrapper.vm.calculateDef('alchemy', testStatus.alchemy.base);
      expect(result).to.equal(testStatus.alchemy.battle.def);
    });

    it('returns correct def value for fight', () => {
      const result = wrapper.vm.calculateDef('fight', testStatus.fight.base);
      expect(result).to.equal(testStatus.fight.battle.def);
    });
  });

  describe('methods: calculateAvd()', () => {
    it('returns correct avd value for blade', () => {
      const result = wrapper.vm.calculateAvd('blade', testStatus.blade.base);
      expect(result).to.equal(testStatus.blade.battle.avd);
    });

    it('returns correct avd value for bow', () => {
      const result = wrapper.vm.calculateAvd('bow', testStatus.bow.base);
      expect(result).to.equal(testStatus.bow.battle.avd);
    });

    it('returns correct avd value for bow_alt', () => {
      const result = wrapper.vm.calculateAvd('bow_alt', testStatus.bow_alt.base);
      expect(result).to.equal(testStatus.bow_alt.battle.avd);
    });

    it('returns correct avd value for gun', () => {
      const result = wrapper.vm.calculateAvd('gun', testStatus.gun.base);
      expect(result).to.equal(testStatus.gun.battle.avd);
    });

    it('returns correct avd value for whip', () => {
      const result = wrapper.vm.calculateAvd('whip', testStatus.whip.base);
      expect(result).to.equal(testStatus.whip.battle.avd);
    });

    it('returns correct avd value for alchemy', () => {
      const result = wrapper.vm.calculateAvd('alchemy', testStatus.alchemy.base);
      expect(result).to.equal(testStatus.alchemy.battle.avd);
    });

    it('returns correct avd value for fight', () => {
      const result = wrapper.vm.calculateAvd('fight', testStatus.fight.base);
      expect(result).to.equal(testStatus.fight.battle.avd);
    });
  });
});
