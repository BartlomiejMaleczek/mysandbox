/**
 * ManagedContentController.cls
 *
 * @author          Piotrek, Finally Sp. z o.o.
 * @date            24.06.2020
 * @description
 *
 */
public with sharing class ManagedContentController{

    @AuraEnabled(cacheable=true)
    public static List<ContentService.Content> getAllFeatureContent(){
        return ContentService.getContents(
            new ContentSelector().getAllManagedContent(ContentSelector.ManagedContentType.Feature.name())
        );
    }

    @AuraEnabled(cacheable=true)
    public static List<ContentService.Content> getAllFeaturesGroupContent(){
        return ContentService.getContents(
            new ContentSelector().getAllManagedContent(ContentSelector.ManagedContentType.Features_Group.name())
        );
    }

    @AuraEnabled(cacheable=true)
    public static List<ContentService.Content> getAllBrandContent(){
        return ContentService.getContents(
            new ContentSelector().getAllManagedContent(ContentSelector.ManagedContentType.Brand.name())
        );
    }

//    public class MCController{
//        @AuraEnabled public String managedContentIdsStr { get; set; }
//        @AuraEnabled public String topicNamesStr { get; set; }
//        @AuraEnabled public String contentType { get; set; }
//        @AuraEnabled public String errorMessage { get; set; }
//        @AuraEnabled public String communityId {get; set; }
//        @AuraEnabled public List<ConnectApi.ManagedContentVersion> results { get; set; }
//
//        public MCController(String contentType){
//            communityId  = (Network.getNetworkId()==null)
//                                        ? '0DB1x0000004HUGGA2'
//                                        : Network.getNetworkId();
//
//            getMContent(contentType);
//        }
//
//        public void getMContent(String contentType) {
//            List<String> contentIds = new List<String>();
//            List<String> topicNames = new List<String>();
//            try{
//                if(topicNamesStr != null && !String.isEmpty(topicNamesStr)){
//                    topicNames = topicNamesStr.split(',',-1);
//                }
//
//                for(Integer i=0; i<topicNames.size(); i++){
//                    topicNames.set(i,topicNames.get(i).trim());
//                }
//
//                String language = 'en_US';
//                //Note: "news" is the contenttype of the content value hard coded in the code here.
//                ConnectApi.ManagedContentVersionCollection contentList = ConnectApi.ManagedContent.getManagedContentByTopicsAndIds(communityId, contentIds, topicNames, 0, 25, language, contentType);
//                System.debug(JSON.serializePretty(ContentService.getContents(contentList)));
//
//                List<CMSContentWrapper> contentWrappers = new List<CMSContentWrapper>();
//                for(ConnectApi.ManagedContentVersion item : contentList.items){
//                    contentWrappers.add(new CMSContentWrapper(item));
////                    for(ConnectApi.ManagedContentNodeValue node : item.contentNodes.values()){
////                        if(node instanceof  ConnectApi.ManagedContentTextNodeValue){
////                            ConnectApi.ManagedContentTextNodeValue tNode = (ConnectApi.ManagedContentTextNodeValue) node;
////                            if(tNode.nodeType == ConnectApi.ConnectManagedContentNodeType.RichText){
////
////                                System.debug(tNode.value);
////                            }
//////                            }
//////                            tNode.value = StringService.replaceLowerThanTags(tNode.value);
//////                            tNode.value = StringService.replaceGraterThanTags(tNode.value);
////
//////                            node = tNode;
////                        }
//////                        if(node.nodeType == ConnectApi.​ManagedContent​NodeType.RichText){
//////                            ConnectApi.ManagedContentTextNodeValue tNode = (ConnectApi.ManagedContentTextNodeValue) node;
//////                            tNode.value = StringService.replaceLowerThanTags(tNode.value);
//////                            tNode.value = StringService.replaceGraterThanTags(tNode.value);
//////                            node = tNode;
//////                        }
////                    }
//                }
//                results = contentList.items;
//                System.Debug('contentWrappers:::' + JSON.serializePretty(contentWrappers));
//                System.Debug('Content:::' + JSON.serializePretty(results));
//            }
//            catch(ConnectApi.ConnectApiException e){
//                errorMessage = e.getMessage();
//                System.debug('Error Message : '+e);
//                ApexPages.addMessages(e);
//                results = new List<ConnectApi.ManagedContentVersion>();
//            }
//        }
//    }
}