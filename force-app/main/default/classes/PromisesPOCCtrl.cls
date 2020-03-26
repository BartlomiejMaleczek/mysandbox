/**
 * Created by BMaleczek on 19.09.2017.
 */

public with sharing class PromisesPOCCtrl {


    @AuraEnabled
    public static List<Account> getAccountsApex() {
        return [SELECT Id, Name FROM Account LIMIT 100];
    }


    @AuraEnabled
    public static List<Contact> getContactsApex() {
        return [SELECT Id, FirstName, LastName FROM Contact LIMIT 10];
    }

    @AuraEnabled
    public static List<Case> getCasesApex() {
        return [SELECT Id FROM Case LIMIT 20];
    }
}