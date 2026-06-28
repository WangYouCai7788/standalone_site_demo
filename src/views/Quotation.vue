<template>
  <div class="quote-page">
    <section class="page-hero">
      <div class="container">
        <h1>{{ isZh ? '报价单' : 'Quotation' }}</h1>
        <p>{{ isZh ? '查看和确认您的询价清单。' : 'Review and confirm your product inquiry list.' }}</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div v-if="items.length === 0" class="empty-state">
          <h3>{{ isZh ? '报价清单为空' : 'Quote list is empty' }}</h3>
          <p class="text-light">{{ isZh ? '去产品页面添加产品到报价单' : 'Browse products and add items to your quote' }}</p>
          <router-link to="/products" class="btn btn-primary mt-2">{{ isZh ? '浏览产品' : 'Browse Products' }}</router-link>
        </div>
        <template v-else>
          <!-- Company header -->
          <div class="quote-paper">
            <div class="quote-header">
              <div>
                <h2>SunShine Trade Co., Ltd.</h2>
                <p class="text-light">{{ isZh ? '地址：中国深圳' : 'Shenzhen, China' }}</p>
                <p class="text-light">Email: info@sunshinetrade.com | Tel: +86 755 8888 8888</p>
              </div>
              <div class="quote-ref">
                <p><strong>{{ isZh ? '报价单号' : 'Quote No.' }}:</strong> Q{{ Date.now().toString().slice(-8) }}</p>
                <p><strong>{{ isZh ? '日期' : 'Date' }}:</strong> {{ today }}</p>
                <p><strong>{{ isZh ? '有效期' : 'Valid' }}:</strong> 15 {{ isZh ? '天' : 'days' }}</p>
              </div>
            </div>
            <div class="quote-customer">
              <h4>{{ isZh ? '客户信息' : 'Customer Information' }}</h4>
              <div class="form-row">
                <div class="form-group">
                  <label>{{ isZh ? '公司名称' : 'Company Name' }}</label>
                  <input v-model="customer.company" class="form-input" :placeholder="isZh ? '您的公司' : 'Your Company'" />
                </div>
                <div class="form-group">
                  <label>{{ isZh ? '联系人 *' : 'Contact Person *' }}</label>
                  <input v-model="customer.contact" class="form-input" :placeholder="isZh ? '姓名' : 'Your Name'" required />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Email *</label>
                  <input v-model="customer.email" type="email" class="form-input" placeholder="email@company.com" required />
                </div>
                <div class="form-group">
                  <label>{{ isZh ? '电话' : 'Phone' }}</label>
                  <input v-model="customer.phone" class="form-input" placeholder="+1 234 567 8900" />
                </div>
              </div>
            </div>
            <!-- Quote line items -->
            <table class="quote-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{{ isZh ? '产品' : 'Product' }}</th>
                  <th>{{ isZh ? '数量' : 'Quantity' }}</th>
                  <th>{{ isZh ? '单价 (FOB)' : 'Unit Price (FOB)' }}</th>
                  <th>{{ isZh ? '总额' : 'Total' }}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in items" :key="item.id">
                  <td>{{ idx + 1 }}</td>
                  <td class="prod-cell">
                    <img :src="item.image" class="quote-thumb" />
                    <span>{{ localized(item, 'name', 'nameCn') }}</span>
                  </td>
                  <td>
                    <input type="number" :value="item.qty" @change="updateQty(item.id, Number($event.target.value) || 1)" min="1" class="qty-input" />
                  </td>
                  <td class="price-cell">${{ item.fobMin }} – ${{ item.fobMax }}</td>
                  <td class="price-cell">${{ (item.fobMin * item.qty).toFixed(2) }} – ${{ (item.fobMax * item.qty).toFixed(2) }}</td>
                  <td><button class="btn-remove" @click="removeItem(item.id)">&times;</button></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" class="total-label">{{ isZh ? '预计总额' : 'Estimated Total' }}</td>
                  <td class="total-value">${{ totalMin.toFixed(2) }} – ${{ totalMax.toFixed(2) }}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
            <div class="quote-notes">
              <p><strong>{{ isZh ? '备注' : 'Notes' }}:</strong></p>
              <ul>
                <li>{{ isZh ? '以上价格为 FOB Shenzhen 参考价，最终价格根据数量和包装要求确定。' : 'Prices are FOB Shenzhen for reference. Final price depends on quantity and packaging requirements.' }}</li>
                <li>{{ isZh ? '最小起订量 (MOQ) 因产品而异，大订单可议价。' : 'Minimum Order Quantity (MOQ) varies by product. Volume discounts available.' }}</li>
                <li>{{ isZh ? '付款方式：T/T（30% 定金，70% 发货前付清）' : 'Payment: T/T (30% deposit, 70% before shipment)' }}</li>
              </ul>
            </div>
            <div class="quote-actions">
              <button class="btn btn-accent" @click="submitQuote">
                {{ isZh ? '提交询价' : 'Submit Inquiry' }}
              </button>
              <button class="btn btn-outline" @click="printQuote">
                {{ isZh ? '打印 / 导出 PDF' : 'Print / Save PDF' }}
              </button>
              <button class="btn btn-outline" @click="clearQuote">{{ isZh ? '清空' : 'Clear All' }}</button>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLocale } from '../composables/useLocale.js'
