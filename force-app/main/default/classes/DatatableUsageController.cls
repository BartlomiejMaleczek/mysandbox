public with sharing class DatatableUsageController {


    @AuraEnabled
    public static List<Account> getAccountsApex() {
        return [
                SELECT Id, Name, OwnerId, Owner.Name, AccountNumber, Description, Phone, Website, Type
                FROM Account
        ];
    }
}