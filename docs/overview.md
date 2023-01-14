---
sidebar_position: 1
---

# Overview

## What is Locktopus?

Locktopus is a service for managing locks written in Go.

## What problem does it solve?

In a distributed system there _always_ is a need to coordinate access to resources. Without such, multiple processes may access the same resources at the same time (data race). This may lead to deadlocks, lost updates and consistency violations. **Locktopus** is a service that addresses this problem by serializing clients' access to resources.

## Features

- **FIFO** lock order
- **subtree locking**. Lock resources as precise as you need
- **multiple resources** can be locked at once
- **Read/Write** locks for separate resources within one lock session
- **Live communication** (WebSocket) ensures a client is notified of his lock's state as soon as it is changed
- Near-**constant** lock/unlock **time**. There are no explicit queues under the hood, just goroutines, hashmaps and mutexes

## How to work with that?

Setting up Locktopus and working with it is simple. The basic idea:

Run the [Server](installation.md) - it will receive requests from clients and lock resources for them.
As a client, all you need is to set up your connection to the server (actually, just provide the connection parameters).

Then, every time you want to work with shared resources safely, you need to:

1. Specify what resources you need to access
2. Lock them (they might be acquired immediately or enqueued. In the latter case, you will need to wait until they are acquired)
3. Do what you need with the resources
4. Release (unlock) them
