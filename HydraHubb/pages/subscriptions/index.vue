<template>
  <div class="subWrapper">
    <h2>This is the Subscriptions page!</h2>
    <div 
      v-for="(userInfoSub,index) in userInfoSubs" 
      :key="index" 
      class="subscriptions"/>
    <h3>Subscriptions: {{ userInfoSub.subscriptions }}</h3>
  </div>
  
</template>

<script>
import { db } from '@/firebase/init'
export default {
  data() {
    return {
      userInfoSubs: []
    }
  },
  created() {
    var userRef = db.collection('users')
    var query = userRef
      .where('user_id', '==', this.$store.state.user)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data())
          this.userInfoSubs.push(doc.data())
        })
      })
  }
}
</script>
