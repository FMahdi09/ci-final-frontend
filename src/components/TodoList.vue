<template>
  <ul>
    <li>
      <TodoInput @new-todo="post" />
    </li>
    <li v-for="(todo, i) in sortedTodos" :key="todo.id">
      <Todo :todo="todo"
            @done="done"
            @undone="undone"
      />
    </li>
  </ul>
</template>

<script>
import Todo from "@/components/Todo.vue";
import TodoInput from "@/components/TodoInput.vue";
import {createTodo, doneTodo, readTodos, undoneTodo, updateTodos} from "@/api";
import posthog from 'posthog-js';
// Uncomment the following line for feature-toggle
//import posthog from 'posthog-js';

export default {
  name: "TodoList",
  components: { TodoInput, Todo },
  data() {
    return {
      todos: [],
      // Uncomment the following line for feature-toggle
      //toggleSort: posthog.getFeatureFlag('sort-todos-by-date') === 'enabled'
      // Delete the following line
      toggleSort: posthog.isFeatureEnabled('ci-sorting')
    }
  },
  computed: {
    sortedTodos() {
      if (this.toggleSort) {
        return [...(this.todos || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      return this.todos || [];
    }
  },
  methods: {
    async getAll() {
      try {
        const token = localStorage.getItem('token');
        const todos = await readTodos(token);
        this.todos = Array.isArray(todos) ? todos : [];
      } catch (error) {
        console.error('Error fetching todos:', error);
        this.todos = [];
      }
    },
    async post(name) {
      try {
        const token = localStorage.getItem('token');
        const todo = await createTodo(name, token);
        this.todos.push(todo);
      } catch (error) {
        console.error('Error creating todo:', error);
      }
    },
    async done(id) {
      try {
        const token = localStorage.getItem('token');
        const updatedTodo = await doneTodo(id, token);
        this.update(id, updatedTodo);
      } catch (error) {
        console.error('Error marking todo as done:', error);
      }
    },
    async undone(id) {
      try {
        const token = localStorage.getItem('token');
        const updatedTodo = await undoneTodo(id, token);
        this.update(id, updatedTodo);
      } catch (error) {
        console.error('Error marking todo as undone:', error);
      }
    },
    async updateTodos() {
      try {
        const token = localStorage.getItem('token');
        await updateTodos(token);
        await this.getAll();
      } catch (error) {
        console.error('Error updating todos:', error);
      }
    },
    update(id, updatedTodo) {
      const index = this.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        this.todos.splice(index, 1, updatedTodo); // Directly replace the item in the array
      }
    }
  },
  created() {
    this.getAll();
    if (this.toggleSort) {
      this.updateTodos();
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
</style>