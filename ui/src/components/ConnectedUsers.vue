<template>
  <div>
    <h2 class="accent--text">{{ connectedUsersCount }}</h2>
    <h3>Sprinters working</h3>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['connectedUsersCount'])
  }
}
</script>
