/**
 * ContentService.cls
 *
 * @author          Piotrek, Finally Sp. z o.o.
 * @date            26.06.2020
 * @description
 *
 */
public inherited sharing class ContentService{


    public static List<ContentService.Content> getContents(ConnectApi.ManagedContentVersionCollection contentList) {
        System.Debug('getContents' + contentList.total);
        List<ContentService.ManagedContent> contents = new List<ContentService.ManagedContent>();
        for(ConnectApi.ManagedContentVersion item : contentList.items){
            contents.add(new ContentService.ManagedContent(item));
        }
        return contents;
    }

    public virtual class Content {
        @AuraEnabled public String contentClass;
    }

    public class ManagedContent extends Content {
        public transient ConnectApi.ManagedContentVersion contentVersion;
        @AuraEnabled public Map<String,Object> data;

        public ManagedContent(ConnectApi.ManagedContentVersion contentVersion){
            this.contentClass = ManagedContent.class.toString();
            this.contentVersion = contentVersion;
            this.setData(this.contentVersion);
        }

        private void setData(ConnectApi.ManagedContentVersion contentVersion){
            if(contentVersion==null)
                throw new ManagedContentException('Empty ConnectApi.ManagedContentVersion provided!');

            this.data = new Map<String, Object>{
                'main'                  => this.getMainAttributesByName(contentVersion),
                'contentNodes' => this.getContentNodesByName(contentVersion)
            };
        }

        private Map<String, Object> getMainAttributesByName(ConnectApi.ManagedContentVersion contentVersion){
            return new Map<String,Object>{
             'contentUrlName' => contentVersion.contentUrlName,
             'language' => contentVersion.language,
             'managedContentId' => contentVersion.managedContentId,
             'publishedDate' => contentVersion.publishedDate,
             'title' => contentVersion.title,
             'type' => contentVersion.type,
             'typeLabel' => contentVersion.typeLabel
            };
        }

        private Map<String, Object> getContentNodesByName(ConnectApi.ManagedContentVersion contentVersion){
            Map<String,Object> contentNodesByName = new Map<String, Object>();

            for(String sContentNodeKey : this.contentVersion.contentNodes.keySet()){
                ConnectApi.ManagedContentNodeValue contentNode = this.contentVersion.contentNodes.get(sContentNodeKey);

                if(contentNode instanceof ConnectApi.ManagedContentTextNodeValue){
                    ConnectApi.ManagedContentTextNodeValue textContentNode = (ConnectApi.ManagedContentTextNodeValue) contentNode;
                    if(textContentNode.nodeType == ConnectApi.ConnectManagedContentNodeType.RichText){
                        contentNodesByName.put(
                            sContentNodeKey,
                            new ContentService.ManagedContentTextNodeValue(textContentNode.nodeType.name(),
                                StringService.getInstance(textContentNode.value)
                                    .replaceLowerThanTags()
                                    .replaceGraterThanTags()
                                    .getValue()
                            )
                        );
                    }
                    else {
                        contentNodesByName.put(sContentNodeKey, contentNode);
                    }
                }
                else {
                    contentNodesByName.put(sContentNodeKey, contentNode);
                }
            }

            return contentNodesByName;
        }
    }

    public class SObjectContent extends Content {
        @AuraEnabled public SObject record;
    }

    public class ManagedContentTextNodeValue {
        @AuraEnabled public String  nodeType;
        @AuraEnabled public String value;

        public ManagedContentTextNodeValue(String nodeType, String value){
            this.nodeType = nodeType;
            this.value = value;
        }
    }

    public class ManagedContentException extends Exception{}
}