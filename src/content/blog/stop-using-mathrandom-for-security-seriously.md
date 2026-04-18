---
title: Stop Using Math.random() for Security (Seriously)
description: Stop compromising your Spring Boot security with Math.random(). Learn why java.util.Random is predictable and how to implement SecureRandom for cryptographically strong tokens, session IDs, and API keys.
publishDate: 2026-01-12
category: Java
tags:
  - Java
  - SecureProgramming
  - Random
  - Entropy
  - Security
heroImage: ../../assets/blog/stop-using-mathrandom-for-security-seriously-cover.png
heroAlt: Randomness image.
featured: false
draft: false
---

As Java developers, we reach for Math.random() instinctively. It’s static, easy to type, and works perfectly for retries or UI animations.

But if you are using it to generate password reset tokens, session IDs, or API keys, you are introducing a vulnerability into your application.

Here is why you need to switch to SecureRandom.

## 1. The Predictability Trap

Under the hood, Math.random() uses java.util.Random. This is a Linear Congruential Generator. It takes a "seed" (usually the system time) and runs a formula.

The flaw? It is deterministic. If an attacker can guess the seed (e.g., they know roughly when a token was generated), they can mathematically predict the sequence of future numbers. It provides statistical randomness, not cryptographic randomness.

## 2. The Fortified Alternative

java.security.SecureRandom is a Cryptographically Strong Pseudo-Random Number Generator (CSPRNG).

It doesn't rely solely on a formula. It draws from an entropy pool provided by the OS (mouse movements, thread timing, hardware noise). Because the source material is unpredictable, the output is resistant to prediction attacks.

## 3. When to use which?

### ❌ Math.random() / java.util.Random

  - Speed: Very Fast
  - Predictability: High
  - Use Case: Games, Simulations, Load Balancing, UI

### ✅ java.security.SecureRandom

  - Speed: Slower (can block if entropy is low)
  - Predictability: Near Impossible
  - Use Case: Session IDs, OTPs, Passwords, Cryptography

### The Fix (Code Snippet)

```java
//Don't do this: 
 double token = Math.random(); // Vulnerable to brute-force
```

### Do this instead:

```java
SecureRandom secureRandom = new SecureRandom(); 
byte[] values = new byte[24]; secureRandom.nextBytes(values); 
String safeToken = Base64.getUrlEncoder().withoutPadding().encodeToString(values);
```
## Summary: 
If the randomness protects data or access, use SecureRandom. If the randomness is just for functionality, Math.random() is fine. Don't compromise your Spring Boot app's security for convenience!

**Reference:** https://youtu.be/XDsYPXRCXAs?si=8Hr7nGbHm53-1Igd