<template>
  <div class="admin-page">
    <div v-if="!authenticated" class="login-page">
      <div class="login-card">
        <div class="login-header">
          <div class="login-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
          <h2>{{ isZh ? "\u7ba1\u7406\u5458\u767b\u5f55" : "Admin Login" }}</h2>
          <p>{{ isZh ? "\u8bf7\u8f93\u5165\u5bc6\u7801\u67e5\u770b\u8be2\u76d8" : "Enter password to view inquiries" }}</p>
        </div>
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <input v-model="password" type="password" class="form-input" :placeholder="isZh ? '\u5bc6\u7801' : 'Password'" autofocus />
          </div>
          <p v-if="loginError" class="login-error">{{ loginError }}</p>
          <button type="submit" class="btn btn-accent btn-block">{{ isZh ? "\u767b\u5f55" : "Login" }}</button>
        </form>
      </div>
    </div>
    <template v-else>
      <div class="admin-header">
        <div class="container">
          <div class="admin-header-inner">
            <div>
              <h1>{{ isZh ? "\u7ba1\u7406\u540e\u53f0" : "Admin Dashboard" }}</h1>
              <p>{{ isZh ? "\u7ba1\u7406\u4ea7\u54c1\u548c\u67e5\u770b\u5ba2\u6237\u8be2\u76d8" : "Manage products and view customer inquiries" }}</p>
            </div>
            <button class="btn btn-outline btn-sm" @click="authenticated=false;password=''">{{ isZh ? "\u9000\u51fa" : "Logout" }}</button>
          </div>
        </div>
      </div>
      <section class="section">
        <div class="container">
          <div class="admin-nav">
            <button class="filter-btn" :class="{active:tab==='inquiries'}" @click="tab='inquiries'">
              {{ isZh ? "\u8be2\u76d8" : "Inquiries" }}
              <span v-if="inquiries.length" class="badge">{{ inquiries.length }}</span>
            </button>
            <button class="filter-btn" :class="{active:tab==='products'}" @click="tab='products'">
              {{ isZh ? "\u4ea7\u54c1" : "Products" }}
            </button>
          </div>

          <!-- Inquiries Tab -->
          <div v-if="tab==='inquiries'">
            <div class="inquiry-toolbar">
              <button class="btn btn-outline btn-sm" @click="fetchInquiries"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M3.5 15a9 9 0 1 0 2.12-9.36L1 10"/></svg> {{ isZh ? "\u5237\u65b0" : "Refresh" }}</button>
            </div>
            <div v-if="loading" class="text-center" style="padding:60px 0;color:var(--text-light);">{{ isZh ? "\u52a0\u8f7d\u4e2d..." : "Loading..." }}</div>
            <div v-else-if="inquiries.length===0" class="text-center text-light" style="padding:60px 0;">{{ isZh ? "\u6682\u65e0\u8be2\u76d8" : "No inquiries yet." }}</div>
            <div v-else class="inquiries-list">
              <div v-for="inquiry in inquiries" :key="inquiry.id" class="inquiry-card card" @click="selectedInquiry=inquiry" :class="{'inquiry-unread':inquiry.status==='unread'}">
                <div class="inquiry-header">
                  <div class="inquiry-name-row">
                    <span v-if="inquiry.status==='unread'" class="unread-dot"></span>
                    <strong>{{ inquiry.name }}</strong>
                    <span v-if="inquiry.company" class="text-light" style="font-weight:400;"> - {{ inquiry.company }}</span>
                  </div>
                  <div class="inquiry-actions">
                    <span class="inquiry-date">{{ formatDate(inquiry.createdAt||inquiry.date) }}</span>
                    <button v-if="inquiry.status==='unread'" class="btn-icon" @click.stop="markRead(inquiry.id)" title="Mark as read">\u2713</button>
                    <button class="btn-icon btn-icon-danger" @click.stop="deleteInquiry(inquiry.id)" title="Delete">\u2716</button>
                  </div>
                </div>
                <div class="inquiry-body">
                  <div class="inquiry-meta">
                    <span><strong>Email:</strong> {{ inquiry.email }}</span>
                    <span v-if="inquiry.phone"><strong>{{ isZh ? "\u7535\u8bdd" : "Phone" }}:</strong> {{ inquiry.phone }}</span>
                    <span v-if="inquiry.product"><strong>{{ isZh ? "\u4ea7\u54c1" : "Product" }}:</strong> {{ inquiry.product }}</span>
                  </div>
                  <p class="inquiry-message">{{ inquiry.message }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Products Tab -->
          <div v-if="tab==='products'">
            <div class="admin-toolbar">
              <button class="btn btn-primary btn-sm" @click="showAddForm=!showAddForm">+ {{ isZh ? "\u6dfb\u52a0\u4ea7\u54c1" : "Add Product" }}</button>
            </div>
            <div v-if="showAddForm" class="add-form card">
              <h3>{{ isZh ? "\u6dfb\u52a0\u65b0\u4ea7\u54c1" : "Add New Product" }}</h3>
              <form @submit.prevent="addProduct">
                <div class="form-row"><div class="form-group"><label>{{ isZh ? "\u4ea7\u54c1\u540d\u79f0" : "Product Name" }} *</label><input v-model="newProduct.name" class="form-input" required /></div><div class="form-group"><label>{{ isZh ? "\u4ea7\u54c1\u540d\u79f0\uff08\u4e2d\u6587\uff09" : "Product Name (Chinese)" }}</label><input v-model="newProduct.nameCn" class="form-input" /></div></div>
                <div class="form-row"><div class="form-group"><label>{{ isZh ? "\u5206\u7c7b" : "Category" }}</label><select v-model="newProduct.category" class="form-select"><option value="audio">Audio</option><option value="charging">Charging</option><option value="accessories">Accessories</option></select></div><div class="form-group"><label>FOB {{ isZh ? "\u4ef7\u683c\u8303\u56f4" : "Price Range" }}</label><input v-model="newProduct.fobPrice" class="form-input" placeholder="$5.00 - $8.00" /></div></div>
                <div class="form-row"><div class="form-group"><label>MOQ</label><input v-model="newProduct.moq" type="number" class="form-input" /></div><div class="form-group"><label>{{ isZh ? "\u5355\u4f4d" : "Unit" }}</label><input v-model="newProduct.moqUnit" class="form-input" placeholder="pcs" /></div></div>
                <div class="form-group"><label>{{ isZh ? "\u56fe\u7247\u94fe\u63a5" : "Image URL" }}</label><input v-model="newProduct.image" class="form-input" placeholder="https://..." /></div>
                <div class="form-group"><label>{{ isZh ? "\u63cf\u8ff0" : "Description" }}</label><textarea v-model="newProduct.description" class="form-textarea" required></textarea></div>
                <div class="form-actions"><button type="submit" class="btn btn-primary btn-sm">{{ isZh ? "\u4fdd\u5b58" : "Save" }}</button><button type="button" class="btn btn-outline btn-sm" @click="showAddForm=false">{{ isZh ? "\u53d6\u6d88" : "Cancel" }}</button></div>
              </form>
            </div>
            <div class="grid-4 mt-2">
              <div v-for="product in sortedProducts" :key="product.id" class="admin-product-card card">
                <div class="admin-product-img"><img :src="product.image" :alt="product.name" /></div>
                <div class="admin-product-info"><span class="badge">{{ product.category }}</span><h4>{{ localized(product,'name','nameCn') }}</h4><p class="text-light">FOB: {{ product.fobPrice }} | MOQ: {{ product.moq }}{{ product.moqUnit }}</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { products as defaultProducts } from "../../data/products.js";
import { useLocale } from "../../composables/useLocale.js";
var { isZh, localized } = useLocale();
var tab = ref("inquiries");
var authenticated = ref(false);
var password = ref("");
var loginError = ref("");
var showAddForm = ref(false);
var inquiries = ref([]);
var loading = ref(false);
var selectedInquiry = ref(null);
var customProducts = ref([]);

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}
var API = getBaseUrl() + "/api/inquiry";

