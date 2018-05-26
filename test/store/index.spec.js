import { expect } from 'chai';
import Store from '../../src/store';

describe('store', () => {
  const store = Store.add(1);

  describe('methods: add', () => {
    it('should add a new slot store to master store list');
  });

  describe('methods: get', () => {
    it('should return an appropriate slot store');
  });

  describe('actions: setBungo', () => {
    it('should set given bungo to slot store');
  });

  describe('actions: setCardId', () => {
    it('should set given cardId to slot store');
  });

  describe('actions: setCardLv', () => {
    it('should set given cardLv to slot store');
  });

  describe('actions: setTech', () => {
    it('should set given tech to slot store');
  });

  describe('actions: setGenius', () => {
    it('should set given genius to slot store');
  });

  describe('actions: setBeauty', () => {
    it('should set given beauty to slot store');
  });

  describe('actions: setTheme', () => {
    it('should set given theme to slot store');
  });

  describe('actions: setTruth', () => {
    it('should set given truth to slot store');
  });

  describe('actions: copySlot', () => {
    it('should copy the slot store to given slot');
  });
});
