/**
 * Created by Lenovo on 27.03.2017.
 */

@RestResource(urlMapping='/v1/accounts/test')
global with sharing class AccountController {

    public static String urlToken = 'https://login.salesforce.com/services/oauth2/token';
    public static String requestBody = 'grant_type=password&client_id=3MVG9Rd3qC6oMalWqzcw0Pctrv0ZlFl8W5U63iu68DTvUWqf436KJMWUA5AwjU.uu1JM2vNduGx6exQYMtNqn&client_secret=6002736739139733712&username=api.user%40dev.sandbox&password=ApiUser0317sjpCQIKraWe8ys0npbDFpucsy';
    public static String suffixUrl = '/services/apexrest/accounts';
   // public static Map<Integer, List<Account>> accountMap;
    public static List<List<Account>> accountMap;

    @HttpPost
    global static void authorizationMethod(String test) {

        System.debug(test);
        Http httpToken = new Http();
        HttpRequest reqToken = new HttpRequest();
        reqToken.setEndpoint(urlToken);
        reqToken.setBody(requestBody);
        reqToken.setMethod('POST');

        HttpResponse resToken = httpToken.send(reqToken);
        System.debug('Body odpowiedzi' + resToken.getBody());

        JsonResponse jsonRes = (JsonResponse) JSON.deserialize(resToken.getBody(), JsonResponse.class);

        Integer amountOfChunks = getChunksNum(jsonRes);
        for(Integer i = 1 ; i <= amountOfChunks ; i++ ) {
            accountMap.add(getChunk(i, jsonRes));
        }
        //return accountMap;
    }

    global class JsonResponse{
        public String access_token;
        public String instance_url;
    }

    global static Integer getChunksNum(JsonResponse jsonRes) {

        System.debug(jsonRes);
        String finalAccountsUrl = jsonRes.instance_url + suffixUrl;
        Http httpChunks = new Http();
        HttpRequest reqChunks = new HttpRequest();
        reqChunks.setEndpoint(finalAccountsUrl);
        reqChunks.setHeader('Authorization','Bearer ' + jsonRes.access_token);
        reqChunks.setMethod('GET');

        HttpResponse resChunks = httpChunks.send(reqChunks);
        System.debug('Odpowiedz chunka body' + resChunks.getBody());
        Integer chunkNbr = integer.valueOf(resChunks.getBody());

        return chunkNbr;
    }

    public static List<Account> getChunk(Integer chunkNbr, JsonResponse jsonRes) {

        JSONGenerator gen = JSON.createGenerator(true);
        gen.writeStartObject();
        gen.writeNumberField('chunkNbr', chunkNbr);
        gen.writeEndObject();
        System.debug(gen);

        Http httpOneChunk = new Http();
        HttpRequest reqOneChunk = new HttpRequest();
        reqOneChunk.setEndpoint('https://dev-sandbox-dev-ed.my.salesforce.com/services/apexrest/accounts');
        reqOneChunk.setHeader('Authorization','Bearer ' + jsonRes.access_token);
        reqOneChunk.setHeader('Content-Type','application/json');
        reqOneChunk.setBody(gen.getAsString());
        reqOneChunk.setMethod('POST');

        HttpResponse resOneChunk = httpOneChunk.send(reqOneChunk);
        System.debug('Odpowiedz oneChunk' + resOneChunk.getBody());

        List<Account> accList = (List<Account>) JSON.deserialize(resOneChunk.getBody(), List<Account>.class);

        return accList;
    }


}