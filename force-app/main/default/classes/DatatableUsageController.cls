public with sharing class DatatableUsageController {


    @AuraEnabled
    public static List<Account> getAccountsApex() {
        return [
                SELECT Id, Name
                FROM Account
//                LIMIT 3
        ];
    }
}