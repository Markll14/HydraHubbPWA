<template>
  <v-form
    ref="form"
    lazy-validation
  >
    <v-text-field
      v-model="email"
      label="Email"
      type="email"
      required
    />
    <v-text-field
      v-model="username"
      label="username"
      required
    />

    <v-text-field
      v-model="password"
      label="Password"
      required
    />
    <p v-if="feedback"> {{ feedback }}</p>
    <v-btn
      color="success"
      @click="auth()"
    >
      {{ isLogin ? "Login" : "SignUp" }}
    </v-btn>
    <v-btn
      color="warning"
      @click=" isLogin = !isLogin"
    >
      {{ isLogin ? "SignUp" : "Login" }}
    </v-btn>
  </v-form>
</template>

<script>
import Cookie from 'js-cookie'
import store from '@/store/index.js'
import slugify from 'slugify'
import firebase from 'firebase'
import { db } from '@/firebase/init.js'
export default {
  data() {
    return {
      isLogin: true,
      email: null,
      password: null,
      username: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    auth() {
      // If isLogin is true we go forward with signing in through firebase
      // We commit to our state then also use cookies to set our username and user id into cookies
      if (this.isLogin) {
        console.log('I am logging in ')
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            this.$store.commit('setUser', cred.user.uid)
            this.$store.commit('setUsername', this.username)
            Cookie.set('username', this.username)
            Cookie.set('uid', cred.user.uid)
            this.saveUserData(cred.user)
          })
          .then(() => {
            this.$router.push({ name: 'home' })
          })
          .catch(err => {
            this.feedback = err.message
          })
      } else {
        console.log('I am signing up!')
        // checking if username exists within our database
        // creates a user through email and password
        if (this.username && this.email && this.password) {
          this.slug = slugify(this.username, {
            replacement: '-',
            remove: /[$*_+~.()'"\-:@]/g,
            lower: false
          })
          // is creating a variable that stores slug then checks whether it exists, if it does we send feedback
          let ref = db.collection('users').doc(this.slug)
          ref.get().then(doc => {
            if (doc.exists) {
              this.feedback = 'This Username already exists'
            } else {
              console.log('I am signing up ')
              firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                  ref.set({
                    username: this.username,
                    user_id: cred.user.uid,
                    subscriptions: [],
                    subscribers: []
                  })
                  this.$store.commit('setUser', cred.user.uid)
                  this.$store.commit('setUsername', this.username)
                  Cookie.set('username', this.username)
                  Cookie.set('uid', cred.user.uid)
                  this.saveUserData(cred.user)
                })
                .then(() => {
                  const user = firebase.auth().currentUser
                  user.updateProfile({
                    displayName: this.username
                  })
                  this.$router.push({ name: 'Home' })
                })
                .catch(err => {
                  console.log(err)
                  // err is caught by catch and has a property called message
                  this.feedback = err.message
                })
            }
          })
        }
      }
    },
    saveUserData(info) {
      localStorage.setItem('user-id', info.uid)
      localStorage.setItem('email', this.email)
      localStorage.setItem('username', this.username)
    }
  }
}
</script>
