<template>
  <ul>
    <li>
      <TodoInput @new-todo="post" />
    </li>
    <li v-for="(todo, i) in todos" :key="todo.id">
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
import {createTodo, doneTodo, readTodos, undoneTodo} from "@/api";

export default {
  name: "TodoList",
  components: { TodoInput, Todo },
  data() {
    return {
      todos: []
    }
  },
  methods: {
    async getAll() {
      try {
        const token = localStorage.getItem('token');
        this.todos = await readTodos(token);
      } catch (error) {
        console.error('Error fetching todos:', error);
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
    update(id, updatedTodo) {
      const index = this.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        this.todos.splice(index, 1, updatedTodo); // Directly replace the item in the array
      }
    }
  },
  created() {
    this.getAll();
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