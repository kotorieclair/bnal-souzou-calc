import { expect } from 'chai';
import { shallow } from '@vue/test-utils';
import BngoSlotInput from '../../src/components/BngoSlotInput';
import starify from '../../src/filters/starify';

describe('components: BngoSlotInput', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(BngoSlotInput, {
      propsData: {
        bungo: '',
        cardId: '',
        cardLv: '',
        tech: '',
        genius: '',
        beauty: '',
        theme: '',
        truth: '',
      },
      filters: { starify },
    });

  });

  describe('DOM: bungo selector', () => {
    it('@change: emits changeInputtedValue event with bungo payload', () => {
      const el = wrapper.find({ ref: 'bungo' });
      el.element.value = '1';
      el.trigger('change');

      const payloads = wrapper.emitted().changeInputtedValue[0];
      expect(payloads[0]).to.equal('bungo');
      expect(payloads[1]).to.equal(1);
    });
  });

  describe('DOM: cardId selector', () => {
    let el;
    beforeEach(() => {
      el = wrapper.find({ ref: 'cardId' });
      el.element.value = '1001';
      el.trigger('change');
    });

    it('@change: emits changeInputtedValue event with cardId payload', () => {
      const payloads = wrapper.emitted().changeInputtedValue[0];
      expect(payloads[0]).to.equal('cardId')
      expect(payloads[1]).to.equal(1001);
    });

    it('@change: emits changeInputtedValue event which adjusts cardlv', () => {
      const payloads = wrapper.emitted().changeInputtedValue[1];
      expect(payloads[0]).to.equal('cardLv');
      expect(payloads[1]).to.equal(1);

      el = wrapper.find({ ref: 'cardId' });
      el.element.value = '1014';
      el.trigger('change');
      const payloads2 = wrapper.emitted().changeInputtedValue[3];
      expect(payloads2[0]).to.equal('cardLv');
      expect(payloads2[1]).to.equal(3);
    });
  });

  describe('DOM: cardLv selector', () => {
    it('@change: emits changeInputtedValue event with cardLv payload', () => {
      wrapper.setProps({
        cardId: 1001,
      });

      const el = wrapper.find({ ref: 'cardLv' });
      el.element.value = '2';
      el.trigger('change');

      const payloads = wrapper.emitted().changeInputtedValue[0];
      expect(payloads[0]).to.equal('cardLv');
      expect(payloads[1]).to.equal(2);
    });
  });

  describe('DOM: baseStatus inputs', () => {
    it('@input: emits changeInputtedValue event with baseStatus key payload', () => {
      const el = wrapper.find({ ref: 'tech' });
      el.element.value = '78';
      el.trigger('input');

      const payloads = wrapper.emitted().changeInputtedValue[0];
      expect(payloads[0]).to.equal('tech');
      expect(payloads[1]).to.equal(78);

      el.element.value = '';
      el.trigger('input');

      const payloads2 = wrapper.emitted().changeInputtedValue[1];
      expect(payloads2[0]).to.equal('tech');
      expect(payloads2[1]).to.equal('');
    });
  });
});
