<template>
  <div class="contact-page">
    <section class="page-hero">
      <div class="container">
        <h1>{{ isZh ? '联系我们' : 'Get In Touch' }}</h1>
        <p>{{ isZh ? '对我们的产品感兴趣？发送询盘，我们会在24小时内回复。' : 'Interested in our products? Send us an inquiry and we will get back to you within 24 hours.' }}</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="contact-layout">
          <div class="contact-form-wrap">
            <div v-if="submitted" class="success-message">
              <div class="success-icon">✓</div>
              <h3>{{ isZh ? '询盘已提交！' : 'Inquiry Submitted!' }}</h3>
              <p>{{ isZh ? '我们已收到您的询盘，将在24小时内回复。期待与您合作！' : 'Thank you! We have received your inquiry and will respond within 24 hours.' }}</p>
              <div v-if="emailSent" class="email-sent-note">{{ isZh ? '邮件通知已发送。' : 'Email notification sent.' }}</div>
              <button class="btn btn-primary mt-2" @click="resetForm">{{ isZh ? '再发一个询盘' : 'Send Another Inquiry' }}</button>
            </div>
            <form v-else @submit.prevent="handleSubmit" class="contact-form">
              <div v-if="selectedProduct" class="form-group">
                <label>{{ isZh ? '感兴趣的产品' : 'Product of Interest' }}</label>
                <input class="form-input" :value="localized(selectedProduct, 'name', 'nameCn')" disabled />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="name">{{ isZh ? '您的姓名 *' : 'Your Name *' }}</label>
                  <input id="name" v-model="form.name" class="form-input" :placeholder="isZh ? '张三' : 'John Smith'" required />
                </div>
                <div class="form-group">
                  <label for="company">{{ isZh ? '公司名称' : 'Company Name' }}</label>
                  <input id="company" v-model="form.company" class="form-input" :placeholder="isZh ? '您的公司' : 'Your Company LLC'" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="email">Email *</label>
                  <input id="email" v-model="form.email" type="email" class="form-input" placeholder="john@company.com" required />
                </div>
                <div class="form-group">
                  <label for="phone">{{ isZh ? '电话' : 'Phone' }}</label>
                  <input id="phone" v-model="form.phone" class="form-input" placeholder="+1 234 567 8900" />
                </div>
              </div>
              <div class="form-group">
                <label for="quantity">{{ isZh ? '预计数量' : 'Estimated Quantity' }}</label>
                <input id="quantity" v-model="form.quantity" class="form-input" :placeholder="isZh ? '例如：1000 个' : 'e.g. 1000 pcs'" />
              </div>
              <div class="form-group">
                <label for="message">{{ isZh ? '消息 *' : 'Message *' }}</label>
                <textarea id="message" v-model="form.message" class="form-textarea" :placeholder="isZh ? '请描述您的需求、目标市场和具体要求...' : 'Tell us about your requirements, target market, and any specific requests...'" required></textarea>
              </div>
              <button type="submit" class="btn btn-accent" :disabled="submitting">
                {{ submitting ? (isZh ? '提交中...' : 'Submitting...') : (isZh ? '提交询盘' : 'Submit Inquiry') }}
              </button>
            </form>
          </div>
          <div class="contact-info">
            <div class="contact-card card">
              <h3>{{ isZh ? '联系信息' : 'Contact Information' }}</h3>
              <div class="contact-item">
                <span class="contact-label">Email</span>
                <span>info@sunshinetrade.com</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">{{ isZh ? '电话' : 'Phone' }}</span>
                <span>+86 755 8888 8888</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">WhatsApp</span>
                <span>+86 138 0000 0000</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">{{ isZh ? '地址' : 'Address' }}</span>
                <span>{{ isZh ? '中国深圳福田' : 'Shenzhen, China' }}</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">{{ isZh ? '工作时间' : 'Working Hours' }}</span>
                <span>{{ isZh ? '周一至周六 9:00-18:00 (GMT+8)' : 'Mon - Sat, 9:00 - 18:00 (GMT+8)' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getProductById } from '../data/products.js'
import { useLocale } from '../composables/useLocale.js'
import { emailConfig } from '../config/email.js'
import emailjs from '@emailjs/browser'

const { isZh, localized } = useLocale()
const route = useRoute()
const submitted = ref(false)
const submitting = ref(false)
const emailSent = ref(false)

const selectedProduct = computed(() => {
  const pid = route.query.product
  return pid ? getProductById(pid) : null
})

const form = ref({
  name: '',
  company: '',
  email: '',
  phone: '',
  quantity: '',
  message: ''
})

async function handleSubmit() {
  submitting.value = true
  const inquiry = {
    id: Date.now(),
    date: new Date().toISOString(),
    product: selectedProduct.value
      ? localized(selectedProduct.value, 'name', 'nameCn')
      : (isZh.value ? '一般询盘' : 'General Inquiry'),
    ...form.value
  }

  // Save to localStorage (always)
  const saved = JSON.parse(localStorage.getItem('inquiries') || '[]')
  saved.unshift(inquiry)
  localStorage.setItem('inquiries', JSON.stringify(saved))

  // Send email notification if configured (optional)
  if (emailConfig.enabled) {
    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: form.value.name,
          from_email: form.value.email,
          from_company: form.value.company,
          from_phone: form.value.phone,
          product: inquiry.product,
          quantity: form.value.quantity,
          message: form.value.message,
          inquiry_date: new Date().toLocaleString(),
          to_email: 'info@sunshinetrade.com'
        },
        emailConfig.publicKey
      )
      emailSent.value = true
    } catch (e) {
      console.warn('Email notification failed (this is OK if not configured):', e)
    }
  }

  submitting.value = false
  submitted.value = true
}

