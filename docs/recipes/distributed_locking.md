# Distributed Lock

Distributed locking is needed when we want to have locks distributed across multiple nodes to avoid having a single point of failure. As the reference implementation, we can take [Relock](https://redis.io/docs/manual/patterns/distributed-locks).
Redlock is a good tool for distributed locking, designed for running in a cluster. It is quite supported by the community and has a lot of client libraries (though implemented differently). But there are limitations to it, some of which are:

- possible violation of correctness in the algorithm itself (see [Martin Kleppmann's blog](https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html))
- no option to lock multiple resources at once
- no read/write locks, only write locks
- time overhead on retries

Distributed locks can be implemented with Locktopus similar to Redlock, but without having the above downsides.
Unfortunately, currently, there is no out-of-the-box solution for that, so it requires manual implementation. The only thing one should keep in mind to avoid deadlocks is to enqueue locks on different nodes in the same order by all clients. To completely acquire the lock it needs to acquire it on N/2+1 nodes. This way locks are guaranteed to be acquired in FIFO order.

But before doing that, please consider the conceptual drawback of using lock _leases_: **having acquired a lock does not guarantee exclusive access to the resource.**. A good description of the issue can be found in the same [article](https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html) by Martin Kleppmann (see _Protecting a resource with a lock_).
