<template>
  <div>
    <v-toolbar
      class="hello"
      :absolute="true"
      flat
      height="120"
    >
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
    <Todos class="todos white shadow" />
    <Feed v-if="isJoined && isSprint" class="feed bottom-right-panel shadow" />
    <Stats v-if="stats && isJoined && isBreak" class="bottom-right-panel feed shadow" />
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

<style lang="scss" scoped>
  .v-toolbar {
    left: 0;
    right: 0;
  }

  .theme--light .v-toolbar {
    background-color: rgba(#F8E9CC, .5);
  }

  .theme--light .bottom-right-panel {
    background-color: rgba(#FFFFFE, .7);
  }

  .theme--dark .v-toolbar, .bottom-right-panel {
    background-color: rgba(#0D0E16, .7);
  }

  .map {
    position: fixed;
    z-index: 0;
  }

  .join-btn {
    top: 150px;
    margin: auto;
  }

  .todos {
    position: fixed;
    left: 50px;
    bottom: 30px;
    width: 400px;
    z-index: 1;
  }

  .bottom-right-panel {
    position: absolute;
    right: 100px;
    bottom: 120px;
    width: 350px;
    z-index: 1;
  }

  .feed {
    height: 410px;
  }

  .shadow {
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.4);
  }
</style>
