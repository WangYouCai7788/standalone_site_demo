<template>
  <div class="detail-page">
    <div v-if="!product" class="container section text-center text-light">
      <h2>Product not found</h2>
      <router-link to="/products" class="btn btn-primary mt-2">Back to Products</router-link>
    </div>
    <template v-else>
      <section class="page-hero">
        <div class="container">
          <router-link to="/products" class="back-link">&larr; Back to Products</router-link>
          <h1>{{ product.name }}</h1>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="detail-layout">
            <div class="detail-image">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="detail-info">
              <span class="badge badge-blue">{{ product.category }}</span>
              <p class="detail-desc">{{ product.description }}</p>
              <div class="detail-pricing">
                <div class="price-row">
                  <span class="price-label">FOB Price</span>
                  <span class="price-value">{{ product.fobPrice }}</span>
                </div>
                <div class="price-row">
                  <span class="price-label">MOQ</span>
                  <span class="price-value">{{ product.moq }} {{ product.moqUnit }}</span>
                </div>
              </div>
              <div class="detail-features">
                <h3>Key Features</h3>
                <ul>
                  <li v-for="f in product.features" :key="f">{{ f }}</li>
                </ul>
              </div>
              <router-link :to="'/contact?product=' + product.id" class="btn btn-accent">Send Inquiry</router-link>
            </div>
          </div>
          <div class="detail-specs">
            <h3>Specifications</h3>
            <table>
              <tr v-for="(val, key) in product.specs" :key="key">
                <td class="spec-key">{{ key }}</td>
                <td class="spec-val">{{ val }}</td>
              </tr>
            </table>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { getProductById } from '../data/products.js'

const route = useRoute()
const product = getProductById(route.params.id)
</script>

<style scoped>
.page-hero {
  background: var(--bg-gray);
  padding: 120px 0 40px;
  border-bottom: 1px solid var(--border);
}
.back-link {
  display: inline-block;
  font-size: 14px;
  margin-bottom: 16px;
  color: var(--text-light);
}
.back-link:hover { color: var(--primary); }
.page-hero h1 {
  font-size: 32px;
  font-weight: 700;
}
.detail-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}
.detail-image {
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--bg-gray);
}
.detail-image img {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
}
.detail-desc {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text);
  margin: 16px 0;
}
.detail-pricing {
  background: #f0f9ff;
  border-radius: var(--radius);
  padding: 20px;
  margin: 20px 0;
}
.price-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
}
.price-label {
  font-size: 14px;
  color: var(--text-light);
}
.price-value {
  font-weight: 700;
  color: var(--primary);
  font-size: 16px;
}
.detail-features {
  margin: 20px 0;
}
.detail-features h3 {
  font-size: 16px;
  margin-bottom: 12px;
}
.detail-features ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}
.detail-features li {
  font-size: 14px;
  padding-left: 18px;
  position: relative;
}
.detail-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--success);
  font-weight: 700;
}
.detail-specs {
  margin-top: 48px;
  padding: 32px;
  background: var(--bg-gray);
  border-radius: var(--radius);
}
.detail-specs h3 {
  font-size: 18px;
  margin-bottom: 20px;
}
.detail-specs table {
  width: 100%;
  border-collapse: collapse;
}
.detail-specs tr {
  border-bottom: 1px solid var(--border);
}
.detail-specs td {
  padding: 12px 16px;
  font-size: 14px;
}
.spec-key {
  font-weight: 600;
  width: 200px;
  color: var(--text);
}
.spec-val {
  color: var(--text-light);
}
@media (max-width: 768px) {
  .detail-layout { grid-template-columns: 1fr; gap: 24px; }
  .page-hero h1 { font-size: 24px; }
  .detail-features ul { grid-template-columns: 1fr; }
}
</style>
