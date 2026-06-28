<template>
  <transition name="slide">
    <div v-if="quoteOpen" class="quote-float">
      <div class="qf-header">
        <h3>{{ isZh ? '报价清单' : 'Quote List' }}</h3>
        <span class="qf-count">{{ items.length }} {{ isZh ? '项' : 'items' }}</span>
        <button class="qf-close" @click="togglePanel">&times;</button>
      </div>
      <div class="qf-body">
        <div v-for="item in items" :key="item.id" class="qf-item">
          <img :src="item.image" :alt="localized(item, 'name', 'nameCn')" class="qf-img" />
          <div class="qf-info">
            <p class="qf-name">{{ localized(item, 'name', 'nameCn') }}</p>
            <p class="qf-price">${{ item.fobMin }} – ${{ item.fobMax }}</p>
            <div class="qf-qty">
              <button @click="updateQty(item.id, item.qty - 1)">-</button>
              <input type="number" :value="item.qty" @change="updateQty(item.id, Number($event.target.value) || 1)" min="1" />
              <button @click="updateQty(item.id, item.qty + 1)">+</button>
            </div>
          </div>
          <button class="qf-remove" @click="removeItem(item.id)">&times;</button>
        </div>
      </div>
      <div class="qf-footer">
        <router-link to="/quote" class="btn btn-accent" style="width:100%;text-align:center;" @click="togglePanel">
          {{ isZh ? '生成报价单' : 'Generate Quote' }}
        </router-link>
        <button class="qf-clear" @click="clearQuote">{{ isZh ? '清空' : 'Clear' }}</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useQuote } from '../composables/useQuote.js'
import { useLocale } from '../composables/useLocale.js'

const { items, quoteOpen, togglePanel, removeItem, updateQty, clearQuote } = useQuote()
const { isZh, localized } = useLocale()
</script>

<style scoped>
.quote-float {
  position: fixed;
  bottom: 0;
  right: 20px;
  width: 360px;
  max-height: 500px;
  background: white;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
  z-index: 999;
  display: flex;
  flex-direction: column;
}
.qf-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  background: var(--primary);
  color: white;
  border-radius: 12px 12px 0 0;
}
.qf-header h3 { font-size: 15px; flex: 1; }
.qf-count { font-size: 12px; opacity: 0.8; }
.qf-close { background: none; border: none; color: white; font-size: 20px; cursor: pointer; opacity: 0.7; padding: 0 4px; }
.qf-close:hover { opacity: 1; }
.qf-body {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}
.qf-item {
  display: flex;
  gap: 10px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
  align-items: center;
}
.qf-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}
.qf-info { flex: 1; min-width: 0; }
.qf-name { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.qf-price { font-size: 12px; color: var(--primary); font-weight: 600; margin-top: 2px; }
.qf-qty { display: flex; align-items: center; gap: 4px; margin-top: 4px; }
.qf-qty button {
  width: 24px; height: 24px;
  border: 1px solid var(--border);
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  display: flex; align-items: center; justify-content: center;
}
.qf-qty input {
  width: 40px;
  text-align: center;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 2px;
  font-size: 13px;
}
.qf-remove { background: none; border: none; font-size: 18px; color: var(--text-light); cursor: pointer; padding: 4px; }
.qf-remove:hover { color: #ef4444; }
.qf-footer {
  padding: 12px 16px;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.qf-clear {
  background: none;
  border: none;
  font-size: 12px;
  color: var(--text-light);
  cursor: pointer;
  text-align: center;
}
.qf-clear:hover { color: #ef4444; }
.slide-enter-active, .slide-leave-active { transition: transform 0.3s; }
.slide-enter-from, .slide-leave-to { transform: translateY(100%); }
@media (max-width: 480px) {
  .quote-float { left: 0; right: 0; width: auto; bottom: 0; border-radius: 12px 12px 0 0; }
}
</style>
