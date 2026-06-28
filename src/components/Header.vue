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
        <router-link to="/" class="nav-link" @click="menuOpen=false">Home</router-link>
        <router-link to="/products" class="nav-link" @click="menuOpen=false">Products</router-link>
        <router-link to="/about" class="nav-link" @click="menuOpen=false">About Us</router-link>
        <router-link to="/contact" class="nav-link" @click="menuOpen=false">Contact</router-link>
        <router-link to="/admin" class="nav-link nav-admin" @click="menuOpen=false">Admin</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(8px);
  transition: box-shadow 0.3s;
}
.header.scrolled {
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--primary);
  color: white;
  font-weight: 800;
  font-size: 20px;
  border-radius: 8px;
}
.logo-text {
  font-size: 18px;
  font-weight: 700;
}
.nav {
  display: flex;
  gap: 4px;
}
.nav-link {
  padding: 8px 16px;
  border-radius: 6px;
  color: var(--text);
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
}
.nav-link:hover {
  background: var(--bg-gray);
  color: var(--primary);
}
.nav-link.router-link-active {
  color: var(--primary);
  font-weight: 600;
}
.nav-admin {
  background: var(--bg-gray);
  border: 1px solid var(--border);
}
.nav-admin:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}
.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.menu-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: 0.3s;
}
@media (max-width: 768px) {
  .menu-toggle { display: flex; }
  .nav {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 16px;
    box-shadow: var(--shadow-md);
    border-top: 1px solid var(--border);
  }
  .nav.open { display: flex; }
  .nav-link { padding: 12px 16px; }
}
</style>
