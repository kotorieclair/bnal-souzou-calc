import { expect } from 'chai';
import Store from '../../src/store';
import { testBungo, testCards } from '../testData';

describe('store', () => {
  let store;

  before(() => {
    Store.init({
      bungo: testBungo,
      cards: testCards,
    });
    store = Store.add(1);
  });

  after(() => {
    Store.destroy();
  });

  describe('methods: add', () => {
    let store2;

    before(() => {
      store2 = Store.add(2);
    });

    it('adds a new slot store with appropriate keys', () => {
      expect(store2).to.have.property('state');
      expect(store2).to.have.property('actions');
    });

    it('adds a new slot store with appropriate state keys', () => {
      expect(store2.state).to.have.all.keys('bungo', 'cardId', 'cardLv', 'tech', 'genius', 'beauty', 'theme', 'truth');
    });
  });

  describe('methods: get', () => {
    it('throws an error when unknown slodId is given', () => {
      expect(() => Store.get(100)).to.throw();
    });

    it('returns a given slot store', () => {
      const store2 = Store.get(2);
      expect(store2).to.have.property('state');
      expect(store2).to.have.property('actions');
    });
  });

  describe('actions: setBungo', () => {
    it('throws an error when unknown bungo is given', () => {
      expect(() => store.actions.setBungo('aaa')).to.throw();
      expect(() => store.actions.setBungo(null)).to.throw();
      expect(() => store.actions.setBungo(200)).to.throw();
    });

    it('sets given bungo to slot store', () => {
      store.actions.setBungo(1);
      expect(store.state.bungo).to.equal(1);
    });
  });

  describe('actions: setCardId', () => {
    it('throws an error when unknown cardId is given', () => {
      expect(() => store.actions.setCardId('aaa')).to.throw();
      expect(() => store.actions.setCardId(null)).to.throw();
      expect(() => store.actions.setCardId(1)).to.throw();
    });

    it('sets given cardId to slot store', () => {
      store.actions.setCardId(101);
      expect(store.state.cardId).to.equal(101);
    });
  });

  describe('actions: setCardLv', () => {
    it('throws an error when before cardId is set', () => {
      const store2 = Store.get(2);
      expect(() => store2.actions.setCardLv(2)).to.throw();
    });

    it('throws an error when unknown cardLv is given', () => {
      store.actions.setCardId(301);
      expect(() => store.actions.setCardLv('aaa')).to.throw();
      expect(() => store.actions.setCardLv(null)).to.throw();
      expect(() => store.actions.setCardLv(1)).to.throw();

      store.actions.setCardId(102);
      expect(() => store.actions.setCardLv(2)).not.to.throw();
    });

    it('sets given cardLv to slot store', () => {
      store.actions.setCardLv(3);
      expect(store.state.cardLv).to.equal(3);
    });
  });

  describe('actions: setBaseStatus', () => {
    it('throws an error when tech other than a number is given', () => {
      expect(() => store.actions.setBaseStatus('tech', 'aaa')).to.throw();
      expect(() => store.actions.setBaseStatus('beauty', null)).to.throw();
    });

    it.skip('throws an error when tech less than 1 is given', () => {
      expect(() => store.actions.setBaseStatus('genius', 0)).to.throw();
      expect(() => store.actions.setBaseStatus('theme', -10)).to.throw();

      expect(() => store.actions.setBaseStatus('truth', 1)).not.to.throw();
    });

    it('sets given baseStatus val to slot store', () => {
      store.actions.setBaseStatus('tech', 500);
      expect(store.state.tech).to.equal(500);

      store.actions.setBaseStatus('genius', 60);
      expect(store.state.genius).to.equal(60);

      store.actions.setBaseStatus('beauty', 400);
      expect(store.state.beauty).to.equal(400);

      store.actions.setBaseStatus('theme', 88);
      expect(store.state.theme).to.equal(88);

      store.actions.setBaseStatus('truth', 330);
      expect(store.state.truth).to.equal(330);
    });
  });

  describe('actions: copyStateTo', () => {
    it('throws an error when given slotId is not set', () => {
      expect(() => store.actions.copyStateTo(100)).to.throw();
    });

    it('copies the slot store state to a given slot', () => {
      store.actions.copyStateTo(2);
      expect(Store.get(2).state).to.eql(Store.get(1).state);
    });
  });
});
