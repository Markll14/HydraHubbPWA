<template>
  <div class="cardWrapper">
    <div 
      v-for="(card,index) in cards" 
      :key="index" 
      class="container-link" >
      <div class="card">
        <video 
          v-if="card.type == 'Video'" 
          :src="card.imageurl[0]" 
          class="card__video" 
          @click="playPause" />
        <img 
          v-if="card.type=='Image'|| 'image/jpeg'" 
          :src="card.imageurl[0]" 
          class="card__image" 
          alt="Image">
        <nuxt-link 
          :to="'/' + card.slug" 
          class="card__info">
          <h3 class="card__info--title"> {{ card.title }} </h3>
        </nuxt-link>
        <h5 
          class="card__info--author"><nuxt-link :to="'/users/' + card.authors">Authors: {{ card.authors }}</nuxt-link></h5>
        <p class="card__info--desc"> {{ card.description }} </p>
                        
      </div>
    </div>
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

<style lang='scss' scoped>
@import '../assets/style/variables.scss';

.cardWrapper {
  height: 100vh;
  width: 100vw;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}

.card {
  width: 30rem;
  border-radius: 1rem;

  transition: all 0.3s;

  &__image {
    width: 100%;
    height: 60%;
    box-sizing: border-box;
    border-radius: 0.3rem;
  }

  &__video {
    width: 100%;
    height: 60%;

    box-sizing: border-box;
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    &--title {
      font-size: 1.8rem;
    }

    &--author {
      font-size: 1.5rem;
    }

    &--desc {
      font-size: 1.3rem;
    }

    &--icons {
    }
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: $prime-box-shadow-big;
  }
}

i {
  transition: all 0.2s;
  cursor: pointer;
}
i:hover {
  transform: scale(1.2);
}

.icon {
  font-size: 2rem;
  cursor: pointer;
}

.edit {
  &:hover {
    color: rgb(125, 250, 250);
  }
}
</style>
