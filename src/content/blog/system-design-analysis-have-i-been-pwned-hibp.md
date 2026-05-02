---
title: "System Design Analysis: Have I Been Pwned (HIBP)"
description: Unlock the genius behind HaveIBeenPwned's architecture. Discover how k-anonymity, serverless functions, and Cloudflare Workers handle billions of records for ultimate password security and efficiency.
publishDate: 2026-05-02
category: System Design
tags:
  - System Design
  - HIBP
  - K-Anonymity
  - Serverless
  - Cloudflare Workers
  - Security
heroImage: ../../assets/blog/system-design-analysis-have-i-been-pwned-hibp.png
heroAlt: An illustration of a secure vault representing the security of Have I Been Pwned's architecture, with data flowing securely in and out, symbolizing the protection of user information.
featured: false
draft: false
---
[Have I Been Pwned (HIBP)](https://haveibeenpwned.com/) is a masterclass in building a world-scale service on a shoestring budget. Managed primarily by Troy Hunt, it handles billions of records and millions of monthly queries with nearly zero latency. The secret sauce? A clever blend of k-anonymity, serverless functions, and Cloudflare Workers. In this post, we’ll dissect the architecture of HIBP to understand how it achieves such impressive performance and security while keeping costs low. Whether you’re a developer, architect, or just curious about how large-scale systems work, this analysis will provide valuable insights into the design choices that make HIBP a standout example in the world of cybersecurity services.


## 1. High-Level Architecture

![HIBP Architecture](/articles/images/hibp-architecture.png "HIBP Architecture")  

The HIBP architecture is designed to be stateless, serverless, and cache-heavy. Instead of a monolithic server, it relies on a distributed cloud pipeline.

Key Components:
- Data Ingestion Pipeline: When a new breach is found, raw files (SQL dumps, CSVs, JSON) are uploaded to Azure Blob Storage. Azure Functions (serverless) then parse, normalize, and de-duplicate the data.
- **Storage Layer:**
  - **Azure Table Storage:** Historically used for its extreme cost-efficiency and $O(1)$ lookup performance. It acts as a massive Key-Value store where the email address is the "Partition Key."
  - **Azure SQL Hyperscale:** Recently integrated to handle the sheer volume of 15+ billion records, allowing for rapid ingestion and complex indexing that older NoSQL structures struggled with at that specific scale.
- **The Edge (Cloudflare):** This is the most critical component. HIBP uses Cloudflare Workers and Cloudflare Tiered Caching to intercept requests before they ever hit the Azure backend.

## 2. Implementing "Pwned Passwords" (k-Anonymity)

The most elegant part of the system design is the Pwned Passwords API. It allows users to check if a password has been leaked without ever sending the password to HIBP.

### The k-Anonymity Model:

1. **Client-Side Hashing:** The user's browser or an integrated app (like 1Password) hashes the password using SHA-1. Example: `password123` becomes:
   ```
   CBFDDF37F9D809FBD2B50D691A066F0237C57E81
   ```
2. **Range Query (Prefixing):** The client sends only the first 5 characters of the hash (`CBFDD`) to the HIBP API.
3. **The "Bucket" Response:** HIBP looks up all leaked hashes starting with `CBFDD`. There are roughly 16^5 (1,048,576) possible prefixes. Each prefix returns a list of suffix-and-count pairs.
4. **Local Matching:** The client receives a list of ~500-800 suffixes. It checks if its own suffix (`F37F9D8...`) is in that list. If it is, the password is "pwned."

## 3. System Efficiency and Scalability

HIBP scales efficiently because it avoids "computation" during the request phase.

- **99% Cache Hit Ratio:** Because the 5-character prefix is a static identifier, Cloudflare caches the response for each of the ~1 million possible prefixes at the edge. Most requests never even reach Troy Hunt’s Azure infrastructure; they are served from a data center near the user.

- **Optimized Data Format:** The API returns a simple text response (Suffix:Count). This minimizes payload size and overhead, allowing for lightning-fast parsing on mobile devices.

- **Cost Efficiency:** By offloading the "search" work to the client (comparing the suffix) and the "delivery" work to the CDN (caching), the actual compute costs for HIBP are remarkably low—reportably less than the cost of a daily coffee for a system serving millions.

## 4. Why This Matters

This design solves the Privacy-Utility Paradox. Usually, to check a set for a member, you must reveal the member. HIBP proves that with clever hashing and sharding (k-anonymity), you can provide 100% utility with 0% privacy compromise.


### Performance Summary
<table class="bordered-table">
  <tr>
    <th>Metric</th>
    <th>Performance</th>
  </tr>
  <tr>
    <td>Search Complexity</td>
    <td>$O(1)$ via Hash-indexed lookups</td>
  </tr>
  <tr>
    <td>Latency</td>
    <td>&lt;100ms (Edge cached)</td>
  </tr>
  <tr>
    <td>Data Volume</td>
    <td>15B+ Records</td>
  </tr>
  <tr>
    <td>Privacy Level</td>
    <td>Mathematical Zero-Knowledge</td>
  </tr>
</table>

## References
- [Have I Been Pwned - Official Site](https://haveibeenpwned.com/)
- [Have I Been Pwned - Architecture Overview](https://www.troyhunt.com/introducing-have-i-been-pwned/)
- [Working with 154 Million Records on HIBP](https://www.troyhunt.com/working-with-154-million-records-on/)
- [Cloudflare Case Study: Troy Hunt](https://www.cloudflare.com/en-in/case-studies/troy-hunt/)
- [Understanding HIBP's Use of SHA-1 and k-Anonymity](https://www.troyhunt.com/understanding-have-i-been-pwneds-use-of-sha-1-and-k-anonymity/)