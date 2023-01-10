---
sidebar_position: 6
---

# Questions And Answers

## Does the server support TLS?

No (at least, currently). The service is supposed to be used in in-house systems, not for public use. However, if you still need TLS/SSL, consider using a proxy server for that.

## Is the service persistent?

No. The service operates with in-memory data. Stopping an instance aborts all connections. Currently, no restore mechanism is implemented for connections as it will rather complicate the system which is designed to be rather simple.

## Can I just check whether a lock is free without acquiring it?

There is no out-of-the-box solution for that, though there is no practical need for implementing that. But if you still have a reason to check whether a lock is free or not, you can just lock it and then release it. If the lock has been acquired immediately, that means it was free. This adds a tiny memory overhead to the server so is not recommended for regular programmatic use.

---

# Have some questions? Need any help?

Feel free to open issues or contact the maintainer directly.

locktopus.project@gmail.com
