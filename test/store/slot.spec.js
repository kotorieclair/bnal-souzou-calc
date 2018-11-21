import { expect } from 'chai'
import { spy } from 'sinon'
import {
  mutations,
  mutationTypes,
  actions,
  actionTypes,
} from 'store/modules/slot'

describe('store: slot', () => {
  describe(`mutations: ${mutationTypes.SET_BUNGO}`, () => {
    it('sets state.bungo', () => {
      const state = {
        bungo: null,
      }
      mutations[mutationTypes.SET_BUNGO](state, { bungo: 1 })

      expect(state.bungo).to.equal(1)
    })
  })

  describe(`mutations: ${mutationTypes.SET_CARD_ID}`, () => {
    it('sets state.cardId', () => {
      const state = {
        cardLv: null,
      }
      mutations[mutationTypes.SET_CARD_ID](state, { cardId: 1 })

      expect(state.cardId).to.equal(1)
    })
  })

  describe(`mutations: ${mutationTypes.SET_CARD_LV}`, () => {
    it('sets state.cardLv', () => {
      const state = {
        cardLv: null,
      }
      mutations[mutationTypes.SET_CARD_LV](state, { cardLv: 1 })

      expect(state.cardLv).to.equal(1)
    })
  })

  describe(`mutations: ${mutationTypes.SET_BASE_STATUS}`, () => {
    it('sets correct baseStatus key in state', () => {
      const state = {
        tech: null,
        genius: null,
        beauty: null,
        theme: null,
        truth: null,
      }
      mutations[mutationTypes.SET_BASE_STATUS](state, {
        statusKey: 'tech',
        val: 1,
      })
      mutations[mutationTypes.SET_BASE_STATUS](state, {
        statusKey: 'genius',
        val: 10,
      })
      mutations[mutationTypes.SET_BASE_STATUS](state, {
        statusKey: 'beauty',
        val: 5,
      })
      mutations[mutationTypes.SET_BASE_STATUS](state, {
        statusKey: 'theme',
        val: 9,
      })
      mutations[mutationTypes.SET_BASE_STATUS](state, {
        statusKey: 'truth',
        val: 100,
      })

      expect(state).to.eql({
        tech: 1,
        genius: 10,
        beauty: 5,
        theme: 9,
        truth: 100,
      })
    })
  })

  describe(`mutations: ${mutationTypes.COPY_SLOT_TO}`, () => {
    it.skip('copies the slot store state to a given slot')
  })

  // describe(`actions: ${actionTypes.setBungo}`, () => {
  // })

  describe(`actions: ${actionTypes.setCardId}`, () => {
    it('commits with correct mutationType and payload', () => {
      const commit = spy()
      const state = {}

      actions[actionTypes.setCardId]({ commit, state }, 1)

      expect(commit.args[0]).to.eql([mutationTypes.SET_CARD_ID, { cardId: 1 }])
    })
  })
})
