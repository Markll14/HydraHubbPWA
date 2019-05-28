<template>
  
  <div class="text-xs-center">
        
    <card/>
  </div>
      
    
</template>

<script>
import Card from '~/components/card.vue'

export default {
  middleware: 'check-auth',
  name: 'Home',
  components: {
    Card
  }
}
</script>
