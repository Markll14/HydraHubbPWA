<template>
  <div class="cardWrapper">
    <v-card 
      v-for="(card,index) in cards" 
      :key="index">
      <v-img 
        v-if="card.type=='Image'"
        :src="card.imageurl[0]"
        class="white--text"
        height="200px"
      >
        <video 
          v-if="card.type == 'Video'" 
          :src="card.imageurl[0]" 
          class="card-video" 
          height="200px" 
          @click="playPause"/>
        <v-container 
          fill-height 
          fluid>
          <v-layout fill-height>
            <v-flex 
              xs12 
              align-end 
              flexbox>
              <span class="headline">Top 10 Australian beaches</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
      <v-card-title>
        <div>
          <span class="grey--text">Number 10</span><br>
          <span>Whitehaven Beach</span><br>
          <span>Whitsunday Island, Whitsunday Islands</span>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn 
          flat 
          color="orange">Share</v-btn>
        <v-btn 
          flat 
          color="orange">Explore</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import store from '@/store/index.js'
export default {
  components: {
    store
  },
  data() {
    return {
      testCards: []
    }
  },
  computed: {
    cards() {
      return this.$store.state.loadedCards
    }
  },
  created() {
    // this.$store.state.loadedCards.forEach(doc => {
    //   this.testCards.push(doc)
    // })
    console.log(this.cards)
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

<style lang='css' scoped>
.cardWrapper {
  height: 100vh;
  width: 100vw;
}
</style>
