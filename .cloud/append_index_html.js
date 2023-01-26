function handler(event, context, callback) {
    var request = event.request
    if (request.method === "GET") {
        var split = request.uri.split('/')
        var lastSegment = split[split.length - 1]
        if (!lastSegment.includes('.')) {
            request.uri = request.uri + (request.uri.endsWith('/') ? '' : '/') + 'index.html';
        }
    }
    return request
};