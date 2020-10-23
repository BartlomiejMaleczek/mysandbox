public with sharing class SectionBrandsController {
    @AuraEnabled(cacheable=true)
    public static List<ContentService.Content> getBrandContentApex(){
        return ManagedContentController.getAllBrandContent();
    }
}