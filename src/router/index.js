import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import ProductDetail from '../views/ProductDetail.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Quotation from '../views/Quotation.vue'
import AdminDashboard from '../views/admin/Dashboard.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'Products', component: Products },
  { path: '/products/:id', name: 'ProductDetail', component: ProductDetail },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/quote', name: 'Quotation', component: Quotation },
  { path: '/admin', name: 'Admin', component: AdminDashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
