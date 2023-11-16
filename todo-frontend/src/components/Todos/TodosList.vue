<template>
  <Base-title title="My Todos" />
  <div v-if="loading">Loading...</div>
  <div v-if="error">An error occurred: {{ error.message }}</div>
  <div v-else-if="todos">
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{ todo.title }}</li>
    </ul>
  </div>
  <div v-else>No data available</div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable'
import { ref, watchEffect } from 'vue'
import gql from 'graphql-tag'

const GET_TODOS = gql`
  query getTodos {
    getTodos {
      id
      title
      completed
    }
  }
`

const { result, loading, error } = useQuery(GET_TODOS)
const todos = ref(null)

watchEffect(() => {
  if (result.value) {
    todos.value = result.value.getTodos
  }
})
</script>
