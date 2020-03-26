public with sharing class BoatSearchResults {
    @AuraEnabled
    public static List<Boat__c> getBoats(String boatTypeId) {

        String query = String.join(new List<String>{
                'SELECT Id, Name, BoatType__c, Picture__c, Price__c, Length__c, Year_Built__c, Geolocation__Latitude__s, Geolocation__Longitude__s',
                'FROM Boat__c'
        }, ' ');

        if(boatTypeId != null && !String.isEmpty(boatTypeId)) {
            query = query + ' WHERE BoatType__c = \'' + boatTypeId + '\'';
        }

        return Database.query(query);

    }
}