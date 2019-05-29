<template>
  <div class="subWrapper">
    <h2>This is the Subscriptions page!</h2>
    <subscription/>
  </div>
  
</template>

<script>
import subscription from '@/components/subscription'
export default {
  middleware: 'check-auth',
  components: {
    subscription
  },
  data() {
    return {}
  }
}
</script>
