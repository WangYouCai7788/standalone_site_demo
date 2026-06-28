<template>
  <div class="contact-page">
    <section class="page-hero">
      <div class="container">
        <h1>Get In Touch</h1>
        <p>Interested in our products? Send us an inquiry and we'll get back to you within 24 hours.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="contact-layout">
          <div class="contact-form-wrap">
            <div v-if="submitted" class="success-message">
              <div class="success-icon">✓</div>
              <h3>Inquiry Submitted!</h3>
              <p>We have received your inquiry and will respond within 24 hours. We look forward to working with you!</p>
              <button class="btn btn-primary mt-2" @click="resetForm">Send Another Inquiry</button>
            </div>
            <form v-else @submit.prevent="handleSubmit" class="contact-form">
              <div v-if="selectedProduct" class="form-group">
                <label>Product of Interest</label>
                <input class="form-input" :value="selectedProduct.name" disabled />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="name">Your Name *</label>
                  <input id="name" v-model="form.name" class="form-input" placeholder="John Smith" required />
                </div>
                <div class="form-group">
                  <label for="company">Company Name</label>
                  <input id="company" v-model="form.company" class="form-input" placeholder="Your Company LLC" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="email">Email Address *</label>
                  <input id="email" v-model="form.email" type="email" class="form-input" placeholder="john@company.com" required />
                </div>
                <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input id="phone" v-model="form.phone" class="form-input" placeholder="+1 234 567 8900" />
                </div>
              </div>
              <div class="form-group">
                <label for="quantity">Estimated Quantity</label>
                <input id="quantity" v-model="form.quantity" class="form-input" placeholder="e.g. 1000 pcs" />
              </div>
              <div class="form-group">
                <label for="message">Message *</label>
                <textarea id="message" v-model="form.message" class="form-textarea" placeholder="Tell us about your requirements, target market, and any specific requests..." required></textarea>
              </div>
              <button type="submit" class="btn btn-accent">Submit Inquiry</button>
            </form>
          </div>
          <div class="contact-info">
            <div class="contact-card card">
              <h3>Contact Information</h3>
              <div class="contact-item">
                <span class="contact-label">Email</span>
                <span>info@sunshinetrade.com</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">Phone</span>
                <span>+86 755 8888 8888</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">WhatsApp</span>
                <span>+86 138 0000 0000</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">Address</span>
                <span>Futian District, Shenzhen, China</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">Working Hours</span>
                <span>Mon - Sat, 9:00 - 18:00 (GMT+8)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProductById } from '../data/products.js'

const route = useRoute()
const submitted = ref(false)

const selectedProduct = computed(() => {
  const pid = route.query.product
  return pid ? getProductById(pid) : null
})

const form = ref({
  name: '',
  company: '',
  email: '',
  phone: '',
  quantity: '',
  message: ''
})

function handleSubmit() {
  const inquiry = {
    id: Date.now(),
    date: new Date().toISOString(),
    product: selectedProduct.value ? selectedProduct.value.name : 'General Inquiry',
    ...form.value
  }
  const saved = JSON.parse(localStorage.getItem('inquiries') || '[]')
  saved.unshift(inquiry)
  localStorage.setItem('inquiries', JSON.stringify(saved))
  submitted.value = true
}

function resetForm() {
  form.value = { name: '', company: '', email: '', phone: '', quantity: '', message: '' }
  submitted.value = false
}
</script>

<style scoped>
.page-hero {
  background: var(--bg-gray);
  padding: 120px 0 60px;
  border-bottom: 1px solid var(--border);
}
.page-hero h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;
}
.page-hero p {
  color: var(--text-light);
  font-size: 16px;
  max-width: 500px;
}
.contact-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 48px;
  align-items: start;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.success-message {
  text-align: center;
  padding: 60px 40px;
}
.success-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--success);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 auto 20px;
}
.success-message h3 {
  font-size: 22px;
  margin-bottom: 12px;
}
.success-message p {
  color: var(--text-light);
  max-width: 400px;
  margin: 0 auto;
}
.contact-card {
  padding: 32px;
}
.contact-card h3 {
  font-size: 18px;
  margin-bottom: 24px;
}
.contact-item {
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}
.contact-item:last-child { border-bottom: none; }
.contact-label {
  display: block;
  font-weight: 600;
  font-size: 12px;
  color: var(--text-light);
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
@media (max-width: 768px) {
  .contact-layout { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .page-hero h1 { font-size: 28px; }
}
</style>
