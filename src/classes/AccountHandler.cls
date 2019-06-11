/**
 * Created by Lenovo on 19.04.2017.
 */

public with sharing class AccountHandler {

    public static Account insertNewAccount(String accountName) {
        Account account = new Account(
                Name = accountName,
                Active__c = 'Yes',
                SLAExpirationDate__c = Date.newInstance(2017, 4, 22),
                SLA__c = 'Gold',
                SLASerialNumber__c = '43643'
        );

        try{
            insert account;
        }catch(DmlException e) {
            return null;
        }

        account = [
          SELECT
                  Id,
                  Name
          FROM Account
          WHERE Name = :accountName
        ];

        return account;
    }


}