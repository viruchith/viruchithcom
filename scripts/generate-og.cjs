/* eslint-disable */
const sharp = require('sharp');
const path = require('path');

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#070c18" />
        <stop offset="50%" stop-color="#0b1326" />
        <stop offset="100%" stop-color="#0f1a36" />
      </linearGradient>
      <radialGradient id="glow1" cx="20%" cy="20%" r="45%">
        <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#00f0ff" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="glow2" cx="85%" cy="30%" r="50%">
        <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.22" />
        <stop offset="100%" stop-color="#4f46e5" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#00f0ff" />
        <stop offset="100%" stop-color="#60a5fa" />
      </linearGradient>
      <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.5"/>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <rect width="${width}" height="${height}" fill="url(#glow1)" />
    <rect width="${width}" height="${height}" fill="url(#glow2)" />

    <!-- Outer border -->
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="24" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="2" />

    <!-- Site Brand Tag -->
    <text x="80" y="96" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" letter-spacing="4" fill="#00f0ff">VIRUCHITH.COM</text>

    <!-- Availability & Location Chip -->
    <rect x="760" y="70" width="360" height="38" rx="19" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(0, 240, 255, 0.25)" stroke-width="1.5" />
    <circle cx="782" cy="89" r="5" fill="#10b981" />
    <text x="798" y="94" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" letter-spacing="1" fill="#e2e8f0">Bengaluru · Open to Roles</text>

    <!-- Main Headline: Name -->
    <text x="80" y="210" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="64" font-weight="900" letter-spacing="-1.5" fill="#ffffff">Viruchith Ganesan</text>

    <!-- Role Sub-headline -->
    <text x="80" y="272" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="700" fill="url(#accentGrad)">Backend Engineer · Java &amp; Spring Boot</text>

    <!-- Pitch paragraph -->
    <text x="80" y="340" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="400" fill="#94a3b8">
      Architecting resilient microservices on Kubernetes (GCP) &amp; modernizing enterprise platforms.
    </text>
    <text x="80" y="375" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="400" fill="#94a3b8">
      Proven scale: 100,000+ requests/day &amp; full legacy-to-cloud-native migrations.
    </text>

    <!-- Skill Chips Box -->
    <g transform="translate(80, 440)">
      <!-- Chip 1: Java & Spring Boot -->
      <rect x="0" y="0" width="180" height="44" rx="10" fill="rgba(0, 240, 255, 0.1)" stroke="rgba(0, 240, 255, 0.3)" stroke-width="1" />
      <text x="16" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#ffffff">Java &amp; Spring Boot</text>

      <!-- Chip 2: Kubernetes -->
      <rect x="195" y="0" width="145" height="44" rx="10" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
      <text x="211" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#cbd5e1">Kubernetes</text>

      <!-- Chip 3: GCP (ACE) -->
      <rect x="355" y="0" width="125" height="44" rx="10" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
      <text x="371" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#cbd5e1">GCP (ACE)</text>

      <!-- Chip 4: RabbitMQ -->
      <rect x="495" y="0" width="125" height="44" rx="10" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
      <text x="511" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#cbd5e1">RabbitMQ</text>

      <!-- Chip 5: PostgreSQL -->
      <rect x="635" y="0" width="140" height="44" rx="10" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
      <text x="651" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#cbd5e1">PostgreSQL</text>

      <!-- Chip 6: Observability -->
      <rect x="790" y="0" width="220" height="44" rx="10" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
      <text x="806" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="600" fill="#cbd5e1">Splunk · Datadog · APM</text>
    </g>

    <!-- Footer metadata -->
    <text x="80" y="555" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="500" fill="#64748b">https://viruchith.com · contact@viruchith.com</text>
  </svg>
  `;

  const outputPath = path.join(__dirname, '..', 'public', 'og-default.png');
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);

  console.log('Successfully generated', outputPath);
}

generateOgImage().catch(console.error);
