<template>
  <div class="app">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <QuoteFloat />
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import QuoteFloat from './components/QuoteFloat.vue'
</script>
