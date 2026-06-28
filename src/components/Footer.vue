<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h3>SunShine Trade</h3>
          <p class="text-light">{{ isZh ? '您的采购伙伴' : 'Your sourcing partner.' }}</p>
        </div>
        <div class="footer-col">
          <h3>{{ isZh ? '链接' : 'Quick Links' }}</h3>
          <router-link to="/products">{{ isZh ? '产品' : 'Products' }}</router-link>
          <router-link to="/about">{{ isZh ? '关于' : 'About Us' }}</router-link>
          <router-link to="/contact">{{ isZh ? '联系' : 'Contact' }}</router-link>
        </div>
        <div class="footer-col">
          <h3>{{ isZh ? '联系' : 'Contact Info' }}</h3>
          <p>Email: info@sunshinetrade.com</p>
          <p>Tel: +86 755 8888 8888</p>
          <p>{{ isZh ? '深圳' : 'Shenzhen' }}</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 SunShine Trade Co., Ltd. {{ isZh ? '版权所有' : 'All rights reserved.' }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useLocale } from '../composables/useLocale.js'
const { isZh } = useLocale()
</script>

<style scoped>
.footer { background: var(--bg-dark); color: #cbd5e1; padding: 60px 0 0; margin-top: 80px; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; padding-bottom: 40px; border-bottom: 1px solid #1e293b; }
.footer-col h3 { color: white; font-size: 16px; margin-bottom: 16px; }
.footer-col p, .footer-col a { color: #94a3b8; font-size: 14px; line-height: 2; display: block; }
.footer-col a:hover { color: white; }
.footer-bottom { text-align: center; padding: 24px 0; font-size: 13px; color: #64748b; }
@media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr; gap: 32px; } }
</style>
