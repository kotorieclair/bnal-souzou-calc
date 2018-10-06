import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import { spy } from 'sinon'
import BngoSlotInput from '../../src/components/BngoSlotInput'
import Store from '../../src/store'
import starify from '../../src/filters/starify'
import {
  testBungo,
  testCards,
} from '../testData'

describe('components: BngoSlotInput', () => {
  let wrapper
  let store
  let spied

  before(() => {
    Store.init({
      bungo: testBungo,
      cards: testCards,
    })
  })

  beforeEach(() => {
    Store.add(1)
    wrapper = shallowMount(BngoSlotInput, {
      propsData: {
        order: 1,
        bungoData: testBungo,
        cardsData: testCards,
      },
      filters: { starify },
    })
    store = Store.get(1)
  })

  afterEach(() => {
    spied.restore()
    Store.delete(1)
  })

  after(() => {
    Store.destroy()
  })

  describe('DOM: bungo selector', () => {
    it('@change: calls setBungo action with selected bungo payload', () => {
      spied = spy(store.actions, 'setBungo')
      const el = wrapper.find({ ref: 'bungo' })
      el.element.value = '1'
      el.trigger('change')
      expect(spied.calledOnceWith(1)).to.be.true
    })
  })

  describe('DOM: cardId selector', () => {
    let el
    let spied2

    beforeEach(() => {
      spied = spy(store.actions, 'setCardId')
      spied2 = spy(store.actions, 'setCardLv')
      el = wrapper.find({ ref: 'cardId' })
      el.element.value = '101'
      el.trigger('change')
    })

    afterEach(() => {
      spied2.restore()
    })

    it('@change: calls setCardId action with selected cardId payload', () => {
      expect(spied.calledOnceWith(101)).to.be.true
    })

    it('@change: calls setCardLv action to adjust cardLv', () => {
      expect(spied2.calledOnceWith(1)).to.be.true

      el = wrapper.find({ ref: 'cardId' })
      el.element.value = '301'
      el.trigger('change')
      expect(spied2.secondCall.calledWith(3)).to.be.true
    })
  })

  describe('DOM: cardLv selector', () => {
    it('@change: calls setCardLv action with selected cardLv payload', () => {
      spied = spy(store.actions, 'setCardLv')
      store.state.cardId = 201

      const el = wrapper.find({ ref: 'cardLv' })
      el.element.value = '2'
      el.trigger('change')
      expect(spied.calledOnceWith(2)).to.be.true
    })
  })

  describe('DOM: baseStatus inputs', () => {
    it('@input: calls setBaseStatus action with inputted baseStatus payload', () => {
      spied = spy(store.actions, 'setBaseStatus')

      const el = wrapper.find({ ref: 'tech' })
      el.element.value = '78'
      el.trigger('input')
      expect(spied.firstCall.calledWith('tech', 78)).to.be.true

      el.element.value = ''
      el.trigger('input')
      expect(spied.secondCall.calledWith('tech', '')).to.be.true
    })
  })
})
