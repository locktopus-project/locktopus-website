# Semaphore

Semaphore allows you to limit the number of processes sharing access to a resource.

There is no out-of-the-box mechanism for semaphores in Locktopus, but implementing it on the application level is feasible.
To achieve that, you need to open _N_ connections and enqueue a set of resources from 1 to _N_ in parallel. When the first one is acquired you should immediately release the rest. When the lock is not needed, release the locked one. For example, if you want to implement a semaphore for 4 threads:

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

1. Do what you need when keeping lock for `semaphore/abc/4`
2. Release the lock

```
semaphore/abc/3 -> release
```

This technique has the following drawbacks:

- adds a tiny time overhead for clients
- adds a tiny memory overhead for the server
