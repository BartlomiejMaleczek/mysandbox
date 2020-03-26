/**
 * Created by Lenovo on 20.04.2017.
 */
@isTest
public with sharing class AccountManagerTest {

    @TestSetup
    public static void setup() {
        Account account = new Account(
                        Name = 'Test1Account',
                        Active__c = 'Yes',
                        SLAExpirationDate__c = Date.newInstance(2017, 4, 22),
                        SLA__c = 'Gold',
                        SLASerialNumber__c = '436439'
        );

        insert account;

        Contact[] contacts = new Contact[]{
                new Contact(
                        LastName = 'Test1Contact1',
                        AccountId = account.Id
                ),
                new Contact(
                        LastName = 'Test1Contact2',
                        AccountId = account.Id
                ),
                new Contact(
                        LastName = 'Test2Contact1',
                        AccountId = account.Id
                )
        };

        insert contacts;
    }

    @isTest
    public static void testGetAccountAndContactsByAccountId() {
        Account account = [
          SELECT
                  Id,
                  Name
          FROM Account
        ];

        System.debug(account);

        RestRequest request = new RestRequest();
        request.requestUri = 'https://eu11.salesforce.com/services/apexrest/Accounts/' + account.Id + '/contacts';
        request.httpMethod = 'GET';
        RestContext.request = request;


        Account responseAccount =  AccountManager.getAccount();

        System.debug(responseAccount);
        System.assert(responseAccount != null);
        System.assertEquals(account.Name, responseAccount.Name);

    }
}