<template>
  <div>
    <v-toolbar flat color="secondary" height="80">
      <v-spacer />
        <Timer />
      <v-spacer />
    </v-toolbar>
    <Map class="map" />
    <v-row v-if="!joined">
      <v-btn
        color="#B2327A"
        dark
        x-large
        class="join-btn"
        @click="onJoinClick"
      >
        Join
      </v-btn>
    </v-row>
    <Todos class="todos v-card" />
    <Feed v-if="joined && isSprint" class="feed" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Timer from '../components/Timer'
import Todos from '../components/Todos'
import Feed from '../components/Feed'
import Map from '../components/Map'

export default {
  components: {
    Timer, Todos, Feed, Map
  },

  computed: {
    ...mapState(['joined']),
    ...mapGetters(['isSprint'])
  },

  methods: {
    ...mapActions(['join', 'socketEmitJoin']),
    onJoinClick () {
      this.join()
      this.socketEmitJoin()
    }
  }
}
</script>

<style scoped>
  .map {
    position: fixed;
    z-index: 0;
  }

  .join-btn {
    top: 20px;
    margin: auto;
  }

  .todos {
    position: fixed;
    left: 10px;
    bottom: 10px;
    width: 450px;
    z-index: 1;
  }

  .feed {
    position: fixed;
    right: 40px;
    bottom: 40px;
    width: 450px;
    height: 400px;
    z-index: 1;
  }
</style>
