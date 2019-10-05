<template>
  <v-container class="pt-0">
    <v-row>
      <v-col class="accent">
        <h2 class="text-center white--text">
          MY SPRINT TASKS
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="mb-0 pb-0">
        <form v-on:submit="submitTodo" v-on:submit.prevent>
          <v-text-field
            label="New task (enter to submit)"
            :disabled="todos.length >= 10"
            v-model.trim="newTodo"
            outlined
            rounded
            single-line
            hide-details
            color="accent"
          />
        </form>
      </v-col>
    </v-row>
    <v-row class="ps-2 overflow-y-auto todo-list">
      <v-col class="ma-0">
        <Todo v-if="randomTodo" :todo="randomTodo" />
        <Todo
          v-else
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="col-auto">
        <v-btn
          :disabled="!incompletedTodos.length"
          color="accent"
          @click="toggleRandomTodo"
          width="180"
        >
          {{ randomTodo ? 'show all' : 'choose for me' }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Todo from './Todo'
import { mapState } from 'vuex'

export default {
  components: { Todo },

  data: () => ({
    newTodo: '',
    randomTodo: undefined
  }),

  computed: {
    ...mapState(['todos']),
    incompletedTodos () {
      return this.todos.filter(({ isCompleted }) => !isCompleted)
    }
  },

  methods: {
    submitTodo () {
      this.newTodo && this.$store.dispatch('addTodo', { text: this.newTodo })
      this.newTodo = ''
    },
    toggleRandomTodo () {
      if (this.randomTodo) {
        this.randomTodo = undefined
        return
      }
      const { incompletedTodos } = this
      this.randomTodo = incompletedTodos[Math.floor(Math.random() * incompletedTodos.length)]
    }
  }
}
</script>

<style scoped>
  .todo-list {
    height: 400px;
  }

  .container {
    background-color: var(--v-primary-base);
  }
</style>
