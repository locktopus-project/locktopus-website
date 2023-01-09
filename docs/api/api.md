# General

Locktopus runs an HTTP server. Currently, only one API version is supported.

Additionally, there are two GET endpoints for getting the server's status and statistics.

## Status page

`GET /` to retrieve the user-readable server's status page.

## Namespace stats

`GET /stats?namespace={NAMESPACE_NAME}` to retrieve the `NAMESPACE_NAME`'s statistics in JSON format.
The structure of the output is not stable (thus, not documented). It exposes some internal statistics. If the namespace has not been opened by clients, the server responds with 404.

## V1 (Websocket)

Refer to [API_V1](./api_v1.md) to get the details of the **V1 WebSocket** protocol.
