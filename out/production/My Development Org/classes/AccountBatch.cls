/**
 * Created by Lenovo on 27.03.2017.
 */

global class AccountBatch implements Database.batchable<Integer>,Database.AllowsCallouts, Database.Stateful, Schedulable {

    public static String urlToken = 'https://login.salesforce.com/services/oauth2/token';
    public static String requestBody = 'grant_type=password&client_id=3MVG9Rd3qC6oMalWqzcw0Pctrv0ZlFl8W5U63iu68DTvUWqf436KJMWUA5AwjU.uu1JM2vNduGx6exQYMtNqn&client_secret=6002736739139733712&username=api.user%40dev.sandbox&password=ApiUser0317sjpCQIKraWe8ys0npbDFpucsy';
    public static String suffixUrl = '/services/apexrest/accounts';
    public JsonResponse jsonRes;


    global Iterable<Integer> start(Database.BatchableContext info) {

        System.debug('Wykonuje START');

        Http httpToken = new Http();
        HttpRequest reqToken = new HttpRequest();
        reqToken.setEndpoint(urlToken);
        reqToken.setBody(requestBody);
        reqToken.setMethod('POST');

        HttpResponse resToken = httpToken.send(reqToken);
        System.debug('Body odpowiedzi' + resToken.getBody());

        jsonRes = (JsonResponse) JSON.deserialize(resToken.getBody(), JsonResponse.class);
        Integer numOfChunks = getChunksNum();

        List<Integer> numerOfChunksList = new List<Integer>();
        for(Integer i = 0; i < numOfChunks ; i < i++) {
            numerOfChunksList.add(i);
        }

        return numerOfChunksList;
    }
    global void execute(SchedulableContext sc) {
    }

    global void execute(Database.BatchableContext info, List<Integer> scope) {
        Integer firstElement = 0;
        System.debug('Wykonuje execute');
        System.debug('Rozmiar tablicy' + scope.size());
        System.debug('Scope: ' + scope.get(firstElement));
        List<Account> acc = /*(List<Account>)*/ getChunk(scope.get(firstElement));

        insert acc;
    }

    global void finish(Database.BatchableContext info) {
//        System.debug('finish');
//        Messaging.reserveSingleEmailCapacity(1);
//        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
//        String[] toAddresses = new String[] {'piotr.kozuchowski@genecloud.pl'};
//        mail.setToAddresses(toAddresses);
//        mail.setHtmlBody('Siemianko');
//        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });

    }

    global class JsonResponse {
        String access_token;
        String instance_url;
    }

    global Integer getChunksNum() {

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

    public List<Account> getChunk(Integer chunkNbr) {

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

        List<Account> accList = (List<Account>)JSON.deserialize(resOneChunk.getBody(), List<Account>.class);
        return accList;
    }
}