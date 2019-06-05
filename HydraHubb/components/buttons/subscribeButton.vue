<template>
  <v-btn 
    small 
    color="primary" 
    class="subButton"
    @click="subSystem">
    {{ isSubbed ? 'Unsubscribe' : 'Subscribe' }}
  </v-btn>
</template>

<script>
import { db } from '@/firebase/init.js'
import * as firebase from 'firebase'
export default {
  data() {
    return {}
  },
  computed: {
    isSubbed() {
      let usernameRoute = this.$route.params.username
      return this.$store.state.userInfoSub[0].subscriptions.includes(
        usernameRoute
      )
    }
  },
  methods: {
    subSystem() {
      let subRef = db.collection('users').doc(this.$store.state.username)
      if (this.isSubbed) {
        subRef
          .update({
            subscriptions: firebase.firestore.FieldValue.arrayRemove(
              this.$route.params.username
            )
          })
          .then(() => {
            console.log('we have Unsubscribed successfully!!')
          })
      } else {
        subRef
          .update({
            subscriptions: firebase.firestore.FieldValue.arrayUnion(
              this.$route.params.username
            )
          })
          .then(() => {
            console.log('we have updated successfully!!')
          })
      }
    }
  }
}
</script>
