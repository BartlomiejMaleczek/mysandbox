public with sharing class BoatSearchFormController {

    @AuraEnabled
    public static List<BoatType__c> queryBoatTypesApex() {
        List<BoatType__c> boatTypes = [
          SELECT Id, Name
          FROM BoatType__c
        ];


        return boatTypes;
    }
}