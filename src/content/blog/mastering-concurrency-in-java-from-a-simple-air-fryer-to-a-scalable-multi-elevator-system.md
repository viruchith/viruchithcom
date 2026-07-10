---
title: "Mastering Concurrency in Java: From a Simple Air Fryer to a Scalable Multi-Elevator System"
description: "Master Java concurrency from scratch! Learn how to manage thread-safe state updates using AtomicInteger, wait/notify, and LinkedBlockingQueue through hands-on Air Fryer and Multi-Elevator system simulations. Prevent data races and scale your multi-threaded apps efficiently."
publishDate: 2026-06-16
category: "Java Concurrency"
tags:
    - Java
    - Concurrency
    - Multi-threading
    - Thread Safety
    - AtomicInteger
heroImage: ../../assets/blog/mastering-concurrency-in-java-from-a-simple-air-fryer-to-a-scalable-multi-elevator-system-cover.png
heroAlt: Illustration of a multi-elevator system
featured: false
draft: false
---

State mutation across multiple threads is one of the most challenging aspects of software engineering. When two or more threads attempt to read and write to the same memory location simultaneously, you risk encountering **race conditions, data corruption, and thread starvation**.

To understand how Java handles concurrent value updates cleanly and safely, we will examine three progressively complex real-world simulations:

1. **The Air Fryer Timer:** Managing simple async state updates between a UI thread and a timer thread.
2. **The Single Elevator:** Coordinating asynchronous physical movement with decoupled user intent.
3. **The Multi-Elevator System:** Scaling out architecture using decoupled workers, dispatchers, and thread-safe collections.

---

## 1. The Air Fryer Timer: Simple Shared State with, *AtomicInteger*

Imagine programming an air fryer. It has two primary components running concurrently:

* A **hardware timer** counting down every second.
* A **physical button** that adds `+1 minute` to the timer whenever pressed.

If both the countdown loop and the button handler attempt to modify a primitive `int timeRemaining`, a race condition occurs. If the user presses the button at the exact millisecond the clock ticks down, the update could be dropped entirely.

### The Solution: Memory Atomicity

Java provides the `java.util.concurrent.atomic` package to handle low-level lock-free thread safety. `AtomicInteger` uses a CPU-level instruction called **Compare-And-Swap (CAS)** to guarantee that reads and writes happen as an atomic (indivisible) operation.

```java
import java.util.Scanner;
import java.util.concurrent.atomic.AtomicInteger;

public class AirFryerTimer {
    // Thread-safe shared state
    private static final AtomicInteger timeRemainingSeconds = new AtomicInteger(15); 
    private static volatile boolean isRunning = true;

    public static void main(String[] args) {
        System.out.println("--- Air Fryer Started (15s baseline) ---");
        System.out.println("Press [ENTER] to add 1 minute (60s) to the timer!");

        // Thread 1: The Background Countdown Worker
        Thread countdownThread = new Thread(() -> {
            while (isRunning) {
                int currentLeft = timeRemainingSeconds.get();
                
                if (currentLeft <= 0) {
                    System.out.println("\n*BEEP BEEP BEEP* Food is ready!");
                    isRunning = false;
                    System.exit(0);
                }

                System.out.printf("\rTime remaining: %02d:%02d ", currentLeft / 60, currentLeft % 60);

                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }

                // Safely decrement the atomic counter
                timeRemainingSeconds.decrementAndGet();
            }
        });

        countdownThread.start();

        // Thread 2: Main UI Listening Thread
        Scanner scanner = new Scanner(System.in);
        while (isRunning) {
            scanner.nextLine(); // Blocks until user hits Enter
            if (isRunning) {
                // Safely add 60 seconds across thread boundaries
                timeRemainingSeconds.addAndGet(60);
                System.out.print("\n[+] Added 1 minute!");
            }
        }
        scanner.close();
    }
}

```

### Why this works:

The `volatile` keyword on `isRunning` ensures visibility across CPU cores, telling the countdown thread immediately if the application has shut down. `addAndGet()` and `decrementAndGet()` eliminate data races without the heavy performance overhead of `synchronized` locks.

---

## 2. The Single Elevator: State-Driven Thread Coordination

