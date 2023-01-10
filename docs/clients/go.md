# Go

## Installation

```
go get github.com/locktopus-project/locktopus/pkg/client/v1@v1.0.0
```

## Usage

The client's code is self-descriptive but requires understanding the [Concept](../concept.md).

Example:

```go
package main

import (
	"fmt"
	"log"

	v1 "github.com/locktopus-project/locktopus/pkg/client/v1"
)

func main() {
	c, err := v1.MakeClient(v1.ConnectionOptions{
		Host:      "localhost",
		Port:      9009,
		Namespace: "mycompany",
	})

	defer func() {
		err := c.Close()
		if err != nil {
			fmt.Printf("cannot close connection: %s", err.Error())
		}
	}()

	if err != nil {
		log.Fatal("cannot connect to Locktopus server")
	}

	for _, year := range []int{2020, 2021, 2022} {
		// Declare which resources we need to lock
		c.AddLockResource(v1.LockTypeRead, "sales", "banana", "quarter", fmt.Sprintf("%d/1", year))
		c.AddLockResource(v1.LockTypeRead, "sales", "banana", "quarter", fmt.Sprintf("%d/2", year))
		c.AddLockResource(v1.LockTypeRead, "sales", "banana", "quarter", fmt.Sprintf("%d/3", year))
		c.AddLockResource(v1.LockTypeRead, "sales", "banana", "quarter", fmt.Sprintf("%d/4", year))

		c.AddLockResource(v1.LockTypeWrite, "sales", "banana", "year", fmt.Sprint(year))

		if err := c.Lock(); err != nil {
			log.Fatal("cannot lock resources")
		}

		// If not acquired, wait for it
		if !c.IsAcquired() {
			if err := c.Acquire(); err != nil {
				log.Fatal("cannot acquire lock")
			}
		}

		// { Process data somehow }

		// Release the resources
		if err := c.Release(); err != nil {
			log.Fatal("cannot release lock")
		}
	}
}
```
