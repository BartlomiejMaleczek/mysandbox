/**
 * Created by Lenovo on 19.04.2017.
 */

@IsTest
private class AddPrimaryContactTest {

    @TestSetup
    public static void setup() {
        List<Account> accounts = new List<Account>();
        for (Integer i = 0; i < 50; i++) {
            accounts.add(new Account(
                    BillingState = 'NY',
                    Name = 'TestAccount' + i,
                    Active__c = 'Yes',
                    SLAExpirationDate__c = Date.newInstance(2017, 4, 22),
                    SLA__c = 'Gold',
                    SLASerialNumber__c = '43643' + i
            ));
        }

        for (Integer i = 0; i < 50; i++) {
            accounts.add(new Account(
                    BillingState = 'CA',
                    Name = 'TestAccount' + i,
                    Active__c = 'Yes',
                    SLAExpirationDate__c = Date.newInstance(2017, 4, 22),
                    SLA__c = 'Gold',
                    SLASerialNumber__c = '44643' + i
            ));
        }

        insert accounts;

        Contact contact = new Contact(
                FirstName = 'TestFirstName',
                LastName = 'TestLastName'
        );

        insert contact;
    }

    @isTest
    public static void testAddPrimaryContactWhenBillingStateIsNY(){
        Contact contact = [
          SELECT
                  FirstName,
                  LastName,
                  AccountId
          FROM Contact
          LIMIT 1
        ];

        Test.startTest();
        AddPrimaryContact addPrimaryContact = new AddPrimaryContact(contact, 'NY');
        System.enqueueJob(addPrimaryContact);
        Test.stopTest();

        contact = [
                SELECT
                        FirstName,
                        LastName,
                        AccountId
                FROM Contact
                LIMIT 1
        ];


        List<Contact> contacts = [
                SELECT Id
                FROM Contact
                WHERE Account.BillingState = 'NY'
        ];

        List<Account> accounts = [
            SELECT Id
            FROM Account
            WHERE BillingState = 'NY'
        ];

        System.assertEquals(contacts.size(), accounts.size());
    }

    @isTest
    public static void testAddPrimaryContactWhenBillingStateIsCA(){
        Contact contact = [
                SELECT
                        FirstName,
                        LastName,
                        AccountId
                FROM Contact
                LIMIT 1
        ];

        Test.startTest();
        AddPrimaryContact addPrimaryContact = new AddPrimaryContact(contact, 'CA');
        System.enqueueJob(addPrimaryContact);
        Test.stopTest();

        contact = [
                SELECT
                        FirstName,
                        LastName,
                        AccountId
                FROM Contact
                LIMIT 1
        ];


        List<Contact> contacts = [
                SELECT Id
                FROM Contact
                WHERE Account.BillingState = 'CA'
        ];

        List<Account> accounts = [
                SELECT Id
                FROM Account
                WHERE BillingState = 'CA'
        ];

        System.assertEquals(contacts.size(), accounts.size());
    }
}