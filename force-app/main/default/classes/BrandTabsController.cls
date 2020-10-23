/**
 * Created by BMaleczek on 26.06.2020.
 */

public with sharing class BrandTabsController {
    @AuraEnabled(cacheable=true)
    public static Map<String,List<ContentService.Content>> getAllBrandContentByTopicApex(){
        return ManagedContentController.getAllBrandContentByTopic();
    }
}