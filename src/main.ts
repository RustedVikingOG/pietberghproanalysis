import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './styles/main.css'

// Import route components
import Home from './views/HomeView.vue'
import About from './views/AboutView.vue'
import Services from './views/ServicesView.vue'
import Portfolio from './views/PortfolioView.vue'
import Testimonials from './views/TestimonialsView.vue'
import Contact from './views/ContactView.vue'

// Define routes
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/services', name: 'Services', component: Services },
  { path: '/portfolio', name: 'Portfolio', component: Portfolio },
  { path: '/testimonials', name: 'Testimonials', component: Testimonials },
  { path: '/contact', name: 'Contact', component: Contact },
]

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Create and mount app
const app = createApp(App)
app.use(router)
app.mount('#app')