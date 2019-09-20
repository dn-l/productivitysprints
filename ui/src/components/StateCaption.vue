<template>
  <div v-if="currentState">
    <h1 v-if="currentState.name === 'sprint'">Time left in sprint:</h1>
    <h1 v-if="currentState.name === 'break'">Take a break.</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['currentState'])
  }
}
</script>