function resetForm() {
  form.value = { name: '', company: '', email: '', phone: '', quantity: '', message: '' }
  submitted.value = false
  emailSent.value = false
}
</script>

<style scoped>
.page-hero { background: var(--bg-gray); padding: 120px 0 60px; border-bottom: 1px solid var(--border); }
.page-hero h1 { font-size: 36px; font-weight: 700; margin-bottom: 12px; }
.page-hero p { color: var(--text-light); font-size: 16px; max-width: 500px; }
.contact-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 48px; align-items: start; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.success-message { text-align: center; padding: 60px 40px; }
.success-icon { width: 64px; height: 64px; border-radius: 50%; background: var(--success); color: white; display: flex; align-items: center; justify-content: center; font-size: 28px; margin: 0 auto 20px; }
.success-message h3 { font-size: 22px; margin-bottom: 12px; }
.success-message p { color: var(--text-light); max-width: 400px; margin: 0 auto; }
.email-sent-note { font-size: 13px; color: var(--text-light); margin-top: 8px; }
.contact-card { padding: 32px; }
.contact-card h3 { font-size: 18px; margin-bottom: 24px; }
.contact-item { padding: 12px 0; border-bottom: 1px solid var(--border); font-size: 14px; }
.contact-item:last-child { border-bottom: none; }
.contact-label { display: block; font-weight: 600; font-size: 12px; color: var(--text-light); margin-bottom: 2px; text-transform: uppercase; letter-spacing: 0.5px; }
@media (max-width: 768px) { .contact-layout { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } .page-hero h1 { font-size: 28px; } }
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
.contact-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 48px;
  align-items: start;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.success-message {
  text-align: center;
  padding: 60px 40px;
}
.success-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--success);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 auto 20px;
}
.success-message h3 {
  font-size: 22px;
  margin-bottom: 12px;
}
.success-message p {
  color: var(--text-light);
  max-width: 400px;
  margin: 0 auto;
}
.contact-card {
  padding: 32px;
}
.contact-card h3 {
  font-size: 18px;
  margin-bottom: 24px;
}
.contact-item {
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}
.contact-item:last-child { border-bottom: none; }
.contact-label {
  display: block;
  font-weight: 600;
  font-size: 12px;
  color: var(--text-light);
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
@media (max-width: 768px) {
  .contact-layout { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .page-hero h1 { font-size: 28px; }
}
</style>
