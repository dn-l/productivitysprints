<template>
  <div class="container">
    <div class="pt-5 ps-5">
      <h4 class="font-weight-light">SPRINTER</h4>
      <h3>ACCOMPLISHMENT FEED</h3>
    </div>
    <v-row no-gutters>
      <v-col class="feed pa-3">
        <h2 class="accent--text text-center">...</h2>
        <div
          :style="{ opacity: 1 - ( index / 4) / 1 }"
          class="pa-3 text-center todo"
          v-for="({ text, id }, index) in feed"
          :key="id"
        >
          {{ text }}
        </div>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="text-center">
        <v-btn @click="toggleFeedMuted">
          {{ feedMuted ? 'Unmute' : 'Mute' }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['feed', 'feedMuted'])
  },
  methods: {
    ...mapActions(['toggleFeedMuted'])
  }
}
</script>

<style scoped>
  .container {
    height: 400px;
  }

  .feed {
    height: 250px;
    overflow-y: hidden;
  }

  .todo {
    text-decoration: line-through;
    overflow: hidden;
  }

</style>
