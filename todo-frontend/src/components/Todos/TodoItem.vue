<template>
  <li :class="`todo-type-${todo.todoType}`">
    <div v-if="isEditing">
      <input type="text" v-model="editableTitle" />
      <button @click="saveEdit">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
    <div v-else :class="[{ completedTask: todo.completed }, `todo-type todo-type-${todo.todoType}`]">
      <span>{{ todo.title }}</span>
      <button @click="edit">Edit</button>
      <button @click="deleteTodo">Delete</button>
      <input type="checkbox" v-model="localCompleted" @change="toggleCompletion" />
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type Todo } from './../../types'

const props = defineProps({
  todo: { type: Object as () => Todo, required: true }
})
const emit = defineEmits(['update:todo', 'delete:todo', 'toggle:completion'])

const isEditing = ref(false)
const editableTitle = ref('')
const localCompleted = ref(props.todo.completed)

const edit = () => {
  isEditing.value = true
  editableTitle.value = props.todo.title
}

const saveEdit = async () => {
  const updatedTodo = {
    ...props.todo,
    title: editableTitle.value
  }
  emit('update:todo', updatedTodo)
  isEditing.value = false
}
const cancelEdit = () => {
  isEditing.value = false
}

const deleteTodo = async () => {
  emit('delete:todo', props.todo.id)
}

const toggleCompletion = () => {
  const updatedTodo = {
    ...props.todo,
    completed: !props.todo.completed
  }
  emit('toggle:completion', updatedTodo)
}
</script>

<style>
.todo-type-training {
  background-color: #f0ad4e;
}
.todo-type-work {
  background-color: #5bc0de;
}
.todo-type-personal {
  background-color: #5cb85c;
}
span {
  width: 10em;
}
li {
  color: black;
  border-radius: 1rem;
  list-style: none;
}

.completedTask {
  text-decoration: line-through;
}
.todo-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 0.5rem 0;
}
</style>
