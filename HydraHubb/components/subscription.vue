<template>
  <div class="subWrapper">
    <div 
      v-for="(grabSub,index) in grabSubs" 
      :key="index" 
      class="subscriptions">
      <h3>Subscriptions: {{ grabSub.subscriptions[0] }}</h3>
      <h3>Subscribers {{ grabSub.subscribers[0] }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    grabSubs() {
      return this.$store.state.userInfoSub
    }
  }
}
</script>
