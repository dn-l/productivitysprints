<template>
  <v-container class="container ma-0">
    <v-row class="secondary--background">
      <v-col>
        <h1 class="text-center">How productive were you?</h1>
      </v-col>
    </v-row>
    <v-row class="secondary--background">
      <v-col>
        <v-slider
          color="accent"
          step="10"
          v-model="productivity"
          thumb-label="always"
        />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="text-center">
        <v-btn
          color="accent"
          x-large
          @click="submit"
        >
          Submit
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    const todos = this.$store.state.todos
    const completedCount = todos.filter(({ isCompleted }) => isCompleted).length
    return {
      productivity: Math.round(completedCount * 100 / todos.length)
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('socketEmitSubmitProductivity', this.productivity)
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
  .row {
    height: 200px;
    align-items: center;
  }

  .row.secondary--background {
    background-color: var(--v-secondary-base);
  }

  .container {
    max-width: 100%;
  }
</style>