async function fetchInquiries() {
  loading.value = true;
  try {
    var r = await fetch(API); var d = await r.json();
    inquiries.value = d.inquiries || [];
  } catch(e) {
    try { inquiries.value = JSON.parse(localStorage.getItem("inquiries") || "[]"); } catch(e2) { inquiries.value = []; }
  }
  loading.value = false;
}

async function markRead(id) {
  try { await fetch(API + "/" + id, { method: "PATCH" }); } catch(e) {}
  var list = inquiries.value.map(function(i) { return i.id === id ? Object.assign({}, i, { status: "read" }) : i; });
  inquiries.value = list;
}

async function deleteInquiry(id) {
  if (!confirm("Delete?")) return;
  try { await fetch(API + "/" + id, { method: "DELETE" }); } catch(e) {}
  inquiries.value = inquiries.value.filter(function(i) { return i.id !== id; });
}

function handleLogin() {
  if (password.value === "admin123") { authenticated.value = true; loginError.value = ""; fetchInquiries(); }
  else { loginError.value = isZh.value ? "\u5bc6\u7801\u9519\u8bef" : "Incorrect password"; }
}

onMounted(function() {
  try { customProducts.value = JSON.parse(localStorage.getItem("customProducts") || "[]"); } catch(e) { customProducts.value = []; }
});

