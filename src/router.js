import { createRouter, createWebHistory } from 'vue-router'
import PhaseTwo from './components/PhaseTwo.vue'
import ThemeTimer from './components/ThemeTimer.vue'
import PhaseThree from './components/PhaseThree.vue'
import DifficultySelection from './components/DifficultySelection.vue'
import QuestionDisplay from './components/QuestionDisplay.vue'
import HomePage from './components/HomePage.vue'
import AdminPage from './components/AdminPage.vue'

// Define the routes
const routes = [
  { path: '/', redirect: '/home' }, // Redirect from root to home
  { path: '/home', component: HomePage, name: 'HomePage' },
  { path: '/phase-two', component: PhaseTwo, name: 'PhaseTwo' },
  { path: '/theme-timer/:categoryName', component: ThemeTimer, name: 'ThemeTimer' },
  { path: '/phase-three', component: PhaseThree, name: 'PhaseThree' },
  { path: '/difficulty-selection', component: DifficultySelection, name: 'DifficultySelection' },
  { path: '/question-display', component: QuestionDisplay, name: 'QuestionDisplay' },
  { path: '/admin', component: AdminPage, name: 'AdminPage' }
]

// Create the router
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
