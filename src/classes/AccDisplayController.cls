public with sharing class AccDisplayController {
    @AuraEnabled
    public static List<Account> queryAccounts() {
        return [
          SELECT Id, Name
          FROM Account
        ];
    }
}