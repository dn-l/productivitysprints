<template>
  <v-card class="todos" width="30rem" height="40rem">
    <v-container class="pt-1">
      <v-row>
        <v-col class="accent">
          <h2 class="text-center header">MY SPRINT TASKS</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <form v-on:submit="submitTodo" v-on:submit.prevent>
            <v-text-field
              placeholder="New task (enter to submit)"
              :disabled="todos.length >= 10"
              v-model.trim="newTodo" type="text"
            />
          </form>
        </v-col>
      </v-row>
      <v-row no-gutters class="overflow-y-auto todo-list">
        <v-col>
          <Todo
            v-for="todo in todos"
            :key="todo.id"
            class="todo-item"
            :todo="todo"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="accent">Choose for me</v-btn>
        </v-col>
      </v-row>
  </v-container>
  </v-card>
</template>

<script>
import Todo from './Todo'
import { mapState } from 'vuex'

export default {
  components: { Todo },
  data: () => ({
    newTodo: ''
  }),
  computed: {
    ...mapState(['todos'])
  },
  methods: {
    submitTodo () {
      this.newTodo && this.$store.dispatch('addTodo', { text: this.newTodo })
      this.newTodo = ''
    }
  }
}
</script>

<style scoped>
  .header {
    color: #FFFFFE;
  }

  .todo-list {
    height: 25rem;
  }

  /* .todo-item {
    height: 3rem;
  } */
</style>
