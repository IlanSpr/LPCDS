import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/home') // Redirection to /home
  } else {
    next()
  }
})

app.use(router)
app.mount('#app')