import { useQuote } from '../composables/useQuote.js'

const { isZh, localized } = useLocale()
const { items, updateQty, removeItem, clearQuote } = useQuote()
const router = useRouter()

const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

const customer = {
  company: '',
  contact: '',
  email: '',
  phone: ''
}

const totalMin = computed(() => items.value.reduce((s, i) => s + i.fobMin * i.qty, 0))
const totalMax = computed(() => items.value.reduce((s, i) => s + i.fobMax * i.qty, 0))

function submitQuote() {
  if (!customer.contact.trim() || !customer.email.trim()) {
    alert(isZh.value ? '请填写联系人和邮箱' : 'Please fill in your name and email')
    return
  }
  const inquiry = {
    id: Date.now(),
    date: new Date().toISOString(),
    name: customer.contact,
    company: customer.company,
    email: customer.email,
    phone: customer.phone,
    product: items.value.map(i => `${localized(i, 'name', 'nameCn')} x${i.qty}`).join(', '),
    message: `Quote items:\n${items.value.map(i => `${localized(i, 'name', 'nameCn')} - Qty: ${i.qty} - Est. Total: $${(i.fobMin * i.qty).toFixed(2)} to $${(i.fobMax * i.qty).toFixed(2)}`).join('\n')}\n\nEst. Total: $${totalMin.value.toFixed(2)} - $${totalMax.value.toFixed(2)}`
  }
  const saved = JSON.parse(localStorage.getItem('inquiries') || '[]')
  saved.unshift(inquiry)
  localStorage.setItem('inquiries', JSON.stringify(saved))
  clearQuote()
  router.push('/contact')
}

function printQuote() {
  window.print()
}
</script>

<style scoped>
.page-hero {
  background: var(--bg-gray); padding: 120px 0 40px;
  border-bottom: 1px solid var(--border);
}
.page-hero h1 { font-size: 32px; font-weight: 700; margin-bottom: 8px; }
.page-hero p { color: var(--text-light); font-size: 15px; }
.empty-state { text-align: center; padding: 80px 0; }
.empty-state h3 { font-size: 20px; margin-bottom: 8px; }
.quote-paper {
  background: white;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 40px;
  max-width: 880px;
  margin: 0 auto;
}
.quote-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 24px;
  border-bottom: 2px solid var(--primary);
  margin-bottom: 24px;
}
.quote-header h2 { font-size: 22px; color: var(--primary); margin-bottom: 4px; }
.quote-ref {
  text-align: right;
  font-size: 13px;
  line-height: 1.8;
}
.quote-customer {
  padding: 20px;
  background: var(--bg-gray);
  border-radius: 8px;
  margin-bottom: 24px;
}
.quote-customer h4 { font-size: 15px; margin-bottom: 12px; }
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.form-row .form-group { margin-bottom: 0; }
.form-row .form-group label {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-light);
}
.quote-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
.quote-table th {
  text-align: left;
  padding: 10px 12px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-light);
  border-bottom: 2px solid var(--border);
}
.quote-table td {
  padding: 12px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
  vertical-align: middle;
}
.prod-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}
.quote-thumb {
  width: 40px; height: 40px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}
.qty-input {
  width: 60px;
  padding: 4px 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
}
.price-cell { font-weight: 600; white-space: nowrap; }
.btn-remove {
  background: none; border: none;
  color: var(--text-light); font-size: 18px;
  cursor: pointer; padding: 4px;
}
.btn-remove:hover { color: #ef4444; }
.total-label {
  text-align: right;
  font-weight: 700;
  font-size: 15px;
  border-bottom: none !important;
  padding-top: 16px;
}
.total-value {
  font-weight: 800;
  font-size: 16px;
  color: var(--primary);
  border-bottom: none !important;
  padding-top: 16px;
  white-space: nowrap;
}
.quote-notes {
  background: #f0f9ff;
  border-radius: 8px;
  padding: 16px 20px;
  margin: 16px 0 24px;
  font-size: 13px;
  line-height: 1.8;
  color: var(--text-light);
}
.quote-notes ul { list-style: disc; padding-left: 18px; margin-top: 4px; }
.quote-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
@media print {
  .page-hero, .quote-actions { display: none; }
  .quote-paper { border: none; box-shadow: none; padding: 0; }
  .form-input { border: none; background: transparent; }
}
@media (max-width: 768px) {
  .quote-paper { padding: 20px; }
  .quote-header { flex-direction: column; gap: 16px; }
  .quote-ref { text-align: left; }
  .form-row { grid-template-columns: 1fr; }
  .page-hero h1 { font-size: 26px; }
}
</style>
