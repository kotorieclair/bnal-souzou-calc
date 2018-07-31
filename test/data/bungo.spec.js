import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import BngoSlot from '../../src/components/BngoSlot';
import testBungoData from '../testBungoData';
import bungoData from '../../src/data/bungo';

describe('data: bungo', () => {
  const wrapper = shallowMount(BngoSlot);

  it('should have correct weapon types for each bungo data', () => {
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
