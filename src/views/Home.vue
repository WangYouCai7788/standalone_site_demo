<template>
  <div>
    <section class="hero">
      <div class="container hero-content">
        <h1 class="hero-title">{{ isZh ? '您在中国的可靠采购伙伴' : 'Your Reliable Sourcing Partner in China' }}</h1>
        <p class="hero-desc">{{ isZh ? '自2020年至今的专业消费电子供应商。OEM/ODM服务、质量保证、有竞争力的价格。' : 'Professional supplier of consumer electronics since 2020. OEM/ODM services, quality assurance, competitive pricing.' }}</p>
        <div class="hero-actions">
          <router-link to="/products" class="btn btn-accent">{{ isZh ? '浏览产品' : 'Browse Products' }}</router-link>
          <router-link to="/contact" class="btn btn-outline-white">{{ isZh ? '发送询盘' : 'Send Inquiry' }}</router-link>
        </div>
      </div>
    </section>
    <section class="section" style="background: var(--bg-gray);">
      <div class="container">
        <h2 class="section-title">{{ isZh ? '为什么选择我们' : 'Why Choose Us' }}</h2>
        <p class="section-subtitle">{{ isZh ? '我们将制造经验与出口专业知识相结合，为您的业务提供最佳价值。' : 'We combine manufacturing expertise with export professionalism to deliver the best value for your business.' }}</p>
        <div class="features-grid">
          <div class="feature-card card">
            <div class="feature-icon">★</div>
            <h3>{{ isZh ? '质量保证' : 'Quality Assurance' }}</h3>
            <p>{{ isZh ? '从原材料到成品的严格质检流程。CE、FCC、ROHS认证。' : 'Strict QC process from raw materials to finished products. CE, FCC, ROHS certified.' }}</p>
          </div>
          <div class="feature-card card">
            <div class="feature-icon">★</div>
            <h3>{{ isZh ? 'OEM/ODM 服务' : 'OEM/ODM Service' }}</h3>
            <p>{{ isZh ? '定制品牌、包装和规格，满足您的市场需求。' : 'Custom branding, packaging, and specifications to meet your market needs.' }}</p>
          </div>
          <div class="feature-card card">
            <div class="feature-icon">★</div>
            <h3>{{ isZh ? '有竞争力的价格' : 'Competitive Pricing' }}</h3>
            <p>{{ isZh ? '工厂直供价格，灵活的起订量，适合初创企业和大型企业。' : 'Factory-direct prices with flexible MOQ options for startups and enterprises alike.' }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ isZh ? '推荐产品' : 'Featured Products' }}</h2>
        <p class="section-subtitle">{{ isZh ? '浏览我们的畅销消费电子产品，具有竞争力的价格和快速交货。' : 'Explore our best-selling consumer electronics with competitive pricing and fast delivery.' }}</p>
        <div class="grid-4">
          <div v-for="product in featuredProducts" :key="product.id" class="product-card card">
            <div class="product-img" @click="$router.push('/products/' + product.id)">
              <img :src="product.image" :alt="localized(product, 'name', 'nameCn')" loading="lazy" />
            </div>
            <div class="product-info">
              <span class="badge badge-blue">{{ product.category }}</span>
              <h3 @click="$router.push('/products/' + product.id)">{{ localized(product, 'name', 'nameCn') }}</h3>
              <p class="product-price">FOB: {{ product.fobPrice }}</p>
              <p class="product-moq">{{ isZh ? '最小起订量' : 'MOQ' }}: {{ product.moq }} {{ product.moqUnit }}</p>
              <button class="btn btn-sm btn-primary" style="width:100%;margin-top:8px;" @click.stop="addToQuote(product)">
                {{ isZh ? '加入报价' : 'Add to Quote' }}
              </button>
            </div>
          </div>
        </div>
        <div class="text-center mt-2">
          <router-link to="/products" class="btn btn-outline">{{ isZh ? '查看所有产品' : 'View All Products' }}</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { products } from '../data/products.js'
import { useLocale } from '../composables/useLocale.js'
import { useQuote } from '../composables/useQuote.js'

const { isZh, localized } = useLocale()
const { addItem } = useQuote()
const featuredProducts = products.slice(0, 4)
</script>

<style scoped>
.hero { background: linear-gradient(135deg, var(--bg-dark) 0%, #1e3a8a 100%); min-height: 70vh; display: flex; align-items: center; padding: 120px 0 80px; }
.hero-content { text-align: left; }
.hero-title { font-size: 48px; font-weight: 800; color: white; line-height: 1.2; margin-bottom: 20px; max-width: 700px; }
.hero-desc { font-size: 18px; color: #94a3b8; max-width: 550px; margin-bottom: 32px; line-height: 1.7; }
.hero-actions { display: flex; gap: 16px; }
.btn-outline-white { background: transparent; color: white; border: 2px solid rgba(255,255,255,0.3); }
.btn-outline-white:hover { border-color: white; background: rgba(255,255,255,0.1); }
.features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.feature-card { padding: 32px; text-align: center; }
.feature-icon { font-size: 28px; color: var(--accent); margin-bottom: 16px; }
.feature-card h3 { font-size: 18px; margin-bottom: 10px; }
.feature-card p { color: var(--text-light); font-size: 14px; line-height: 1.7; }
.product-card { cursor: default; }
.product-img { height: 220px; overflow: hidden; cursor: pointer; }
.product-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.product-card:hover .product-img img { transform: scale(1.05); }
.product-info { padding: 16px; }
.product-info h3 { font-size: 15px; margin: 8px 0; line-height: 1.4; cursor: pointer; }
.product-info h3:hover { color: var(--primary); }
.product-price { font-weight: 600; color: var(--primary); font-size: 14px; }
.product-moq { font-size: 12px; color: var(--text-light); margin-top: 4px; }
@media (max-width: 768px) { .hero-title { font-size: 32px; } .hero { min-height: 60vh; padding: 100px 0 60px; } .hero-actions { flex-direction: column; } .btn-outline-white { text-align: center; } .features-grid { grid-template-columns: 1fr; } }
</style>

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