var sortedProducts = computed(function() { return [...defaultProducts, ...customProducts.value]; });

var newProduct = ref({ name: "", nameCn: "", category: "audio", fobPrice: "", moq: 500, moqUnit: "pcs", image: "", description: "" });

function addProduct() {
  var item = { id: Date.now(), ...newProduct.value, moq: Number(newProduct.value.moq), features: [], specs: {} };
  var saved = JSON.parse(localStorage.getItem("customProducts") || "[]");
  saved.unshift(item);
  localStorage.setItem("customProducts", JSON.stringify(saved));
  customProducts.value = saved;
  showAddForm.value = false;
  newProduct.value = { name: "", nameCn: "", category: "audio", fobPrice: "", moq: 500, moqUnit: "pcs", image: "", description: "" };
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(isZh.value ? "zh-CN" : "en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
</script>

<style scoped>
.login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1e3a8a, #1e40af); padding: 20px; }
.login-card { background: white; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); width: 100%; max-width: 380px; overflow: hidden; }
.login-header { background: linear-gradient(135deg, #1e40af, #1e3a8a); padding: 32px 24px; text-align: center; }
.login-icon { width: 48px; height: 48px; background: rgba(255,255,255,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; }
.login-header h2 { color: white; font-size: 20px; margin-bottom: 4px; }
.login-header p { color: rgba(255,255,255,0.6); font-size: 13px; }
.login-form { padding: 28px 24px; }
.login-error { color: #dc2626; font-size: 13px; text-align: center; margin-bottom: 8px; }
.admin-header { background: var(--bg-gray); padding: 100px 0 20px; border-bottom: 1px solid var(--border); }
.admin-header h1 { font-size: 28px; font-weight: 700; }
.admin-header p { color: var(--text-light); font-size: 14px; margin-top: 4px; }
.admin-header-inner { display: flex; justify-content: space-between; align-items: flex-start; }
.admin-nav { display: flex; gap: 8px; margin-bottom: 24px; }
.filter-btn { display: flex; align-items: center; gap: 6px; padding: 8px 20px; border: 1px solid var(--border); background: white; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all .2s; color: var(--text); }
.filter-btn:hover { border-color: var(--primary); color: var(--primary); }
.filter-btn.active { background: var(--primary); color: white; border-color: var(--primary); }
.badge { background: rgba(255,255,255,0.2); color: white; font-size: 11px; padding: 1px 8px; border-radius: 10px; }
.inquiry-toolbar { margin-bottom: 16px; }
.inquiries-list { display: flex; flex-direction: column; gap: 12px; }
.inquiry-card { border-left: 3px solid var(--primary); cursor: pointer; transition: transform .15s; }
.inquiry-card:hover { transform: translateX(4px); }
.inquiry-unread { border-left-color: #f59e0b; background: #fffbeb; }
.inquiry-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px 6px; }
.inquiry-name-row { display: flex; align-items: center; gap: 6px; }
.unread-dot { width: 8px; height: 8px; border-radius: 50%; background: #f59e0b; display: inline-block; }
.inquiry-actions { display: flex; align-items: center; gap: 6px; }
.inquiry-date { font-size: 11px; color: var(--text-light); }
.btn-icon { width: 26px; height: 26px; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center; background: var(--bg-gray); color: var(--text-light); }
.btn-icon:hover { background: #e5e7eb; color: var(--text); }
.btn-icon-danger:hover { background: #fee2e2; color: #dc2626; }
.inquiry-body { padding: 0 20px 14px; }
.inquiry-meta { display: flex; flex-wrap: wrap; gap: 12px; font-size: 12px; color: var(--text-light); margin-bottom: 10px; }
.inquiry-message { font-size: 14px; line-height: 1.6; background: var(--bg-gray); padding: 12px 16px; border-radius: 8px; }
.add-form { padding: 24px; margin-bottom: 24px; background: #f0f9ff; border: 1px solid #bfdbfe; }
.add-form h3 { font-size: 18px; margin-bottom: 20px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-actions { display: flex; gap: 12px; margin-top: 8px; }
.admin-product-img { height: 180px; overflow: hidden; }
.admin-product-img img { width: 100%; height: 100%; object-fit: cover; }
.admin-product-info { padding: 12px 16px; }
.admin-product-info h4 { font-size: 14px; margin: 6px 0; }
.grid-4 { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
.mt-2 { margin-top: 16px; }
@media (max-width:768px){.form-row{grid-template-columns:1fr;}}
</style>
