---
sidebar_position: 4
---

# Questions And Answers

## Does the server support TLS?

No (at least, currently). The service is supposed to be used in in-house systems, not for public use. However, if you still need TLS/SSL, consider using a proxy server for that.

## Is the service persistent?

No. The service operates with in-memory data. Stopping an instance aborts all connections. Currently, no restore mechanism is implemented for connections as it will rather complicate the system which is designed to be rather simple.

## Can I just check whether a lock is free without acquiring it?

There is no out-of-the-box solution for that, though there is no practical need for implementing that. But if you still need a reason to check whether a lock is free or not, you can just lock it and then release it. If the lock has been acquired immediately, that means it was free.

## What is the Playground?

The [Playground](https://playground.locktopus.xyz/) is a web application for testing locks. It requires connecting to an instance of Locktopus.

## Can I limit the number of processes acquiring shared access to a resource?

There is no out-of-the-box mechanism for that, but a workaround exists.
To achieve that, you need to open _N_ connections and enqueue a set of resources from 1 to _N_ in parallel. When the first one is acquired release the rest. When the lock is not needed, release the locked one. For example, if you want to implement a semaphore for 4 threads:

1. Open 4 connections and lock resources in parallel:

```
semaphore/abc/1 -> enqueued, waiting...
semaphore/abc/2 -> enqueued, waiting...
semaphore/abc/3 -> [enqueued,] acquired
semaphore/abc/4 -> enqueued, waiting...
```

2. Release all connections except the first one acquired:

```
semaphore/abc/1 -> release
semaphore/abc/2 -> release
semaphore/abc/4 -> release
```

1. Do what you need when keeping lock `semaphore/abc/4`
2. Release the lock

```
semaphore/abc/3 -> release
```

The technique has the following drawbacks:

- adds a tiny time overhead for clients
- adds a tiny memory overhead for the server
