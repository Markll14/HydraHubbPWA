<template>
  <div class="slugWrapper">
    <h1>this is {{ $route.params.slug }}</h1>
    <div 
      v-for="(card,index) in cards" 
      :key="index" 
      class="card" >
      <video 
        v-if="card.type == 'Video'" 
        :src="card.imageurl[0]" 
        class="card__video" 
        @click="playPause" />
      <img 
        v-if="card.type=='Image'|| 'image/jpeg'" 
        :src="card.imageurl[0]" 
        class="card__image" 
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testCard: []
    }
  },
  computed: {
    cards() {
      return this.$store.state.loadedCards.filter(card => {
        return card.slug == this.$route.params.slug
      })
    }
  },

  methods: {
    playPause(event) {
      const myVideo = event.target
      if (myVideo.paused) {
        myVideo.play()
      } else {
        myVideo.pause()
      }
    }
  }
}
</script>
