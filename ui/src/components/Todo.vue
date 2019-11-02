<template>
  <v-row
    no-gutters
    align="center"
    justify="space-between"
  >
    <v-col>
      <v-checkbox
        light
        :class="todo.isCompleted ? 'red--text' : ''"
        v-model="isCompleted"
        :label="todo.text"
        :disabled="isCompleted || !isJoined || !isSprint"
      />
    </v-col>
    <v-col class="col-auto">
      <v-btn
        v-if="!isCompleted"
        @click="deleteTodo"
        icon
        color="accent"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['todo'],

  methods: {
    deleteTodo () {
      this.$store.dispatch('deleteTodo', this.todo)
    }
  },

  computed: {
    ...mapGetters(['isJoined', 'isSprint']),
    isCompleted: {
      get () {
        return this.todo.isCompleted
      },
      set () {
        this.$store.dispatch('setCompleted', this.todo)
        this.$store.dispatch('socketEmitCompleted', this.todo.text)
      }
    }
  }
}
</script>

<style scoped>
</style>
