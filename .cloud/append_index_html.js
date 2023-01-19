function handler(event, context, callback) {
    var request = event.request
    if (request.method === "GET") {
        var splitted = request.uri.split('/')
        var lastSegment = splitted[splitted.length - 1]
        if (!lastSegment.includes('.')) {
            request.uri = request.uri + (request.uri.endsWith('/') ? '' : '/') + 'index.html';
        }
    }
    return request
};