import Vuex from 'vuex'
import { db } from '@/firebase/init.js'
import firebase from 'firebase'
import Cookie from 'js-cookie'

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
      },
      initAuth(vuexContext, req) {
        // we are checking if we are loading on client side or server side. if client then we are loading with cookies.
        // if there is no info stored in cookies then we just return
        if (req) {
          if (!req.headers.cookie) {
            return
          }
          // here we are retrieving user name cookie by splitting it up, finding it within array and using startWith to locate it.
          const usernameCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('username'))
          if (!usernameCookie) {
            return
          }
          const usernameC = usernameCookie.split('=')[1]

          const userIdCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('uid'))
          if (!userIdCookie) {
            return
          }
          const userIdC = userIdCookie.split('=')[1]
          vuexContext.commit('setUsername', usernameC)
          vuexContext.commit('setUser', userIdC)
        } else {
          const userId = localStorage.getItem('user-id')
          const username = localStorage.getItem('username')

          if (!userId) {
            return
          }
          vuexContext.commit('setUser', userId)
          vuexContext.commit('setUsername', username)
        }
      },
      currentUser() {
        const user = firebase.auth().currentUser
        console.log(user)
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
