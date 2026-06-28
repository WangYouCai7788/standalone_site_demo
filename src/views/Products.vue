<template>
  <div class="products-page">
    <section class="page-hero">
      <div class="container">
        <h1>{{ isZh ? '我们的产品' : 'Our Products' }}</h1>
        <p>{{ isZh ? '浏览我们的产品目录，所有产品支持 OEM/ODM，灵活起订量。' : 'Browse our product catalog. All products support OEM/ODM with flexible MOQ.' }}</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="filter-bar">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="filter-btn"
            :class="{ active: currentCategory === cat.id }"
            @click="currentCategory = cat.id"
          >
            {{ localized(cat, 'name', 'nameCn') }}
          </button>
        </div>
        <div v-if="filteredProducts.length === 0" class="text-center text-light" style="padding:60px 0;">
          {{ isZh ? '该分类暂无产品' : 'No products found in this category.' }}
        </div>
        <div v-else class="grid-4">
          <div v-for="product in filteredProducts" :key="product.id" class="product-card card">
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
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { categories, getProductsByCategory } from '../data/products.js'
import { useLocale } from '../composables/useLocale.js'
import { useQuote } from '../composables/useQuote.js'

const { isZh, localized } = useLocale()
const { addItem } = useQuote()

const currentCategory = ref('all')
const filteredProducts = computed(() => getProductsByCategory(currentCategory.value))

function addToQuote(product) {
  addItem(product)
}
</script>

<style scoped>
.page-hero { background: var(--bg-gray); padding: 120px 0 60px; border-bottom: 1px solid var(--border); }
.page-hero h1 { font-size: 36px; font-weight: 700; margin-bottom: 12px; }
.page-hero p { color: var(--text-light); font-size: 16px; max-width: 500px; }
.filter-bar { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
.filter-btn { padding: 8px 20px; border: 1px solid var(--border); background: white; border-radius: 999px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; color: var(--text); }
.filter-btn:hover { border-color: var(--primary); color: var(--primary); }
.filter-btn.active { background: var(--primary); color: white; border-color: var(--primary); }
.product-card { cursor: default; }
.product-img { height: 220px; overflow: hidden; cursor: pointer; }
.product-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.product-card:hover .product-img img { transform: scale(1.05); }
.product-info { padding: 16px; }
.product-info h3 { font-size: 15px; margin: 8px 0; line-height: 1.4; cursor: pointer; }
.product-info h3:hover { color: var(--primary); }
.product-price { font-weight: 600; color: var(--primary); font-size: 14px; }
.product-moq { font-size: 12px; color: var(--text-light); margin-top: 4px; }
@media (max-width: 768px) { .page-hero { padding: 100px 0 40px; } .page-hero h1 { font-size: 28px; } }
</style>

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
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}
.filter-btn {
  padding: 8px 20px;
  border: 1px solid var(--border);
  background: white;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text);
}
.filter-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}
.filter-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
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
  .page-hero { padding: 100px 0 40px; }
  .page-hero h1 { font-size: 28px; }
}
</style>
