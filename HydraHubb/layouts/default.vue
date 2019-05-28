<template>
  <v-app dark>
    
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    
    <v-tabs 
      fixed-tabs
      icons-and-text
      grow>
      <v-tab to="/">
        Home
        <v-icon>home</v-icon>
      </v-tab>
      <v-tab to="/subscriptions">
        Subscriptions
        <v-icon>subscriptions</v-icon>
      </v-tab>
      <v-tab to="/collections">
        Collections
        <v-icon>collections</v-icon>
      </v-tab>
      <v-tab to="/create">
        Create
        <v-icon>create</v-icon>
      </v-tab>
    </v-tabs>
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
