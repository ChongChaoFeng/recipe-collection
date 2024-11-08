import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SavedRecipePage from '@/views/SavedRecipePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/recipe/saved',
      name: 'My Saved Recipe',
      component: SavedRecipePage,
    },
  ],
})

export default router
