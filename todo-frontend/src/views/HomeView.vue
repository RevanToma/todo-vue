<template>
  <div :class="themeStore.theme">
    <TodoList />
    <div class="themeContainer">
      <button id="themeBtn" @click="changeTheme">Change theme</button>
      <span>current theme: {{ themeStore.theme }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/themeStore'
import TodoList from './../components/Todos/TodosList.vue'
const themeStore = useThemeStore()

const changeTheme = () => {
  themeStore.toggleTheme()
}
</script>

<style>
.harmony {
  background-color: #554800;
  padding: 1rem;
  border-radius: 1rem;
  position: relative;
}

.dark {
  padding: 1rem;
  border-radius: 1rem;
  position: relative;
}
.themeContainer {
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}
#themeBtn {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: 550;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
}
button:hover {
  background-color: #a09e9c;
}
span {
  text-align: center;
}
</style>
