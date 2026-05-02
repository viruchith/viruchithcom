---
title: "The Synchronization Engine: How Agoda and OTAs Prevent Double Bookings"
description: Ever wonder how Agoda stops double bookings when the last room is listed on Expedia too? This guide explains the complex system design and APIs. Learn about distributed locks, eventual consistency, and how OTAs coordinate to keep inventory accurate across platforms.
publishDate: 2026-04-19
category: Systems Design
tags:
  - Systems Design
  - Distributed Systems
  - Hotel Booking
  - OTAs
  - PMS
heroImage: ../../assets/blog/the-synchronization-engine-how-agoda-and-otas-prevent-double-bookings-cover.png
heroAlt: An illustration of a synchronization engine connecting Agoda and OTAs to prevent double bookings, with locks and APIs depicted.
featured: false
draft: false
---
In the high-speed world of online travel, a single hotel room in Tokyo can be listed simultaneously on Agoda, Booking.com, Expedia, and the hotel’s own website. Despite thousands of users clicking "Book" every second, the "Double Booking" (selling the same room to two different people for the same night) is a remarkably rare event.

This feat is achieved through a sophisticated, multi-layered distributed system architecture that relies on **real-time synchronization, atomic transactions, and distributed locking.**

## 1. The High-Level Architecture
There is no single "Global Database" that tracks every hotel room. Instead, the industry uses a hierarchical architecture consisting of three primary components:

1.  **Property Management System (PMS):** The local "Source of Truth" at the hotel. It manages room cleaning status, guest check-ins, and physical inventory.
2.  **Channel Manager:** The "Central Sync Engine." This middleware acts as a high-speed router between the hotel's PMS and the various booking sites.
3.  **Online Travel Agencies (OTAs):** The front-end applications (Agoda, Expedia) that users interact with.

![Hotel Booking Architecture](public/articles/images/hotel-booking-architecture.png "Hotel Booking Architecture")

## 2. Preventing the "Race Condition": The Two-Phase Booking Flow
The most critical challenge is the **Race Condition**: two people on two different continents clicking "Pay" at the exact same millisecond for the last available room.

To prevent this, systems use a **Two-Phase Commit-style logic**:

### Phase A: The Soft Check (Availability Search)
When you search for a room on Agoda, you are usually seeing **cached data**. To provide sub-second search results, Agoda doesn't query the hotel for every search. It queries its own high-speed NoSQL database (like **Couchbase** or **Redis**). This data might be 30 seconds old.

### Phase B: The Hard Check & Atomic Lock (The Checkout)
The moment you click "Book Now" and enter the checkout page:
1.  **The API Call:** Agoda sends a real-time request to the **Channel Manager** or the **Hotel PMS** via an API.
2.  **Inventory Locking:** If the room is available, the hotel’s system places a **Distributed Lock** on that specific room-night. In database terms, this is an **Atomic Operation**. For a window of 5–10 minutes, that room is "reserved" but not "sold."
3.  **The Confirmation:** Once your payment is verified, the "Lock" is converted into a "Commit." The room is officially decremented from the inventory across all other platforms.

## 3. Core Technologies and Systems Design

### A. API Standards (OTA & HTNG)
Most communication happens via **RESTful APIs** or older **SOAP** protocols. The industry follows standards set by **OpenTravel (OTA)** and **HTNG (Hospitality Technology Next Generation)**. These ensure that an XML or JSON packet from Agoda is understood by a PMS built in another country.

### B. The ARI Feed (Availability, Rates, and Inventory)
Channel Managers maintain what is called an **ARI Feed**.
* **Availability:** Is the room open for sale?
* **Rates:** What is the price for tonight?
* **Inventory:** How many units are left?
Whenever a change occurs in the PMS (e.g., a walk-in guest takes a room), the PMS pushes an ARI update to the Channel Manager, which then broadcasts "Webhooks" to all connected OTAs to update their local caches.

### C. Distributed Message Brokers (Kafka / RabbitMQ)
To handle millions of updates, these systems are **Event-Driven**. When a booking occurs:
1.  A "Booking Event" is published to a message broker like **Apache Kafka**.
2.  Multiple microservices "consume" this event:
    * **Inventory Service:** Updates the database.
    * **Notification Service:** Sends the confirmation email.
    * **External Sync Service:** Notifies other agencies to remove the room.

### D. Data Consistency Models
Booking systems must balance the **CAP Theorem** (Consistency, Availability, and Partition Tolerance).
* For **Searching**, they prioritize **Availability** (showing you results quickly, even if slightly outdated).
* For **Booking**, they prioritize **Consistency** (ensuring the financial and inventory records are 100% accurate) using ACID-compliant relational databases like **PostgreSQL** or **SQL Server**.

## 4. Why Overbookings Still Happen
Despite this technology, overbookings occasionally occur due to:
* **Sync Latency:** A 2-second delay in a network connection during peak traffic.
* **Manual Over-selling:** Hotels sometimes intentionally overbook by 1-2% (like airlines), assuming there will be "no-shows."
* **Legacy Systems:** Some older hotels still use "Fax-based" or manual entry systems that don't support real-time API syncing.

## Conclusion
The "Central System" isn't a single computer, but a highly coordinated dance of distributed APIs and Channel Managers. By using **Atomic Locking** at the source of truth (the PMS) and **Real-time Webhooks** for the distributors (Agoda), the industry ensures that the room you see is the room you get.
