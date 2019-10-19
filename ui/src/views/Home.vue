<template>
  <div>
    <v-toolbar flat color="secondary" height="80">
      <v-spacer />
        <Timer />
      <v-spacer />
    </v-toolbar>
    <Map class="map" />
    <v-row v-if="!isJoined">
      <v-btn
        :loading="!currentState"
        :disabled="!currentState"
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
    <Feed v-if="isJoined && isSprint" class="bottom-right-panel feed v-card" />
    <Stats v-if="stats && isJoined && isBreak" class="bottom-right-panel feed v-card" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Timer from '../components/Timer'
import Todos from '../components/Todos'
import Feed from '../components/Feed'
import Stats from '../components/Stats'
import Map from '../components/Map'

export default {
  components: {
    Timer, Todos, Feed, Stats, Map
  },

  computed: {
    ...mapState(['currentState', 'stats']),
    ...mapGetters(['isSprint', 'isBreak', 'isJoined'])
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

  .bottom-right-panel {
    position: absolute;
    right: 40px;
    bottom: 40px;
    width: 450px;
    z-index: 1;
  }
</style>
