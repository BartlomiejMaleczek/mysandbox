/**
 * Created by Lenovo on 23.03.2017.
 */

@RestResource(urlMapping='/v1/accounts/')
global with sharing class HttpCalloutSample {

    public static final String url = 'https://th-apex-http-callout.herokuapp.com';

    // Pass in the endpoint to be used using the string url
    @HttpGet
    global static APEX_Customer__c doGet() {

        //RestRequest req = RestContext.request;
        //RestResponse res = RestContext.response;

        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('GET');

        HttpResponse res = h.send(req);
        System.debug('odpowiedz' + res.getBody());
        //String jsonTemp = (String) res.getBody().
        Response resp = (Response) JSON.deserialize(res.getBody(), Response.class);

        APEX_Customer__c obj = [SELECT Id, Name from APEX_Customer__c where Name = 'Test'];
        System.debug(obj);
        String jsonString = JSON.serialize(obj);
        System.debug('JSON:' + jsonString );
        return obj;
    }

    @HttpPost
    global static APEX_Customer__c something(APEX_Customer__c something){
        return something;
    }

    global class Response{
        String trailhead;
    }


}