As applications grow, state management shifts from modifying numbers to coordinating **physical actions and states**.

Consider a single elevator cabin. It can be moving `UP`, moving `DOWN`, or `IDLE`. A user can request floors at any point. We cannot just use an `AtomicInteger` here because an elevator has to process a *sequence* of floors in order, rather than just changing a single total value.

### The Solution: Decoupling with a Work Queue

Instead of having user inputs directly manipulate the elevator's behavior, we introduce a thread-safe Queue. The user thread *produces* work, and the elevator cabin thread *consumes* work.

```java
import java.util.Scanner;
import java.util.TreeSet;

public class SingleElevatorSystem {
    
    enum Direction { UP, DOWN, IDLE }

    static class ElevatorCabin implements Runnable {
        private int currentFloor = 0;
        private Direction direction = Direction.IDLE;
        
        // TreeSet automatically keeps requested floors sorted
        private final TreeSet<Integer> destinations = new TreeSet<>();

        // Synchronized block ensures exclusive access to the destination set
        public synchronized void requestFloor(int floor) {
            destinations.add(floor);
            notify(); // Wake up the elevator thread if it's waiting/idle
        }

        private synchronized Integer getNextDestination() throws InterruptedException {
            while (destinations.isEmpty()) {
                direction = Direction.IDLE;
                System.out.println("\n[Elevator] Idle. Waiting for requests...");
                wait(); // Sleep the thread until a new request is added
            }
            
            // Basic algorithm: Pick the closest requested floor
            int closest = destinations.first();
            int minDistance = Math.abs(currentFloor - closest);
            
            for (int floor : destinations) {
                if (Math.abs(currentFloor - floor) < minDistance) {
                    closest = floor;
                    minDistance = Math.abs(currentFloor - floor);
                }
            }
            destinations.remove(closest);
            return closest;
        }

        @Override
        public void run() {
            try {
                while (true) {
                    int targetFloor = getNextDestination();
                    direction = (targetFloor > currentFloor) ? Direction.UP : Direction.DOWN;

                    while (currentFloor != targetFloor) {
                        Thread.sleep(1000); // 1 second per floor
                        currentFloor += (direction == Direction.UP) ? 1 : -1;
                        System.out.printf("[Elevator] Passing Floor %d (%s)\n", currentFloor, direction);
                    }
                    
                    System.out.printf(" >> ARRIVED AT FLOOR %d. Opening Doors. <<\n", currentFloor);
                    Thread.sleep(1500); // Door open simulation
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    public static void main(String[] args) {
        ElevatorCabin cabin = new ElevatorCabin();
        new Thread(cabin, "Elevator-Cabin-Thread").start();

        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter floor numbers (0-10) to summon elevator:");
        
        while (true) {
            if (scanner.hasNextInt()) {
                int floor = scanner.nextInt();
                cabin.requestFloor(floor);
            }
        }
    }
}

```

### Why this works:

By using Java's built-in `wait()` and `notify()`, the elevator cabin thread consumes **zero CPU cycles** when there are no requests. The thread simply parks itself and is awoken instantly when the producer thread invokes `requestFloor()`.

---

## 3. Scaling to a Multi-Elevator System

![Scaled Elevator Architecture](/articles/images/java-concurrency-elevator-architecture.webp) 

What happens when a high-rise building needs three, five, or fifty elevators running concurrently?

If we keep using basic `wait/notify` synchronization on a single shared object, we quickly run into **lock contention**. Moreover, users don't press buttons inside a specific elevator when standing in the lobby; they press an external call button, and a **Central Dispatcher** must determine the optimal car for the job.

### The Scaled Architecture: Producer-Consumer Engine

To scale seamlessly, we must apply structural decoupling principles:

1. **Central Dispatcher Thread:** Receives external hall calls, evaluates the positions of all cars, and assigns tasks.
2. **Independent Elevator Worker Threads:** Each car maintains an isolated `LinkedBlockingQueue`. They know nothing about other cars; they simply execute work pushed to them by the dispatcher.
3. **Concurrent Data Collections:** Using `CopyOnWriteArrayList` and `AtomicInteger` allows the dispatcher to inspect system states without locking up the elevator threads.

