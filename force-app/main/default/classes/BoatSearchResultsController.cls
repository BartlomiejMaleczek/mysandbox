public with sharing class BoatSearchResultsController {
    @AuraEnabled
    public static List<Boat__c> queryBoatsApex() {
        List<Boat__c> boats = [
                SELECT Id, Name, BoatType__c, Picture__c, Price__c, Length__c, Year_Built__c
                FROM Boat__c
        ];

        return boats;

    }
}