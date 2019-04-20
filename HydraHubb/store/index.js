import Vuex from 'vuex'
import { db } from '@/firebase/init.js'
import firebase from 'firebase'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedCards: [],
      user: null,
      username: null,
      token: null
    },
    mutations: {
      setCards(state, cards) {
        state.loadedCards = cards
      },
      setUser(state, payload) {
        state.user = payload
      },
      setUsername(state, payload) {
        state.username = payload
      },
      setToken(state, token) {
        state.token = token
      }
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
        let cards = []
        await db
          .collection('Assets')
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              cards.push(doc.data())
            })

            vuexContext.commit('setCards', cards)
          })
      },

      setCards(vuexContext, cards) {
        vuexContext.commit('setCards', cards)
      }
    },
    getters: {
      loadedCards(state) {
        return state.loadedCards
      },

      activeUser: (state, getters) => {
        return state.user
      }
    }
  })
}
export default createStore
