export interface ExperienceBullet {
  text: string;
  // Technologies to bold in the UI (bold only key tech, not every term)
  highlightTech?: string[];
  // If a stronger metric is needed, marked here; page does not display placeholders
  metricTodo?: string;
  relatedArticle?: {
    title: string;
    slug: string;
  };
}

export interface ExperienceEntry {
  role: string;
  company: string;
  companyContext: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  startIso: string;
  endIso?: string;
  bullets: ExperienceBullet[];
}

export const experiences: ExperienceEntry[] = [
  {
    role: 'Software Development Consultant I',
    company: 'Lumen Technologies',
    companyContext:
      'Global enterprise communications and network infrastructure solutions provider',
    location: 'Bengaluru, India',
    startDate: 'October 2025',
    endDate: 'Present',
    isCurrent: true,
    startIso: '2025-10',
    bullets: [
      {
        text: 'Direct the containerization and architectural modernization of legacy enterprise workloads (Tomcat, WildFly, JBoss, Restlet) into **Spring Boot** microservices on **Kubernetes / Rancher (GCP)** from architecture design to production rollout, achieving complete runtime isolation and cloud portability.',
        highlightTech: ['Spring Boot', 'Kubernetes / Rancher (GCP)'],
        // TODO(metric): Add services migrated count or efficiency % once confirmed
      },
      {
        text: 'Co-architected a Palantir-based enterprise data hub to decommission legacy mainframe infrastructure, migrating critical data workflows to a high-capacity modern analytical engine.',
        highlightTech: ['Palantir-based data hub'],
        // TODO(metric): Add volume of mainframe records transitioned
      },
      {
        text: 'Administer Linux production environments and utilize **Splunk**, **AppDynamics**, and **Datadog** alongside JVM thread and heap dump profiling to rapidly identify bottlenecks and reduce mean-time-to-resolution (MTTR).',
        highlightTech: ['Splunk', 'AppDynamics', 'Datadog'],
        metricTodo: 'TODO(metric): substantiable MTTR reduction %',
        relatedArticle: {
          title: 'Deep dive: Ingesting Millions of Metrics Without Crashing',
          slug: 'under-the-hood-of-datadog-and-grafana-how-to-ingest-millions-of-metrics-without-crashing',
        },
      },
    ],
  },
  {
    role: 'Software Development Engineer',
    company: 'Lumen Technologies',
    companyContext:
      'Global enterprise communications and network infrastructure solutions provider',
    location: 'Bengaluru, India',
    startDate: 'July 2023',
    endDate: 'October 2025',
    isCurrent: false,
    startIso: '2023-07',
    endIso: '2025-10',
    bullets: [
      {
        text: 'Engineered a high-throughput telecom service qualification microservice using **Java**, **Spring Boot**, and **Hibernate** on a shared relational database, sustaining **100,000+ requests/day** under strict reliability requirements.',
        highlightTech: ['Java', 'Spring Boot', 'Hibernate', '100,000+ requests/day'],
        relatedArticle: {
          title: 'Architecture guide: Compliance-Grade Audit Trails in Spring',
          slug: 'building-compliance-grade-secure-audit-trails-in-modern-spring-applications',
        },
      },
      {
        text: 'Executed the end-to-end production migration of a mission-critical REST platform from legacy Restlet to **Spring Boot**, containerizing services with **Docker** and deploying onto **Kubernetes / Rancher on GCP**.',
        highlightTech: ['Spring Boot', 'Docker', 'Kubernetes / Rancher on GCP'],
      },
      {
        text: 'Built and maintained a customer-facing **Spring Boot** REST API powering real-time address-search autocomplete, accelerating service availability lookups using low-latency in-memory caching.',
        highlightTech: ['Spring Boot', 'in-memory caching'],
        relatedArticle: {
          title: 'Case study: In-Memory Caching with Cache2k & Spring Boot',
          slug: 'turbocharging-address-autocomplete-implementing-in-memory-caching-with-cache2k-and-spring-boot',
        },
      },
      {
        text: 'Implemented an asynchronous batch ingestion pipeline with **RabbitMQ** and Java concurrency patterns, ensuring zero-loss ingestion and resilient data synchronization from external systems.',
        highlightTech: ['RabbitMQ', 'Java concurrency'],
        relatedArticle: {
          title: 'Deep dive: Concurrency Patterns & Multi-Elevator Systems in Java',
          slug: 'mastering-concurrency-in-java-from-a-simple-air-fryer-to-a-scalable-multi-elevator-system',
        },
      },
    ],
  },
];
