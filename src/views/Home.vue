<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="container hero-content">
        <h1 class="hero-title">Your Reliable Sourcing Partner in China</h1>
        <p class="hero-desc">Professional supplier of consumer electronics since 2020. OEM/ODM services, quality assurance, competitive pricing.</p>
        <div class="hero-actions">
          <router-link to="/products" class="btn btn-accent">Browse Products</router-link>
          <router-link to="/contact" class="btn btn-outline-white">Send Inquiry</router-link>
        </div>
      </div>
    </section>
    <!-- Features -->
    <section class="section" style="background: var(--bg-gray);">
      <div class="container">
        <h2 class="section-title">Why Choose Us</h2>
        <p class="section-subtitle">We combine manufacturing expertise with export professionalism to deliver the best value for your business.</p>
        <div class="features-grid">
          <div class="feature-card card">
            <div class="feature-icon">★</div>
            <h3>Quality Assurance</h3>
            <p>Strict QC process from raw materials to finished products. CE, FCC, ROHS certified.</p>
          </div>
          <div class="feature-card card">
            <div class="feature-icon">★</div>
            <h3>OEM/ODM Service</h3>
            <p>Custom branding, packaging, and specifications to meet your market needs.</p>
          </div>
          <div class="feature-card card">
            <div class="feature-icon">★</div>
            <h3>Competitive Pricing</h3>
            <p>Factory-direct prices with flexible MOQ options for startups and enterprises alike.</p>
          </div>
        </div>
      </div>
    </section>
    <!-- Featured Products -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Featured Products</h2>
        <p class="section-subtitle">Explore our best-selling consumer electronics with competitive pricing and fast delivery.</p>
        <div class="grid-4">
          <div v-for="product in featuredProducts" :key="product.id" class="product-card card" @click="$router.push('/products/' + product.id)">
            <div class="product-img">
              <img :src="product.image" :alt="product.name" loading="lazy" />
            </div>
            <div class="product-info">
              <span class="badge badge-blue">{{ product.category }}</span>
              <h3>{{ product.name }}</h3>
              <p class="product-price">FOB: {{ product.fobPrice }}</p>
              <p class="product-moq">MOQ: {{ product.moq }} {{ product.moqUnit }}</p>
            </div>
          </div>
        </div>
        <div class="text-center mt-2">
          <router-link to="/products" class="btn btn-outline">View All Products</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { products } from '../data/products.js'
const featuredProducts = products.slice(0, 4)
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--bg-dark) 0%, #1e3a8a 100%);
  min-height: 70vh;
  display: flex;
  align-items: center;
  padding: 120px 0 80px;
}
.hero-content {
  text-align: left;
}
.hero-title {
  font-size: 48px;
  font-weight: 800;
  color: white;
  line-height: 1.2;
  margin-bottom: 20px;
  max-width: 700px;
}
.hero-desc {
  font-size: 18px;
  color: #94a3b8;
  max-width: 550px;
  margin-bottom: 32px;
  line-height: 1.7;
}
.hero-actions {
  display: flex;
  gap: 16px;
}
.btn-outline-white {
  background: transparent;
  color: white;
  border: 2px solid rgba(255,255,255,0.3);
}
.btn-outline-white:hover {
  border-color: white;
  background: rgba(255,255,255,0.1);
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.feature-card {
  padding: 32px;
  text-align: center;
}
.feature-icon {
  font-size: 28px;
  color: var(--accent);
  margin-bottom: 16px;
}
.feature-card h3 {
  font-size: 18px;
  margin-bottom: 10px;
}
.feature-card p {
  color: var(--text-light);
  font-size: 14px;
  line-height: 1.7;
}
.product-card {
  cursor: pointer;
}
.product-img {
  height: 220px;
  overflow: hidden;
}
.product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.product-card:hover .product-img img {
  transform: scale(1.05);
}
.product-info {
  padding: 16px;
}
.product-info h3 {
  font-size: 15px;
  margin: 8px 0;
  line-height: 1.4;
}
.product-price {
  font-weight: 600;
  color: var(--primary);
  font-size: 14px;
}
.product-moq {
  font-size: 12px;
  color: var(--text-light);
  margin-top: 4px;
}
@media (max-width: 768px) {
  .hero-title { font-size: 32px; }
  .hero { min-height: 60vh; padding: 100px 0 60px; }
  .hero-actions { flex-direction: column; }
  .btn-outline-white { text-align: center; }
  .features-grid { grid-template-columns: 1fr; }
}
</style>
