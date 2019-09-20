<template>
  <div>
    <v-toolbar flat color="secondary">
      <v-spacer />
        <Timer />
      <v-spacer />
    </v-toolbar>
    <v-content>
    <Todos class="todos" />
    </v-content>
  </div>
</template>

<script>
import Timer from '../components/Timer'
import Todos from '../components/Todos'

export default {
  components: {
    Timer, Todos
  }
}
</script>

<style scoped>
  .todos {
    position: relative;
    left: 0rem;
    bottom: 0rem;
  }
</style>
