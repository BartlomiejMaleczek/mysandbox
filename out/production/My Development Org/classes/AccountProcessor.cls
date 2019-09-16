public with sharing class AccountProcessor {

    @future
    public static void countContacts(List<Id> accountIds) {
        List<Contact> contactsList = [
                SELECT
                        Id,
                        AccountId
                FROM Contact
                WHERE AccountId IN :accountIds
        ];

        Map<Id, Account> accountsMap = new Map <Id, Account>([
                SELECT
                        Id,
                        Number_of_Contacts__c
                FROM Account
                WHERE Id IN :accountIds
        ]);

        List<Account> accountsToInsert = new List<Account>();

        Integer countAccountContacts = 0;

        for (Id accountId : accountIds) {
            for (Contact contact : contactsList) {
                if (contact.AccountId.equals(accountId)) {
                    countAccountContacts++;
                }
            }
            Account tempAccount = accountsMap.get(accountId);
            tempAccount.Number_of_Contacts__c = countAccountContacts;
            accountsToInsert.add(tempAccount);
            countAccountContacts = 0;
        }

        update accountsToInsert;
    }
}