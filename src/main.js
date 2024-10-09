import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/home') // Redirection vers /home
  } else {
    next()
  }
})

app.use(router)
app.mount('#app')
