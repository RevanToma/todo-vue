<template>
  <Base-title title="My Todos" />
  <div class="container">
    <form @submit.prevent="addNewTodo">
      <input type="text" v-model="newTodoTitle" placeholder="Add new todo" />
      <label :class="selectClass">Category</label>
      <select v-model="newTodoType" :class="selectClass">
        <option value="training" class="todo-type-training">Training</option>
        <option value="work" class="todo-type-work">Work</option>
        <option value="personal" class="todo-type-personal">Personal</option>
      </select>
      <button type="submit">Add</button>
    </form>
    <div v-if="loading">Loading...</div>
    <div v-if="error">An error occurred: {{ error.message }}</div>
    <div v-else-if="todos">
      <ul>
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @update:todo="handleUpdateTodo"
          @delete:todo="handleDeleteTodo"
          @toggle:completion="handleToggleCompletion"
        />
      </ul>
    </div>
    <div v-else>No data available</div>
  </div>
</template>

<script setup lang="ts">
import { useQuery, useMutation } from '@vue/apollo-composable'
import { ref, watchEffect, type Ref, computed } from 'vue'
import { GET_TODOS, REMOVE_TODO, UPDATE_TODO, ADD_TODO } from './../../mutations'
import { type Todo } from './../../types'
import TodoItem from './TodoItem.vue'
const { mutate: removeTodo } = useMutation(REMOVE_TODO, {
  refetchQueries: [{ query: GET_TODOS }]
})

const { mutate: updateTodo } = useMutation(UPDATE_TODO)

const { mutate: addTodo } = useMutation(ADD_TODO)

const handleUpdateTodo = async (updatedTodo: Todo) => {
  await updateTodo({ ...updatedTodo })
}

const handleDeleteTodo = async (id: string) => {
  await removeTodo({ id })
}
const handleToggleCompletion = async (updatedTodo: Todo) => {
  await updateTodo({ ...updatedTodo })
}
const addNewTodo = async () => {
  if (newTodoTitle.value.trim()) {
    const response = await addTodo({
      title: newTodoTitle.value,
      todoType: newTodoType.value
    })

    if (response?.data) {
      todos.value = [...todos.value!, response.data.addTodo]
    }
    newTodoTitle.value = ''
    newTodoType.value = 'training'
  }
}

const { result, loading, error } = useQuery(GET_TODOS)
const todos: Ref<Todo[] | null> = ref(null)
const newTodoTitle = ref('')
const newTodoType = ref('training')

const selectClass = computed(() => `todo-type-${newTodoType.value}`)

watchEffect(() => {
  if (result.value) {
    todos.value = result.value.getTodos
  }
})
</script>

<style>
.container {
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 5px;
}
select {
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  font-weight: bold;
}

ul {
  padding: 0;
}
label {
  border-radius: 0.5rem;
  padding: 0.5rem;
  text-align: center;
  color: black;
  font-weight: bold;
}
.todo-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem 0;
}

form {
  display: flex;
  gap: 1rem;
}
input {
  margin-right: 1rem;
  padding: 0.3rem;
  border-radius: 0.5rem;
  border: none;
}

.todo-type-training {
  background-color: #f0ad4e;
}
.todo-type-work {
  background-color: #5bc0de;
}
.todo-type-personal {
  background-color: #5cb85c;
}
.completedTask {
  text-decoration: line-through;
}
button {
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  width: 3.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
}
button:hover {
  background-color: #a09e9c;
}
</style>
