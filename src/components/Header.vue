<template>
  <header class="header" :class="{ 'scrolled': isScrolled }">
    <div class="header-inner container">
      <router-link to="/" class="logo">
        <span class="logo-icon">S</span>
        <span class="logo-text">SunShine Trade</span>
      </router-link>
      <button class="menu-toggle" @click="menuOpen = !menuOpen" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <nav class="nav" :class="{ 'open': menuOpen }">
        <router-link to="/" class="nav-link" @click="menuOpen=false">{{ t('Home', '\u9996\u9875') }}</router-link>
        <router-link to="/products" class="nav-link" @click="menuOpen=false">{{ t('Products', '\u4ea7\u54c1') }}</router-link>
        <router-link to="/quote" class="nav-link" @click="menuOpen=false">
          {{ t('Quote', '\u62a5\u4ef7') }}
          <span v-if="totalItems > 0" class="quote-badge">{{ totalItems }}</span>
        </router-link>
        <router-link to="/about" class="nav-link" @click="menuOpen=false">{{ t('About Us', '\u5173\u4e8e\u6211\u4eec') }}</router-link>
        <router-link to="/contact" class="nav-link" @click="menuOpen=false">{{ t('Contact', '\u8054\u7cfb') }}</router-link>
        <router-link to="/admin" class="nav-link nav-admin" @click="menuOpen=false">{{ t('Admin', '\u7ba1\u7406') }}</router-link>
        <button class="lang-btn" @click="toggleLocale(); menuOpen=false">
          {{ currentLocale === 'en' ? '\u4e2d\u6587' : 'English' }}
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useLocale, useT } from '../composables/useLocale.js'
import { useQuote } from '../composables/useQuote.js'

const { toggleLocale, currentLocale } = useLocale()
const { t } = useT()
const { totalItems } = useQuote()
const isScrolled = ref(false)
const menuOpen = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(8px);
  transition: box-shadow 0.3s;
}
.header.scrolled { box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
}
.logo-icon {
  display: flex; align-items: center; justify-content: center;
  width: 36px; height: 36px;
  background: var(--primary); color: white;
  font-weight: 800; font-size: 20px;
  border-radius: 8px;
}
.logo-text { font-size: 18px; font-weight: 700; }
.nav { display: flex; gap: 4px; align-items: center; }
.nav-link {
  padding: 8px 16px; border-radius: 6px;
  color: var(--text); font-size: 14px; font-weight: 500;
  transition: background 0.2s, color 0.2s;
  position: relative;
}
.nav-link:hover { background: var(--bg-gray); color: var(--primary); }
.nav-link.router-link-active { color: var(--primary); font-weight: 600; }
.nav-admin { background: var(--bg-gray); border: 1px solid var(--border); }
.nav-admin:hover { background: var(--primary); color: white; border-color: var(--primary); }
.quote-badge {
  position: absolute;
  top: 2px; right: 4px;
  background: var(--accent); color: white;
  font-size: 10px; font-weight: 700;
  width: 18px; height: 18px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
}
.lang-btn {
  padding: 6px 14px;
  border: 1px solid var(--border);
  background: transparent;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--primary);
  margin-left: 8px;
}
.lang-btn:hover { background: var(--primary); color: white; border-color: var(--primary); }
.menu-toggle { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
.menu-toggle span { display: block; width: 24px; height: 2px; background: var(--text); border-radius: 2px; }
@media (max-width: 768px) {
  .menu-toggle { display: flex; }
  .nav { display: none; position: absolute; top: 64px; left: 0; right: 0; background: white; flex-direction: column; padding: 16px; box-shadow: var(--shadow-md); border-top: 1px solid var(--border); }
  .nav.open { display: flex; }
  .nav-link { padding: 12px 16px; }
  .lang-btn { margin-left: 0; align-self: flex-start; margin-top: 8px; }
}
</style>
