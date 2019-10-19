<template>
  <v-app>
    <v-app-bar app color="primary" flat height="100">
      <v-toolbar-title color="text" class="side-block">
        <v-btn icon width="65" height="65" @click="toggleTheme">
          <Logo style="height: 48.14; width: 53.3;"/>
        </v-btn>
      </v-toolbar-title>
      <div class="flex-grow-1">
        <router-view name="topBarMiddle" />
      </div>
      <div class="side-block">
        <v-row no-gutters>
          <v-spacer />
          <router-view name="topBarEnd" />
        </v-row>
      </div>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Logo from './components/Logo'
import { mapState } from 'vuex'

export default {
  components: { Logo },

  created () {
    this.$vuetify.theme.dark = this.darkTheme
  },

  computed: {
    ...mapState(['darkTheme'])
  },

  methods: {
    toggleTheme () {
      this.$store.commit('toggleTheme')
      this.$vuetify.theme.dark = this.darkTheme
    }
  }
}
</script>

<style scoped>
  .side-block {
    width: 400px;
  }

  #app.v-application {
    background-color: var(--v-primary-base);
  }
</style>
