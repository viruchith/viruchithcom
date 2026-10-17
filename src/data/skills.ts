export interface SkillCategory {
  title: string;
  description: string;
  isCore?: boolean;
  skills: {
    name: string;
    isPrimary?: boolean;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Core Backend & Cloud Stack',
    description:
      'Primary tools and platforms for building scalable, high-throughput enterprise systems.',
    isCore: true,
    skills: [
      { name: 'Java (OOP, Concurrency, DSA)', isPrimary: true },
      { name: 'Spring Boot (MVC, Data, Security)', isPrimary: true },
      { name: 'Kubernetes & Container Orchestration', isPrimary: true },
      { name: 'GCP (ACE Certified)', isPrimary: true },
      { name: 'RabbitMQ (Event-Driven Messaging)', isPrimary: true },
      { name: 'PostgreSQL & SQL Optimization', isPrimary: true },
      { name: 'Observability (Splunk, Datadog, AppDynamics)', isPrimary: true },
      { name: 'Microservices & RESTful APIs', isPrimary: true },
    ],
  },
  {
    title: 'Engineering & Delivery Toolchain',
    description: 'Infrastructure, deployment automation, and testing frameworks.',
    skills: [
      { name: 'Docker & Containerization' },
      { name: 'Rancher' },
      { name: 'Linux System Administration' },
      { name: 'CI/CD (GitHub Actions, Jenkins)' },
      { name: 'Hibernate & JPA' },
      { name: 'JUnit & Mockito' },
      { name: 'Azure Fundamentals (AZ-900)' },
      { name: 'Git & Version Control' },
      { name: 'Python' },
      { name: 'TypeScript' },
    ],
  },
  {
    title: 'Databases & Distributed Systems',
    description: 'Relational databases, caches, search engines, and enterprise data platforms.',
    skills: [
      { name: 'Oracle' },
      { name: 'MySQL' },
      { name: 'MongoDB' },
      { name: 'Redis (Caching & Queues)' },
      { name: 'Apache Solr' },
      { name: 'Palantir Data Hub' },
      { name: 'Databricks' },
      { name: 'Distributed Caching (Cache2k)' },
    ],
  },
  {
    title: 'Legacy Modernization (Enterprise Asset)',
    description:
      'Proven expertise decomposing legacy monolithic and JEE enterprise services into modern Spring Boot microservices.',
    skills: [
      { name: 'Restlet to Spring Boot Migration' },
      { name: 'Apache Tomcat' },
      { name: 'WildFly & JBoss Application Servers' },
      { name: 'Java EE (JEE)' },
      { name: 'JavaServer Faces (JSF)' },
      { name: 'Mainframe to Cloud Data Hub Modernization' },
      { name: 'JVM Thread & Heap Dump Analysis' },
    ],
  },
];
