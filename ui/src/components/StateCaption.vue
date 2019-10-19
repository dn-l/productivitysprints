<template>
  <h1 class="text-center">{{ caption }}</h1>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['currentState']),
    caption () {
      if (!this.currentState) {
        return '...'
      }
      if (this.currentState.name === 'sprint') {
        return 'Time left in sprint:'
      }
      return 'Take a break.'
    }
  }
}
</script>
