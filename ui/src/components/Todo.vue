<template>
  <v-row
    no-gutters
    align="center"
    justify="space-between"
  >
    <v-col class="pa-0">
      <v-checkbox
        :class="todo.isCompleted ? 'red--text' : ''"
        v-model="isCompleted"
        :label="todo.text"
      />
    </v-col>
    <v-col class="col-auto">
      <v-btn @click="deleteTodo" text icon color="accent">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['todo'],
  methods: {
    deleteTodo () {
      this.$store.dispatch('deleteTodo', this.todo)
    }
  },
  computed: {
    isCompleted: {
      get () {
        return this.todo.isCompleted
      },
      set () {
        this.$store.dispatch('toggleComplete', this.todo)
      }
    }
  }
}
</script>

<style scoped>
</style>
