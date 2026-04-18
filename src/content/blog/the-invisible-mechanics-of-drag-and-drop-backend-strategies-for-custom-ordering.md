---
title: "The Invisible Mechanics of Drag-and-Drop: Backend Strategies for Custom Ordering"
description: Solve the 'write cascade' problem in custom ordering. Explore backend strategies for drag-and-drop systems, comparing Integer Sequencing, Floating Point Ranking, and Lexicographical Ranking (Lexorank) for performant, O(1) database updates.
publishDate: 2026-02-04
category: Ranking
tags:
  - Ranking
  - Algorithm
  - Computer Science
  - Lexo Rank
  - TODO app
heroImage: ../../assets/blog/the-invisible-mechanics-of-drag-and-drop-backend-strategies-for-custom-ordering-cover.png
heroAlt: TODO's ranking comic illustration.
featured: false
draft: false
---
It is a feature users take for granted. You are in a TODO app like Todoist, or a Kanban board like Trello or Jira. You grab a task card, drag it three spots down, and drop it. It stays there. It seems simple.

Behind that satisfying drag-and-drop interaction lies one of the trickier problems in backend data design: storing and efficiently updating arbitrary, user-defined order.

Databases are inherently designed to store data based on insertion order or primary key indexes. They do not naturally understand that "Buy Milk" must come after "Walk Dog" just because a user decided it so.

This article explores the backend techniques used by leading applications to implement performant custom ordering.

## The Core Problem: Read vs. Write

When designing for custom order, we are balancing two opposing forces:

- **Efficient Reads:** When loading a list, the database must quickly return items sorted by their custom order.
- **Efficient Writes (Moves):** When a user drops an item into a new position, the backend must update the ordering data with minimal impact on the database.

The challenge is that a single move in the UI can theoretically disrupt the ordering of every other item in the list.

1. The Naive Approach: Integer Sequencing

The most intuitive first attempt is usually to add an integer column (e.g., position or sequence_id) to the items table.

```
ID	Task Name	Position
101	Buy Milk	1
102	Walk Dog	2
103	Write Code	3
104	Deploy	    4
```
**How it works:** To display the list, you just `ORDER BY Position ASC`.

**The Problem (The "Write Cascade"):** Imagine moving "Buy Milk" (Position 1) to between "Write Code" and "Deploy" (new Position 3).

To maintain a clean sequence (1, 2, 3, 4), you cannot just change Buy Milk's position to 3. You must also shift everything that was in between.

- Walk Dog needs to change from 2 -> 1.
- Write Code needs to change from 3 -> 2.
- Buy Milk needs to change from 1 -> 3.

A single user action triggers an O(N) update operation, where N is the number of items between the old and new positions. In a busy Kanban board with hundreds of tickets in a column, this causes massive database locking and performance degradation. This approach is suitable only for very small, rarely reordered lists.

## The Modern Solutions: "Gap" Strategies
To solve the write cascade problem, modern applications use techniques that allow inserting an item between two others without modifying surrounding items. This requires creating "gaps" in the ordering sequence.

There are two primary implementations of this strategy: Floating Point Ranking and Lexicographical Ranking.

### Technique A: Floating Point Ranking (The Midpoint Method)
Instead of integers (1, 2, 3), use floating-point numbers (or doubles) for the position column.
```
ID	Task Name	Rank (Float)
101	Buy Milk	10000.0
103	Write Code	20000.0
104	Deploy	    30000.0
```
**The Move Operation (O(1)):** A user drags a new task, "Walk Dog," and drops it between "Buy Milk" and "Write Code."

The backend calculates the average of the ranks surrounding the new location: (Rank Above + Rank Below) / 2 (10000.0 + 20000.0) / 2 = 15000.0

"Walk Dog" is assigned rank 15000.0. Only one row in the database is updated.

If another item is dropped between "Buy Milk" (10000.0) and "Walk Dog" (15000.0), it gets rank 12500.0

#### The Limitations:

- **Precision Exhaustion:** Eventually, you run out of decimal places. Computers have finite precision for floating-point numbers. If you divide enough times, (A + B) / 2 might equal A or B due to rounding errors, making it impossible to insert between them.
- **Rebalancing:** To fix this, you need a background process that periodically detects tight gaps and "rebalances" the list, resetting ranks to nice, spaced-out integers (10000, 20000, 30000) to restore precision buffers.

### Technique B: Lexicographical Ranking (String Ranking)
This is the industry standard for high-volume applications like Jira (which famously uses an algorithm called "Lexorank") and Trello.

Instead of numbers, it uses strings for ranking. The database sorts these strings alphabetically.

```
ID	Task Name	Rank (String)
101	Buy Milk	"aaaa"
103	Write Code	"cccc"
104	Deploy	    "eeee"
```
**The Move Operation (O(1)):** A user drops "Walk Dog" between "aaaa" and "cccc".

The backend needs to generate a string that is alphabetically greater than "aaaa" but less than "cccc". The simplest midpoint is "bbbb".

Move "Walk Dog" between "aaaa" and "bbbb"? -> Generate "aamm". Move between "aaaa" and "aamm"? -> Generate "aagg".

It is essentially calculating the midpoint using base-26 (or wider) math instead of base-10 numbers.

#### The Advantages:

- **Arbitrary Precision:** Unlike floating-point numbers, strings can grow indefinitely. You can always append another character to find a midpoint. Between "a" and "b" is "am". Between "a" and "am" is "af".
- **O(1) Updates:** You only ever update the moved item's rank.

#### The Limitations:

- **String Growth:** Over many moves, rank strings can become very long (e.g., "aaaabaacaada...""). Long strings increase storage size and slightly slow down database indexing operations.
- **Implementation Complexity:** Implementing the string math logic correctly covers many edge cases (e.g., moving to the very top, very bottom, or between "azzz" and "baaa"). Fortunately, open-source libraries exist for most languages to handle this.

## Reference:

[Managing LexoRank | Administering Jira applications Data Center 11.3 | Atlassian Documentation](https://confluence.atlassian.com/adminjiraserver/managing-lexorank-938847803.html)