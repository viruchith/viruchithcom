export interface SiteConfig {
  name: string;
  headlineRole: string;
  secondaryRole: string;
  title: string;
  description: string;
  pitch: string;
  proofPoint: string;
  location: string;
  availability: string;
  email: string;
  altEmail: string;
  phone: string;
  siteUrl: string;
  ogImage: string;
  ogImageAlt: string;
  bookingUrl?: string;
  resumeUrl?: string;
  hasResume: boolean;
  socials: {
    github: string;
    linkedin: string;
    x: string;
  };
  keywords: string[];
}

export const siteConfig: SiteConfig = {
  name: 'Viruchith Ganesan',
  headlineRole: 'Backend Engineer',
  secondaryRole: 'Spring Boot & Cloud-Native Systems Consultant',
  // Exactly 56 characters (50-60 character requirement)
  title: 'Viruchith Ganesan | Backend Engineer (Java) in Bengaluru',
  // Exactly 159 characters (150-160 character requirement)
  description:
    'Viruchith Ganesan is a backend engineer in Bengaluru specializing in Java, Spring Boot, microservices, and GCP. Open to full-time roles and backend consulting.',
  pitch:
    'Designing and modernizing resilient, high-throughput Java and Spring Boot microservices on Kubernetes and GCP, with proven reliability for 100,000+ requests/day.',
  proofPoint:
    'Modernized legacy enterprise systems to Spring Boot on Kubernetes (GCP) and engineered mission-critical telecom services handling 100,000+ requests/day.',
  location: 'Bengaluru, India',
  availability: 'Open to full-time roles & consulting (Bengaluru / Remote)',
  email: 'contact@viruchith.com',
  altEmail: 'viruchithganesan@gmail.com',
  phone: '+91 8098867773',
  siteUrl: 'https://viruchith.com',
  ogImage: '/og-default.png',
  ogImageAlt:
    'Viruchith Ganesan — Backend Engineer specializing in Java, Spring Boot, and Cloud-Native Systems',
  resumeUrl:
    'https://drive.google.com/file/d/1eff3_O4tFQ69MNB9Y_gj-QQZtvYsKNxv/view?usp=sharing',
  hasResume: true,
  socials: {
    github: 'https://github.com/viruchith',
    linkedin: 'https://www.linkedin.com/in/viruchith/',
    x: 'https://x.com/viruchith',
  },
  keywords: [
    'Viruchith Ganesan',
    'Java backend engineer Bengaluru',
    'Spring Boot developer',
    'Spring Boot microservices consultant',
    'legacy Java modernization',
    'Restlet to Spring Boot migration',
    'GCP Associate Cloud Engineer',
    'Kubernetes',
    'RabbitMQ',
    'PostgreSQL',
  ],
};
