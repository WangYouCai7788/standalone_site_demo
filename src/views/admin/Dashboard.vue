<template>
  <div class="admin-page">
    <section class="page-hero">
      <div class="container">
        <h1>Admin Dashboard</h1>
        <p>Manage your products and view customer inquiries.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="admin-nav">
          <button class="filter-btn" :class="{ active: tab === 'inquiries' }" @click="tab = 'inquiries'">
            Inquiries
            <span v-if="inquiries.length" class="badge badge-blue">{{ inquiries.length }}</span>
          </button>
          <button class="filter-btn" :class="{ active: tab === 'products' }" @click="tab = 'products'">
            Products
          </button>
        </div>
        <!-- Inquiries Tab -->
        <div v-if="tab === 'inquiries'">
          <div v-if="inquiries.length === 0" class="text-center text-light" style="padding:60px 0;">
            No inquiries yet. Share your site with customers!
          </div>
          <div v-else class="inquiries-list">
            <div v-for="inquiry in inquiries" :key="inquiry.id" class="inquiry-card card" :class="{ unread: true }">
              <div class="inquiry-header">
                <div>
                  <strong>{{ inquiry.name }}</strong>
                  <span v-if="inquiry.company"> - {{ inquiry.company }}</span>
                </div>
                <span class="inquiry-date">{{ formatDate(inquiry.date) }}</span>
              </div>
              <div class="inquiry-body">
                <div class="inquiry-meta">
                  <span><strong>Email:</strong> {{ inquiry.email }}</span>
                  <span v-if="inquiry.phone"><strong>Phone:</strong> {{ inquiry.phone }}</span>
                  <span><strong>Product:</strong> {{ inquiry.product }}</span>
                  <span v-if="inquiry.quantity"><strong>Qty:</strong> {{ inquiry.quantity }}</span>
                </div>
                <p class="inquiry-message">{{ inquiry.message }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Products Tab -->
        <div v-if="tab === 'products'">
          <div class="admin-toolbar">
            <button class="btn btn-primary btn-sm" @click="showAddForm = true">+ Add Product</button>
          </div>
          <div v-if="showAddForm" class="add-form card">
            <h3>Add New Product</h3>
            <form @submit.prevent="addProduct">
              <div class="form-row">
                <div class="form-group">
                  <label>Product Name</label>
                  <input v-model="newProduct.name" class="form-input" required />
                </div>
                <div class="form-group">
                  <label>Product Name (Chinese)</label>
                  <input v-model="newProduct.nameCn" class="form-input" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Category</label>
                  <select v-model="newProduct.category" class="form-select">
                    <option value="audio">Audio</option>
                    <option value="charging">Charging</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>FOB Price Range</label>
                  <input v-model="newProduct.fobPrice" class="form-input" placeholder="$5.00 - $8.00" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>MOQ</label>
                  <input v-model="newProduct.moq" type="number" class="form-input" />
                </div>
                <div class="form-group">
                  <label>MOQ Unit</label>
                  <input v-model="newProduct.moqUnit" class="form-input" placeholder="pcs" />
                </div>
              </div>
              <div class="form-group">
                <label>Image URL</label>
                <input v-model="newProduct.image" class="form-input" placeholder="https://..." />
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea v-model="newProduct.description" class="form-textarea" required></textarea>
              </div>
              <div class="form-actions">
                <button type="submit" class="btn btn-primary btn-sm">Save Product</button>
                <button type="button" class="btn btn-outline btn-sm" @click="showAddForm = false">Cancel</button>
              </div>
            </form>
          </div>
          <div class="grid-4 mt-2">
            <div v-for="product in sortedProducts" :key="product.id" class="admin-product-card card">
              <div class="admin-product-img">
                <img :src="product.image" :alt="product.name" />
              </div>
              <div class="admin-product-info">
                <span class="badge badge-blue">{{ product.category }}</span>
                <h4>{{ product.name }}</h4>
                <p class="text-light">FOB: {{ product.fobPrice }} | MOQ: {{ product.moq }}{{ product.moqUnit }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { products as defaultProducts } from '../../data/products.js'

const tab = ref('inquiries')
const showAddForm = ref(false)

// Inquiries from localStorage
const inquiries = ref([])
function loadInquiries() {
  try {
    inquiries.value = JSON.parse(localStorage.getItem('inquiries') || '[]')
  } catch { inquiries.value = [] }
}
loadInquiries()

// Products: combine defaults with custom
const customProducts = ref([])
function loadProducts() {
  try {
    customProducts.value = JSON.parse(localStorage.getItem('customProducts') || '[]')
  } catch { customProducts.value = [] }
}
loadProducts()

const sortedProducts = computed(() => {
  return [...defaultProducts, ...customProducts.value]
})

// Add new product
const newProduct = ref({
  name: '', nameCn: '', category: 'audio', fobPrice: '',
  moq: 500, moqUnit: 'pcs', image: '', description: ''
})

function addProduct() {
  const item = {
    id: Date.now(),
    ...newProduct.value,
    moq: Number(newProduct.value.moq),
    features: [],
    specs: {}
  }
  const saved = JSON.parse(localStorage.getItem('customProducts') || '[]')
  saved.unshift(item)
  localStorage.setItem('customProducts', JSON.stringify(saved))
  customProducts.value = saved
  showAddForm.value = false
  newProduct.value = { name: '', nameCn: '', category: 'audio', fobPrice: '', moq: 500, moqUnit: 'pcs', image: '', description: '' }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}
</script>

<style scoped>
.page-hero {
  background: var(--bg-gray);
  padding: 120px 0 40px;
  border-bottom: 1px solid var(--border);
}
.page-hero h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}
.page-hero p { color: var(--text-light); font-size: 15px; }
.admin-nav {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
}
.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border: 1px solid var(--border);
  background: white;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text);
}
.filter-btn:hover { border-color: var(--primary); color: var(--primary); }
.filter-btn.active { background: var(--primary); color: white; border-color: var(--primary); }
.filter-btn.active .badge-blue { background: rgba(255,255,255,0.2); color: white; }
.inquiries-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.inquiry-card {
  border-left: 3px solid var(--primary-light);
}
.inquiry-card.unread {
  border-left-color: var(--primary);
}
.inquiry-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px 8px;
}
.inquiry-date {
  font-size: 12px;
  color: var(--text-light);
}
.inquiry-body {
  padding: 0 20px 16px;
}
.inquiry-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 13px;
  color: var(--text-light);
  margin-bottom: 12px;
}
.inquiry-message {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text);
  background: var(--bg-gray);
  padding: 12px 16px;
  border-radius: 6px;
}
.admin-toolbar {
  margin-bottom: 24px;
}
.add-form {
  padding: 24px;
  margin-bottom: 24px;
  background: #f0f9ff;
  border: 1px solid #bfdbfe;
}
.add-form h3 {
  font-size: 18px;
  margin-bottom: 20px;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}
.admin-product-card {
  cursor: default;
}
.admin-product-img {
  height: 180px;
  overflow: hidden;
}
.admin-product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.admin-product-info {
  padding: 12px 16px;
}
.admin-product-info h4 {
  font-size: 14px;
  margin: 6px 0;
}
.admin-product-info p {
  font-size: 12px;
}
@media (max-width: 768px) {
  .form-row { grid-template-columns: 1fr; }
  .page-hero h1 { font-size: 26px; }
}
</style>
