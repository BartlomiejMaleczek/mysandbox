/**
 * Created by Lenovo on 19.04.2017.
 */

@IsTest
private class AccountProcessorTest {

    @TestSetup
    public static void setup() {
        Account[] accounts = new Account[]{
                new Account(
                        Name = 'Test1Account',
                        Active__c = 'Yes',
                        SLAExpirationDate__c = Date.newInstance(2017, 4, 22),
                        SLA__c = 'Gold',
                        SLASerialNumber__c = '43643'
                ),
                new Account(
                        Name = 'Test2Account',
                        Active__c = 'Yes',
                        SLAExpirationDate__c = Date.newInstance(2017, 5, 22),
                        SLA__c = 'Gold',
                        SLASerialNumber__c = '425432'
                ),
                new Account(
                        Name = 'Test3Account',
                        Active__c = 'Yes',
                        SLAExpirationDate__c = Date.newInstance(2017, 6, 22),
                        SLA__c = 'Gold',
                        SLASerialNumber__c = '42535762'
                )
        };

        insert accounts;

        Contact[] contacts = new Contact[]{
                new Contact(
                        LastName = 'Test1Contact1',
                        AccountId = accounts.get(0).Id
                ),
                new Contact(
                        LastName = 'Test1Contact2',
                        AccountId = accounts.get(0).Id
                ),
                new Contact(
                        LastName = 'Test2Contact1',
                        AccountId = accounts.get(1).Id
                ),
                new Contact(
                        LastName = 'Test2Contact2',
                        AccountId = accounts.get(1).Id
                ),
                new Contact(
                        LastName = 'Test2Contact3',
                        AccountId = accounts.get(1).Id
                )
        };

        insert contacts;
    }

    @isTest
    public static void testFutureMethodCountContacts() {
        List<Id> accountsIds = new List<Id>();

        for (Account account : [SELECT Id FROM Account]) {
            accountsIds.add(account.Id);
        }

        Test.startTest();
        AccountProcessor.countContacts(accountsIds);
        Test.stopTest();

        List<Account> accounts = [
                SELECT
                        Id,
                        Number_of_Contacts__c
                FROM Account
        ];

        System.assertEquals(2, accounts.get(0).Number_of_Contacts__c);
        System.assertEquals(3, accounts.get(1).Number_of_Contacts__c);
        System.assertEquals(0, accounts.get(2).Number_of_Contacts__c);
    }
}