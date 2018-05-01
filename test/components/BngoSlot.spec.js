import { expect } from 'chai';
import { shallow } from '@vue/test-utils';
import BngoSlot from '../../src/components/BngoSlot';
import { testBungo, testCards, expectedCardStatus, testStatus } from '../testData';

describe('components: BngoSlot', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(BngoSlot);
    wrapper.vm.bungoData = testBungo;
    wrapper.vm.cardsData = testCards;
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

    it('returns estimated card status when selected card\'s lv.2 status is null', () => {
      const [id, lv] = [101, 2];
      wrapper.setData({
        cardId: id,
        cardLv: lv,
      });
      expect(wrapper.vm.adjustedCardStatus).to.eql(expectedCardStatus[id].base[lv]);
    });
  });

  describe('computed: inputtedBattleStatus', () => {
    it('returns an empty object when inputted baseStatus is empty', () => {
      wrapper.setData({
        baseStatus: {}
      });
      expect(wrapper.vm.inputtedBattleStatus).to.be.empty;
    });

  });

  describe('computed: totalBaseStatus', () => {
    it('returns an empty object when baseStatus is not inputted', () => {
      wrapper.setData({
        baseStatus: {},
      });
      expect(wrapper.vm.totalBaseStatus).to.be.empty;
    });

    it('returns an empty object when either bungo or cardId or cardLv is not set', () => {
      wrapper.setData({
        bungo: 2,
        cardId: '',
        cardLv: '',
      });
      expect(wrapper.vm.totalBaseStatus).to.be.empty;

      wrapper.setData({
        bungo: '',
        cardId: '',
        cardLv: 1,
      });
      expect(wrapper.vm.totalBaseStatus).to.be.empty;

      wrapper.setData({
        bungo: '',
        cardId: 101,
        cardLv: '',
      });
      expect(wrapper.vm.totalBaseStatus).to.be.empty;
    });

    it('adds adjustedCardStatus to the inputted baseStatus when baseStatus is inputted');

    // it('adds adjustedCardStatus to the selected bungo\'s default base status', () => {
    //   const [bungo, id, lv] = [1, 201, 2];
    //   wrapper.setData({
    //     bungo,
    //     cardId: id,
    //     cardLv: lv,
    //   });
    //   const card = testCards[id].status[lv];
    //   // const defaults = wrapper.vm.defaultBaseStatus;
    //   const defaults = testBungo[bungo].status;
    //   const expected = {
    //     tech: defaults.tech,
    //     genius: defaults.genius + card.genius,
    //     beauty: defaults.beauty,
    //     theme: defaults.theme + card.theme,
    //     truth: defaults.truth,
    //   }
    //
    //   expect(wrapper.vm.totalBaseStatus).to.eql(expected);
    // });
  });

  describe('computed: finalBattleStatus', () => {
    it('returns an empty object when totalBaseStatus is empty', () => {
      expect(wrapper.vm.finalBattleStatus).to.be.empty;
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

    it('returns a battle status object calculated from card\'s status when baseStatus is not inputted', () => {
      const [bungo, id, lv] = [1, 201, 2];
      wrapper.setData({
        bungo,
        cardId: id,
        cardLv: lv,
      });
      expect(wrapper.vm.increasedBattleStatus).to.eql(expectedCardStatus[id].battle[lv]);
    });

    it('returns a diff of finalBattleStatus and inputtedBattleStatus when both are ready');
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
        cardId: 101,
      });
      expect(() => wrapper.vm.setInputtedValue('cardLv', 'ccc')).to.throw();
      expect(() => wrapper.vm.setInputtedValue('cardLv', null)).to.throw();
      expect(() => wrapper.vm.setInputtedValue('cardLv', 2)).to.throw();
    });
  });

  describe('methods: estimateLv2CardStatus()', () => {
    it('returns correct estimated value for unknown lv2 card status', () => {
      const testCard = {
        1: { tech: 96, beauty: 30 },
        2: null,
        3: { tech: 192, beauty: 60 },
      };
      const result = wrapper.vm.estimateLv2CardStatus(testCard);
      expect(result).to.eql({ tech: 135, beauty: 42 });
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
  });


});
