public with sharing class DatatableController {


    @AuraEnabled
    public static List<Account> getAccountsApex() {
        return [
                SELECT Id, Name
                FROM Account
//                LIMIT 3
        ];
    }
}