import { expect } from 'chai';
import { shallow } from '@vue/test-utils';
import BngoSlotInput from '../../src/components/BngoSlotInput';
import starify from '../../src/filters/starify';

describe('components: BngoSlotInput', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(BngoSlotInput, {
      propsData: {
        bungo: 1,
        cardId: '',
        cardLv: '',
        baseStatus: {},
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
    it('@change: emits changeInputtedValue event with baseStatus payload', () => {
      const tech = wrapper.find({ ref: 'tech' });
      tech.element.value = '10';
      tech.trigger('input');
      const payloads1 = wrapper.emitted().changeInputtedValue[0];
      expect(payloads1[0]).to.equal('baseStatus');
      expect(payloads1[1]).to.eql({ tech: 10 });

      wrapper.setProps({
        baseStatus: {
          tech: 10,
        },
      });

      const beauty = wrapper.find({ ref: 'beauty' });
      beauty.element.value = '36';
      beauty.trigger('input');
      const payloads2 = wrapper.emitted().changeInputtedValue[1];
      expect(payloads2[0]).to.equal('baseStatus');
      expect(payloads2[1]).to.eql({ tech: 10, beauty: 36 });
    });

    it('@change: emits changeInputtedValue event without payload when inputted value is deleted', () => {
      wrapper.setProps({
        baseStatus: {
          tech: 10,
          beauty: 36,
          theme: 40,
        },
      });
      const theme = wrapper.find({ ref: 'theme' });
      theme.element.value = '';
      theme.trigger('input');

      const payloads = wrapper.emitted().changeInputtedValue[0];
      expect(payloads[0]).to.equal('baseStatus');
      expect(payloads[1]).to.eql({ tech: 10, beauty: 36 });
    });
  });
});
