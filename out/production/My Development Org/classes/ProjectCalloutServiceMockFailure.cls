@IsTest
global class ProjectCalloutServiceMockFailure implements HttpCalloutMock{
    global HTTPResponse respond(HTTPRequest request) {
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setStatusCode(500);
        response.setBody('Not Created');

        return response;
    }
}