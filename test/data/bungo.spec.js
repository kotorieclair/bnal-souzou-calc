import { expect } from 'chai';
import { shallow } from '@vue/test-utils';
import BngoSlot from '../../src/components/BngoSlot';
import testBungoData from '../testBungoData';
import bungoData from '../../src/data/bungo';

describe('data: bungo', () => {
  let wrapper;

  before(() => {
    Store.init({
      bungo: testBungo,
      cards: testCards,
    });
    Store.add(1);

    wrapper = shallow(BngoSlot, {
      propsData: {
        order: 1,
      },
    });
  });

  it('has correct weapon types for each bungo data', () => {
    Object.keys(bungoData).forEach((id) => {
      const status = testBungoData[id].status;
      const weapon = bungoData[id].weapon;
      const result = {
        atk: wrapper.vm.calculateAtk(weapon, status.base),
        def: wrapper.vm.calculateDef(weapon, status.base),
        avd: wrapper.vm.calculateAvd(weapon, status.base),
      };

      expect(result).to.eql(status.battle);
    });
  });
});
