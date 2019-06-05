<template>
  <div class="userWrapper">
    <h1>THIS IS your page {{ $route.params.username }}</h1>
    <subButton/>
    <card/>
  </div>
</template>

<script>
import subButton from '@/components/buttons/subscribeButton'
import card from '@/components/card.vue'
import store from '@/store/index'
import { db } from '@/firebase/init'
export default {
  components: {
    store,
    db,
    card,
    subButton
  },
  data() {
    return {
      userAssets: []
    }
  },
  created() {
    var assetsRef = db.collection('Assets')
    var query = assetsRef
      .where('user', '==', this.$store.state.user)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data())
          this.userAssets.push(doc.data())
        })
      })
  }
}
</script>
