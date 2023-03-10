---
sidebar_position: 1
---

# Overview

Locktopus is a piece of software for managing locks written in Go.

## What problem does it solve?

Quite often in a backend application, multiple processes access the same data at the same time.
This is called a race condition, and it is just a natural state of things in the World. 
But in software, they may lead to deadlocks, lost updates, consistency violations, etc. 
**Locktopus** addresses this problem by serializing access to resources.

## Features

- **FIFO** lock order
- **subtree locking**. Lock resources as precise as you need
- **multiple resources** can be locked at once
- **Read/Write** locks for separate resources within one lock session
- **Live communication** (WebSocket) ensures a client is notified of his lock's state as soon as it is changed
- Near-**constant** lock/unlock **time**. There are no explicit queues under the hood, just goroutines, hashmaps and mutexes

## How to work with that?

Setting up Locktopus and working with it is simple:

Run the [Server](installation.md) - it will receive requests from clients and lock resources for them.

As a client, you need to set up a connection to the server (actually, just provide the connection parameters).
Then, every time you want to work with shared resources, your steps are as follows:

1. Specify what resources you need to access
2. Lock them (they may be acquired immediately or enqueued. In the latter case, you will need to wait until they are acquired)
3. Do what you need with the resources
4. Release (unlock) them
