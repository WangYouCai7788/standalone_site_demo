<template>
  <div class="about-page">
    <section class="page-hero">
      <div class="container">
        <h1>About SunShine Trade</h1>
        <p>Your reliable partner in global sourcing since 2020.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2>Who We Are</h2>
            <p>SunShine Trade is a professional export trading company based in Shenzhen, China. We specialize in consumer electronics, connecting global buyers with high-quality Chinese manufacturers.</p>
            <p>Our team has deep experience in product sourcing, quality control, logistics, and cross-border trade. We help clients from small businesses to large enterprises find the right products at the right price.</p>
            <h2>Our Services</h2>
            <ul class="service-list">
              <li><strong>Product Sourcing</strong> - Find reliable suppliers and competitive prices</li>
              <li><strong>Quality Control</strong> - Factory audits, pre-shipment inspections</li>
              <li><strong>OEM/ODM</strong> - Custom product development and branding</li>
              <li><strong>Logistics</strong> - Freight forwarding, customs clearance</li>
              <li><strong>After-sales</strong> - Warranty support and replacement parts</li>
            </ul>
          </div>
          <div class="about-stats">
            <div class="stat-card card">
              <div class="stat-number">5+</div>
              <div class="stat-label">Years Experience</div>
            </div>
            <div class="stat-card card">
              <div class="stat-number">200+</div>
              <div class="stat-label">Products Exported</div>
            </div>
            <div class="stat-card card">
              <div class="stat-number">30+</div>
              <div class="stat-label">Countries Served</div>
            </div>
            <div class="stat-card card">
              <div class="stat-number">98%</div>
              <div class="stat-label">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

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