```java
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

public class MultiElevatorSystem {

    static class Elevator implements Runnable {
        private final int id;
        private final AtomicInteger currentFloor = new AtomicInteger(0);
        
        // A thread-safe, non-blocking queue dedicated entirely to this car
        private final LinkedBlockingQueue<Integer> taskQueue = new LinkedBlockingQueue<>();

        public Elevator(int id) { this.id = id; }
        public int getId() { return id; }
        public int getCurrentFloor() { return currentFloor.get(); }
        public int getWorkloadSize() { return taskQueue.size(); }

        public void assignFloor(int floor) {
            taskQueue.add(floor); // Completely thread-safe, non-blocking append
        }

        @Override
        public void run() {
            try {
                while (true) {
                    // .take() handles thread parking automatically under the hood if queue is empty
                    int targetFloor = taskQueue.take(); 
                    executeMovement(targetFloor);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }

        private void executeMovement(int targetFloor) throws InterruptedException {
            while (currentFloor.get() != targetFloor) {
                Thread.sleep(1000); 
                if (currentFloor.get() < targetFloor) {
                    currentFloor.incrementAndGet();
                } else {
                    currentFloor.decrementAndGet();
                }
                System.out.printf("[Elevator %d] Passing Floor %d\n", id, currentFloor.get());
            }
            System.out.printf(" >> [Elevator %d] ARRIVED at Floor %d. <<\n", id, currentFloor.get());
            Thread.sleep(1500); 
        }
    }

    static class Dispatcher {
        // CopyOnWriteArrayList allows lock-free reads while configuring the array
        private final List<Elevator> fleet = new CopyOnWriteArrayList<>();

        public void spawnElevator(Elevator e) {
            fleet.add(e);
            new Thread(e, "Elevator-" + e.getId()).start();
        }

        // Dispatch Heuristic Logic
        public void dispatchCall(int requestedFloor) {
            System.out.printf("\n[System] Call received for Floor %d!\n", requestedFloor);
            Elevator optimalCar = null;
            int lowestCost = Integer.MAX_VALUE;

            for (Elevator car : fleet) {
                // Cost function = Proximity distance + (Backlog penalty * multiplier)
                int cost = Math.abs(car.getCurrentFloor() - requestedFloor) + (car.getWorkloadSize() * 2);
                if (cost < lowestCost) {
                    lowestCost = cost;
                    optimalCar = car;
                }
            }

            if (optimalCar != null) {
                System.out.printf("[System] Dispatched Elevator %d to Floor %d\n", optimalCar.getId(), requestedFloor);
                optimalCar.assignFloor(requestedFloor);
            }
        }
    }

    public static void main(String[] args) {
        Dispatcher dispatcher = new Dispatcher();

        // Easily scale by adding more independent instances
        dispatcher.spawnElevator(new Elevator(1));
        dispatcher.spawnElevator(new Elevator(2));
        dispatcher.spawnElevator(new Elevator(3));

        Scanner scanner = new Scanner(System.in);
        System.out.println("Multi-Elevator engine live. Enter a floor call (0-10):");

        while (true) {
            if (scanner.hasNextInt()) {
                int floor = scanner.nextInt();
                if (floor >= 0 && floor <= 10) {
                    dispatcher.dispatchCall(floor);
                }
            }
        }
    }
}

```

---

## Architectural Takeaways

| Metric | Air Fryer (Shared Primitive) | Single Elevator (Coordinated Actions) | Multi-Elevator (Scalable Micro-Engine) |
| --- | --- | --- | --- |
| **Concurrency Tool** | `AtomicInteger` + `volatile` | `synchronized` + `wait()` / `notify()` | `LinkedBlockingQueue` + `CopyOnWriteArrayList` |
| **State Scope** | Global Shared State | Localized Object Monitor | Distributed Isolated States |
| **Bottleneck** | Minimal (Low CAS collision) | Low (Single thread tracking) | None (Perfect scaling via independent queues) |

When writing concurrent applications in Java, avoid managing low-level thread tracking manually whenever possible. Moving from simple atomic primitives to high-level thread-safe abstractions (`LinkedBlockingQueue`) lets you transform complex thread synchronization problems into seamless, elegant message-passing pipelines.