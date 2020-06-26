/**
 * CMSContentWrapper.cls
 *
 * @author          Piotrek, Finally Sp. z o.o.
 * @date            25.06.2020
 * @description
 *
 */
public with sharing class CMSContentWrapper{
    @AuraEnabled public ConnectApi.ManagedContentVersion contentVersion;
    @AuraEnabled public Map<String,Object> unescapedContentNodes;

    public CMSContentWrapper(ConnectApi.ManagedContentVersion contentVersion){
        this.contentVersion = contentVersion;
        this.unescapedContentNodes = this.getUnescapedContentNodes();
    }

    public class ManagedContentTextNodeValue {
        public String  nodeType;
        public String value;

        public ManagedContentTextNodeValue(String nodeType, String value){
            this.nodeType = nodeType;
            this.value = value;
        }
    }

    private Map<String, Object> getUnescapedContentNodes(){
        Map<String, Object> unescapedContentNodes = new Map<String, Object>();

        for(String sContentNodeKey : this.contentVersion.contentNodes.keySet()){
            ConnectApi.ManagedContentNodeValue contentNode = this.contentVersion.contentNodes.get(sContentNodeKey);

            if(contentNode instanceof ConnectApi.ManagedContentTextNodeValue){
                ConnectApi.ManagedContentTextNodeValue textContentNode = (ConnectApi.ManagedContentTextNodeValue) contentNode;
                if(textContentNode.nodeType == ConnectApi.ConnectManagedContentNodeType.RichText){
                    unescapedContentNodes.put(
                        sContentNodeKey,
                        new  ManagedContentTextNodeValue(textContentNode.nodeType.name(),
                        StringService.getInstance(textContentNode.value)
                            .replaceLowerThanTags()
                            .replaceGraterThanTags()
                            .getValue()
                        )
                    );
                }
            }
        }

        return unescapedContentNodes;
    }
}