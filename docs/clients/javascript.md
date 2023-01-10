---
title: Javascript
---

# Javascript Client

## Installation

```
npm install @locktopus/client
```

## Usage

The javascript client can be used both in the browser and NodeJS. It is written in Typescript and is self-documented.
Using it requires understanding the [Concept](../concept.md).

When using for NodeJS, additionally install `ws` package for using its `WebSocket` constructor. Otherwise, use `WebSocket` class available in the global namespace.

Example:

```ts
import { LocktopusClient, LOCK_TYPE, Resource } from '@locktopus/client';
import { WebSocket } from 'ws'; // for NodeJS. Otherwise, use WebSocket class from DOM lib (available in the global namespace)

async function aggregateSales() {
  const client = new LocktopusClient(WebSocket, {
    host: 'localhost',
    namespace: 'mycompany',
    port: 9009,
    secure: false,
  });

  await client.connect();

  for (const year of [2020, 2021, 2022]) {
    const resouces: Resource[] = [];

    // Specify resources to lock

    resouces.push({
      type: LOCK_TYPE.READ,
      path: ['sales', 'banana', 'quarter', `${year}/1`],
    });
    resouces.push({
      type: LOCK_TYPE.READ,
      path: ['sales', 'banana', 'quarter', `${year}/2`],
    });
    resouces.push({
      type: LOCK_TYPE.READ,
      path: ['sales', 'banana', 'quarter', `${year}/3`],
    });
    resouces.push({
      type: LOCK_TYPE.READ,
      path: ['sales', 'banana', 'quarter', `${year}/4`],
    });

    resouces.push({
      type: LOCK_TYPE.WRITE,
      path: ['sales', 'banana', 'quarter', `${year}`],
    });

    // Proceed to locking
    const acquired = await client.lock(...resouces);

    // If not acquired immediately, wait for that
    if (!acquired) {
      await client.acquire();
    }

    // Do the aggregation somehow

    // Release resources as we don't need them anymore
    await client.release();
  }

  client.close();
}
```
