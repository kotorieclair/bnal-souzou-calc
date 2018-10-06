import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import BngoSlot from '../../src/components/BngoSlot';
import Store from '../../src/store';
import testBungoData from '../testBungoData';
import { bungo, cards } from '../../src/data';

describe('data: bungo', () => {
  let wrapper;

  before(() => {
    Store.init({
      bungo,
      cards,
    });
    Store.add(1);

    wrapper = shallowMount(BngoSlot, {
      propsData: {
        order: 1,
      },
    });
  });

  after(() => {
    Store.destroy();
  });

  it('has correct weapon types for each bungo data', () => {
    Object.keys(bungo).forEach((id) => {
      const status = testBungoData[id].status;
      const weapon = bungo[id].weapon;
      const result = {
        atk: wrapper.vm.calculateAtk(weapon, status.base),
        def: wrapper.vm.calculateDef(weapon, status.base),
        avd: wrapper.vm.calculateAvd(weapon, status.base),
      };

      expect(result).to.eql(status.battle);
    });
  });
});
