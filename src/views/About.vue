<template>
  <div class="about-page">
    <section class="page-hero">
      <div class="container">
        <h1>{{ isZh ? '关于 SunShine Trade' : 'About SunShine Trade' }}</h1>
        <p>{{ isZh ? '自2020年起，您在全球采购中值得信赖的伙伴。' : 'Your reliable partner in global sourcing since 2020.' }}</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2>{{ isZh ? '我们是谁' : 'Who We Are' }}</h2>
            <p>{{ isZh ? 'SunShine Trade 是一家位于中国深圳的专业出口贸易公司。我们专注于消费电子领域，连接全球买家与中国优质制造商。' : 'SunShine Trade is a professional export trading company based in Shenzhen, China. We specialize in consumer electronics, connecting global buyers with high-quality Chinese manufacturers.' }}</p>
            <p>{{ isZh ? '我们的团队在产品采购、质量控制、物流和跨境贸易方面拥有丰富的经验。我们帮助从小型企业到大型企业的客户找到合适的产品。' : 'Our team has deep experience in product sourcing, quality control, logistics, and cross-border trade. We help clients from small businesses to large enterprises find the right products at the right price.' }}</p>
            <h2>{{ isZh ? '我们的服务' : 'Our Services' }}</h2>
            <ul class="service-list">
              <li><strong>{{ isZh ? '产品采购' : 'Product Sourcing' }}</strong> - {{ isZh ? '寻找可靠供应商和有竞争力的价格' : 'Find reliable suppliers and competitive prices' }}</li>
              <li><strong>{{ isZh ? '质量控制' : 'Quality Control' }}</strong> - {{ isZh ? '工厂审核、出货前检验' : 'Factory audits, pre-shipment inspections' }}</li>
              <li><strong>OEM/ODM</strong> - {{ isZh ? '定制产品开发和品牌设计' : 'Custom product development and branding' }}</li>
              <li><strong>{{ isZh ? '物流服务' : 'Logistics' }}</strong> - {{ isZh ? '货运代理、清关服务' : 'Freight forwarding, customs clearance' }}</li>
              <li><strong>{{ isZh ? '售后服务' : 'After-sales' }}</strong> - {{ isZh ? '质保支持和备件供应' : 'Warranty support and replacement parts' }}</li>
            </ul>
          </div>
          <div class="about-stats">
            <div class="stat-card card">
              <div class="stat-number">5+</div>
              <div class="stat-label">{{ isZh ? '年经验' : 'Years Experience' }}</div>
            </div>
            <div class="stat-card card">
              <div class="stat-number">200+</div>
              <div class="stat-label">{{ isZh ? '出口产品' : 'Products Exported' }}</div>
            </div>
            <div class="stat-card card">
              <div class="stat-number">30+</div>
              <div class="stat-label">{{ isZh ? '服务国家' : 'Countries Served' }}</div>
            </div>
            <div class="stat-card card">
              <div class="stat-number">98%</div>
              <div class="stat-label">{{ isZh ? '客户满意度' : 'Client Satisfaction' }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useLocale } from '../composables/useLocale.js'
const { isZh } = useLocale()
</script>

<style scoped>
.page-hero { background: var(--bg-gray); padding: 120px 0 60px; border-bottom: 1px solid var(--border); }
.page-hero h1 { font-size: 36px; font-weight: 700; margin-bottom: 12px; }
.page-hero p { color: var(--text-light); font-size: 16px; }
.about-content { display: grid; grid-template-columns: 1.5fr 1fr; gap: 48px; align-items: start; }
.about-text h2 { font-size: 24px; margin-bottom: 16px; margin-top: 32px; }
.about-text h2:first-child { margin-top: 0; }
.about-text p { color: var(--text-light); line-height: 1.8; margin-bottom: 16px; font-size: 15px; }
.service-list { list-style: none; }
.service-list li { padding: 12px 0; border-bottom: 1px solid var(--border); font-size: 14px; color: var(--text-light); }
.service-list li strong { color: var(--text); }
.about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.stat-card { padding: 28px 20px; text-align: center; }
.stat-number { font-size: 32px; font-weight: 800; color: var(--primary); margin-bottom: 6px; }
.stat-label { font-size: 13px; color: var(--text-light); }
@media (max-width: 768px) { .about-content { grid-template-columns: 1fr; } .page-hero h1 { font-size: 28px; } }
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
}
.about-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 48px;
  align-items: start;
}
.about-text h2 {
  font-size: 24px;
  margin-bottom: 16px;
  margin-top: 32px;
}
.about-text h2:first-child { margin-top: 0; }
.about-text p {
  color: var(--text-light);
  line-height: 1.8;
  margin-bottom: 16px;
  font-size: 15px;
}
.service-list {
  list-style: none;
}
.service-list li {
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
  color: var(--text-light);
}
.service-list li strong {
  color: var(--text);
}
.about-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.stat-card {
  padding: 28px 20px;
  text-align: center;
}
.stat-number {
  font-size: 32px;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 6px;
}
.stat-label {
  font-size: 13px;
  color: var(--text-light);
}
@media (max-width: 768px) {
  .about-content { grid-template-columns: 1fr; }
  .page-hero h1 { font-size: 28px; }
}
</style>
