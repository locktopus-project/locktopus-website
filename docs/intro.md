---
sidebar_position: 1
---

# Locktopus

## What problem does it solve?

In a distributed system there _always_ is a need to coordinate access to resources. Without such, multiple processes may access the same resources at the same time (data race). This may lead to deadlocks, lost updates and consistency violations. **Locktopus** is a service that addresses this problem by serializing clients' access to conflicting resources. It receives a set of resources that need to be accessed from a client and locks them as soon as nobody is using them.

## Features

- **FIFO** lock order
- **subtree locking**. Lock resources as precise as you need
- **multiple resources** can be locked at once
- **Read/Write** locks for separate resources within one lock session
- **Live communication** (WebSocket) ensures a client is notified of his lock's state as soon as it is changed
- Near-**constant** lock/unlock **time**. There are no explicit queues under the hood, just goroutines, hashmaps and mutexes

## Locktopus vs Redlock

One might ask why not use [Redlock](https://redis.io/docs/manual/patterns/distributed-locks/) instead. Redlock is a good tool for distributed locking, designed for running in a cluster. It is quite supported by the community and has a lot of client libraries. But there are limitations to it, some of which are:

- no option to lock multiple resources at once
- no read/write locks, just write locks
- time overhead
- no FIFO lock order
- livelocks are possible

The brief considerations about cluster mode are given in the section below.

## Cluster

Since the service is about coordinating access to resources between other services, one might consider running it in a cluster, similar to Redlock, to avoid having a single point of failure. Here is not an in-built solution for that, but it can be implemented manually. The only thing one should remember to avoid deadlocks is to perform locking (no matter whether enqueue or acquire) on different nodes in the same order by all clients. This way all the liveness and safety properties of Redlocks are preserved and additionally, the locks will be acquired in FIFO order. The drawback here, in comparison to Redlock, is that in the optimistic case (no lock conflicts) Redlock will be faster due to parallel locking, though not providing FIFO lock order.
