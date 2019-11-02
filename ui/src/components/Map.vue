<template>
  <MglMap
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    :renderWorldCopies="false"
    :interactive="false"
  >
    <MglGeojsonLayer
      layerId="heatmap"
      sourceId="heatmap"
      :source="heatmapSource"
      :layer="heatmapLayer"
    />
  </MglMap>
</template>

<script>
import Mapbox from 'mapbox-gl'
import { MglMap, MglGeojsonLayer } from 'vue-mapbox'
import { mapState } from 'vuex'

export default {
  components: {
    MglMap, MglGeojsonLayer
  },

  data () {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN
    }
  },

  computed: {
    ...mapState(['darkTheme', 'joined', 'connectedUsers']),
    mapStyle () {
      return this.darkTheme
        ? process.env.VUE_APP_MAPBOX_STYLE_DARK
        : process.env.VUE_APP_MAPBOX_STYLE_LIGHT
    },
    heatmapSource () {
      const { idle = [], joined = [] } = this.connectedUsers
      const lls = [...idle, ...joined]
      return {
        data: {
          type: 'FeatureCollection',
          features: lls.filter(ll => ll).map(coordinates => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: coordinates.reverse()
            }
          }))
        }
      }
    },
    heatmapLayer () {
      const dark = [
        0, 'rgba(0,0,0,0)',
        0.2, '#713882',
        0.4, '#953482',
        0.8, '#D5147D'
      ]
      const light = [
        0, 'rgba(0,0,0,0)',
        0.1, '#E3DCE6',
        0.5, '#CCC9DC',
        1, '#A8AECD'
      ]
      const current = this.darkTheme ? dark : light

      return {
        type: 'heatmap',
        paint: {
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            ...current
          ]
        }
      }
    }
  },

  created () {
    this.mapbox = Mapbox
  }
}
</script>

<style lang="scss">
  @import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css");
</style>
