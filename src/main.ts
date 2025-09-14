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
  { path: '/portfolio/:id', name: 'PortfolioDetail', component: Portfolio, props: true },
  { path: '/testimonials', name: 'Testimonials', component: Testimonials },
  { path: '/contact', name: 'Contact', component: Contact },
]

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      // Handle anchor links with a small delay to ensure components are rendered
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth',
            top: 100
          })
        }, 100)
      })
    } else {
      return { top: 0 }
    }
  }
})

// Create and mount app
const app = createApp(App)
app.use(router)
app.mount('#app')