<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <div class="text-xs-center">
        
        <card/>
      </div>
      
    </v-flex>
  </v-layout>
</template>

<script>
import Card from '~/components/card.vue'

export default {
  components: {
    Card
  }
}
</script>
