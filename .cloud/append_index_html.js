function handler(event, context, callback) {
    if (event.request.uri.endsWith('/')) {
        event.request.uri = event.request.uri + 'index.html';
    }
    return event.request
};