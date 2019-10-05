<template>
  <MglMap :accessToken="accessToken" :mapStyle="mapStyle" />
</template>

<script>
import Mapbox from 'mapbox-gl'
import { MglMap } from 'vue-mapbox'

export default {
  components: {
    MglMap
  },
  data () {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN
    }
  },
  computed: {
    mapStyle () {
      return this.$store.state.darkTheme
        ? process.env.VUE_APP_MAPBOX_STYLE_DARK
        : process.env.VUE_APP_MAPBOX_STYLE_LIGHT
    }
  },

  created () {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox
  }
}
</script>

<style lang="scss">
  @import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css");
</style>
