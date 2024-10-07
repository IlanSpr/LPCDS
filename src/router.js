import { createRouter, createWebHistory } from 'vue-router'
import PhaseTwo from './components/PhaseTwo.vue'
import ThemeTimer from './components/ThemeTimer.vue'
import PhaseThree from './components/PhaseThree.vue'
import HomePage from './components/HomePage.vue'
import AdminPage from './components/AdminPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/phase-two', component: PhaseTwo },
  { path: '/theme-timer/:category', component: ThemeTimer, name: 'ThemeTimer' },
  { path: '/phase-three', component: PhaseThree },
  { path: '/admin', component: AdminPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
