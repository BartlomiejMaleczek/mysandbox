public with sharing class SectionBrandsController {
    @AuraEnabled(cacheable=true)
    public static List<ConnectApi.ManagedContentVersion> getBrandContentApex(){
        return ManagedContentController.getBrandContent();
    }
}