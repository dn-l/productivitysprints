<template>
  <v-app :dark="true">
    <v-app-bar app color="primary" flat>
      <v-toolbar-title color="text">
        <router-link to="/">
          <Logo />
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <router-view name="topBarMiddle" />
      <v-spacer />
      <router-view name="topBarEnd" />
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Logo from './components/Logo'

export default {
  components: { Logo }
}
</script>
