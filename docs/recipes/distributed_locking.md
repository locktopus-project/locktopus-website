# Distributed Lock

Distributed locking is needed when we want to have locks distributed across multiple nodes to avoid having a single point of failure. As the reference implementation, we can take [Relock](https://redis.io/docs/manual/patterns/distributed-locks).
Redlock is a good tool for distributed locking, designed for running in a cluster. It is quite supported by the community and has a lot of client libraries (though implemented differently). But there are limitations to it, some of which are:

- possible violation of correctness in the algorithm itself (see [Martin Kleppmann's blog](https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html))
- no option to lock multiple resources at once
- no read/write locks, only write locks
- time overhead on retries

Distributed locks can be implemented with Locktopus similar to Redlock, but without having the above downsides.
Unfortunately, currently, there is no out-of-the-box solution for that, so it requires manual implementation.

But before doing that, please consider the conceptual drawback of using lock _leases_: **having acquired a lock does not guarantee exclusive access to the resource.**. A good description of the issue can be found in the same [article](https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html) by Martin Kleppmann (see _Protecting a resource with a lock_).

The overall steps are as follows:

0. Determine the order of nodes to iterate over. This order must be the same for all clients.
1. Enqueue the lock at least on N/2+1 nodes one-by-one for the defined set of resources.
2. Acquire the enqueued locks (in parallel).
3. When you are done, release all acquired locks.

This way locks are guaranteed to be acquired in FIFO order.
