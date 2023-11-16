import './assets/main.css'

import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import { DefaultApolloClient } from '@vue/apollo-composable'

import App from './App.vue'
import router from './router'
import BaseTitle from './components/Base/BaseTitle.vue'
import apolloClient from './apollo-client'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.component('Base-title', BaseTitle)

app.use(createPinia())
app.use(router)

app.mount('#app')
