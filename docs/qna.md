---
sidebar_position: 8
---

# Questions And Answers

## Why can't I just use Redis for locking?

Redis is a great tool that runs side-by-side with almost every modern web application. If you already have Redis in your stack, you can use it for locking without the need to add another software. But if locks are an important part of your application, consider using Locktopus. The main features that distinguish it from Redis are described in the [overview](overview.md#features).

## Does the server support TLS?

No. The service is supposed to be used in private environments. However, if you need TLS/SSL, consider adding a proxy server for that.

## Does it have authentication?

No.

## Is the service persistent?

No. The service operates with in-memory data. Stopping an instance aborts all connections.
Currently, no restore mechanism is implemented for connections as it will rather complicate the system which is designed to be rather simple.

## Can I just check whether a lock is free without acquiring it?

Checking resources' states without interacting with them is not implemented. If you still have a reason to check whether a lock is free or not, you can just lock it and then release it. If the lock has been acquired immediately, that means it was free at the moment of checking. This adds a tiny memory overhead to the server so it is not recommended for frequent programmatic use.

---

#### Have some questions? Need any help?

Feel free to use any of these options:

- open an [issue](https://github.com/locktopus-project/locktopus-website/issues)
- contact the maintainer directly: **locktopus.project@gmail.com**
- edit this page
