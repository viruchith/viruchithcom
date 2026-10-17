export interface Project {
  title: string;
  problem: string;
  approach: string;
  description?: string;
  tags: string[];
  link?: string;
  isPrivate?: boolean;
  repoName?: string;
  relatedArticle?: {
    title: string;
    slug: string;
  };
}

export const featuredProjects: Project[] = [
  {
    title: 'Project VEGA',
    repoName: 'VEGA',
    problem:
      'Enterprise microservice architectures suffer from undocumented service sprawl, blind dependencies, and siloed tribal knowledge.',
    approach:
      'Engineered a GraphRAG architecture discovery engine indexing repositories with local LLMs and dual Graph-Vector storage to auto-generate interactive system blueprints in SvelteKit.',
    tags: ['GraphRAG', 'Microservices', 'SvelteKit', 'Local LLMs', 'Enterprise Architecture'],
    link: 'https://github.com/viruchith/VEGA',
    relatedArticle: {
      title: 'Eliminating Microservice Blind Spots: Introducing Project VEGA',
      slug: 'eliminating-microservice-blind-spots-introducing-project-vega-an-open-source-graphrag-architecture-engine',
    },
  },
  {
    title: 'Ticketris',
    repoName: 'Ticketris',
    problem:
      'Engineering and DevOps teams spend excessive cycles manually classifying, prioritizing, and contextualizing incoming technical incidents.',
    approach:
      'Built an open-source, zero-training agentic ticket enrichment and routing engine utilizing Model Context Protocol (MCP) servers to pull live infrastructure telemetry and synthesize actionable incident context.',
    tags: ['Model Context Protocol (MCP)', 'Agentic Systems', 'LLMs', 'Incident Triage', 'TypeScript'],
    link: 'https://github.com/viruchith/Ticketris',
    relatedArticle: {
      title: 'Zero-Trust LLM Architecture: Defending Conversational Agents & MCP Integrations',
      slug: 'zero-trust-llm-architecture-defending-conversational-agents-from-injection-confused-deputies-and-context-degradation',
    },
  },
  {
    title: 'CloudLab Orchestrator',
    repoName: 'CloudLabOrchestrator',
    problem:
      'Development sandboxes and training environments require complex, error-prone manual provisioning with high cloud compute overhead.',
    approach:
      'Developed a cloud-native platform using Spring Boot and lightweight K3s Kubernetes on GCP to dynamically orchestrate and tear down YAML-defined isolated lab environments.',
    tags: ['Spring Boot', 'Kubernetes (K3s)', 'GCP', 'Docker', 'Longhorn'],
    link: 'https://github.com/viruchith/CloudLabOrchestrator',
    relatedArticle: {
      title: 'Under the Hood: Evaluating Permissions in Under 5ms (RBAC & Platform Security)',
      slug: 'under-the-hood-how-google-aws-and-github-evaluate-permissions-in-under-5ms',
    },
  },
  {
    title: 'SentinelExtension (Confidentiality Safeguard)',
    repoName: 'SentinelExtension',
    problem:
      'Third-party browser extensions can access sensitive enterprise web applications, scraping confidential data and credentials directly from the DOM.',
    approach:
      'Created an enterprise security extension leveraging Shadow DOM encapsulation boundaries and secure vault-style storage to shield confidential inputs from unauthorized scripts.',
    tags: ['Browser Security', 'Shadow DOM', 'TypeScript', 'Web Extensions', 'Zero-Trust'],
    link: 'https://github.com/viruchith/SentinelExtension',
    relatedArticle: {
      title: 'Stop Using Math.random() for Security: Entropy & Cryptographic Defense',
      slug: 'stop-using-mathrandom-for-security-seriously',
    },
  },
];

export const moreProjects: Project[] = [
  {
    title: 'Phish Slayer',
    repoName: 'PhishSlayer',
    problem: 'Generic security awareness templates fail to prepare employees for modern personalized attacks.',
    approach:
      'Context-aware phishing simulation framework generating tailored, LLM-driven scenarios to measure and improve organizational social engineering resilience.',
    tags: ['LLMs', 'Phishing Simulation', 'Security Awareness', 'Python'],
    link: 'https://github.com/viruchith/PhishSlayer',
    relatedArticle: {
      title: 'Phish Slayer: Framework for Social Engineering Resilience',
      slug: 'phish-slayer-an-open-source-framework-for-context-aware-social-engineering-resilience',
    },
  },
  {
    title: 'Prompt Butler',
    repoName: 'PromptButler',
    problem: 'Context switching between development environments and prompt scratchpads disrupts AI-assisted workflows.',
    approach:
      'Always-on-top JavaFX desktop overlay for instant fuzzy-searching, templating, and clipboard injection of reusable engineering prompts.',
    tags: ['Java', 'JavaFX', 'Desktop UI', 'Prompt Engineering', 'Productivity'],
    link: 'https://github.com/viruchith/PromptButler',
    relatedArticle: {
      title: 'Supercharge Your AI Workflow: Introducing Prompt Butler',
      slug: 'supercharge-your-ai-workflow-introducing-prompt-butler',
    },
  },
  {
    title: 'RaagaDex',
    repoName: 'raagadex',
    problem: 'Musicians lack unified digital tooling to organize Indian classical ragams, compositions, and film repertoires.',
    approach:
      'Full-featured web application for Indian classical music indexing, audio/media lookup tables, and Firebase-backed collaborative curation.',
    tags: ['SvelteKit', 'Tailwind CSS', 'Firebase Auth & Firestore'],
    link: 'https://github.com/viruchith/raagadex',
  },
  {
    title: 'Android Shredder',
    repoName: 'AndroidShredder',
    problem: 'Standard file deletion on Android storage leaves sensitive remnants recoverable by forensic inspection.',
    approach:
      'High-security mobile utility implementing cryptographic multi-pass shredding algorithms to permanently destroy files and directories.',
    tags: ['Android', 'Kotlin', 'Cryptographic Security', 'File I/O'],
    link: 'https://github.com/viruchith/AndroidShredder',
  },
  {
    title: 'Beaver Expense Tracker',
    repoName: 'BeaverExpense',
    problem: 'Construction and job-site managers struggle with multi-site expense consolidation and receipt reconciliation.',
    approach:
      'Responsive web application featuring real-time receipt uploads, category filtering, and exportable financial reports for job sites.',
    tags: ['React', 'TypeScript', 'Vite', 'Firebase'],
    link: 'https://github.com/viruchith/BeaverExpense',
  },
];
