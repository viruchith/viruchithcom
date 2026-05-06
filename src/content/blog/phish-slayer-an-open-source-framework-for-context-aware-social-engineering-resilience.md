---
title: "PHISH SLAYER: A FOSS Project for Context-Aware Security Resilience"
description: "PHISH SLAYER is a FOSS project designed to solve the personalization gap in security awareness training. By integrating LLMs with the Model Context Protocol (MCP), it securely bridges internal CMDB data to generate hyper-realistic, context-aware phishing simulations. Build elite cyber resilience by testing your workforce against threats that reference real project IDs, asset names, and personnel hierarchies."
publishDate: 2026-05-06
category: Cybersecurity
tags:
  - Phishing
  - Social Engineering
  - Large Language Models
  - Model Context Protocol
  - Configuration Management Database
heroImage: ../../assets/blog/phish-slayer-a-foss-project-for-context-aware-security-resilience.png
heroAlt: Doom slayer style illustration of a cybersecurity professional battling against a giant, monstrous phishing email, symbolizing the fight against cyber threats. The background features a digital landscape with code and security icons, emphasizing the theme of cybersecurity resilience.
featured: false
draft: false
---

In the modern threat landscape, the primary vulnerability of any organization is no longer a technical exploit, but the "human element." Traditional security awareness training—while well-intentioned—often falls short because it lacks the contextual relevance required to fool a modern, tech-savvy workforce. When a simulation feels "canned," the brain switches to a passive mode.  

**PHISH SLAYER** is an open-source (FOSS) project designed to bridge this personalization gap. By integrating **Large Language Models (LLMs)** with the **Model Context Protocol (MCP)** and internal **Configuration Management Databases (CMDB)**, companies can move from generic drills to hyper-personalized, high-fidelity simulations that mirror the exact professional context of their employees.

## The "Personalization Gap" in Current Training
Generic phishing templates (e.g., "Your mailbox is full") have high ignore rates. Real-world attackers, however, perform OSINT and leverage leaked internal data to craft messages that reference real projects and colleagues. **PHISH SLAYER** targets this gap by automating the creation of "Spear Phishing" simulations that are indistinguishable from daily professional communications.

## Core Technological Pillars
The PHISH SLAYER project utilizes a sophisticated "CASE" (Context-Aware Simulation Engine) stack to ensure realism and security.

![PHISH SLAYER Architecture](/articles/images/phish_slayer_architecture.png "PHISH SLAYER Architecture") 

1. **Large Language Models (LLM)** The LLM provides the "linguistic intelligence" needed to synthesize professional narratives. It can mimic the corporate tone and specific jargon of various departments, ensuring that no two employees receive identical templates. This prevents pattern recognition and "cheat-sheeting" among staff.  
2. **Model Context Protocol (MCP)** MCP acts as the secure, standardized bridge between the AI and internal company data. It allows the system to query specific metadata in real-time without the LLM ever needing direct access to sensitive raw data or being trained on private company info.  
3. **Configuration Management Database (CMDB)** The CMDB is the "Source of Truth" for the simulation. It provides the contextual anchors that ground the narrative:  
    - **Project Hierarchies:** Who owns a project and who is developing it?  
    - **Linked Asset Details:** Specific file names, version numbers, or technical drawings currently in use.  
    - **Personnel Data:** Org charts and communication profiles for authoritative pretexts.  

## How it Works: The CASE Engine Workflow
The system follows a four-layer architecture to ensure safe, scalable deliver

| Layer              | Action                    | Outcome                                          |   |   |
|--------------------|---------------------------|--------------------------------------------------|---|---|
| Layer 1: Input     | Query CMDB via MCP.       | Retrieve project names, asset IDs, and owners.   |  
| Layer 2: Synthesis | LLM processes context.    | A bespoke, context-aware narrative is generated. |  
| Layer 3: Control   | Human-in-the-Loop Review. | Security Analysts approve or edit the template.  |   
| Layer 4: Delivery  | Controlled Dispatch.      | Simulation is sent via Email, Slack, or Teams.   |    

## High-Fidelity Simulation Scenarios
By pulling data from the CMDB, PHISH SLAYER creates scenarios that trigger high cognitive engagement.

**Scenario A:** The "Broken Asset" Urgency
CMDB Data Fetched: Project "Titan Upgrade," Asset "Schema_v4.pdf," Project Owner "Sarah Jenkins".  

- **Simulated Attack:** An email from Sarah Jenkins claims that "Schema_v4.pdf" is showing a 404 error in the internal viewer.  

- **The Hook:** It asks the target to click a link to verify the file before an upcoming developer sync, leveraging professional urgency.


**Scenario B:** The "Developer Peer Review"
CMDB Data Fetched: Project "Odin Migration," Lead Dev "Marcus Thorne".  

- **Simulated Attack:** A message on Slack appearing to be from a colleague states that Marcus is "tied up in a sprint" and needs a quick manifest check.  

- **The Hook:** It leverages peer trust and the specific context of an active migration project.


**Ethical Guardrails and Safety**
To remain an effective training tool rather than a workplace stressor, PHISH SLAYER implements strict guardrails:  
- **Read-Only Access:** The MCP bridge is strictly read-only, ensuring no production data can be altered.  
- **Non-Punitive Learning:** Employees who fall for a simulation are not reprimanded. Instead, they are redirected to a brief "Glory Kill" module—a positive, 2-minute interactive training session that highlights the red flags missed.  
- **Data Anonymization:** No PII beyond professional identifiers is processed by the LLM, maintaining strict privacy compliance.


## Conclusion
Generic training is a thing of the past. **PHISH SLAYER** offers organizations a way to "Rip and Tear" through the illusions of modern social engineering. By leveraging the power of CMDB context and AI-driven narratives, companies can finally train their workforce to handle the same level of sophistication used by actual attackers today.

Project repository - [https://github.com/viruchith/PhishSlayer](https://github.com/viruchith/PhishSlayer)