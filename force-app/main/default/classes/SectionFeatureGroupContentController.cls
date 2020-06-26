public with sharing class SectionFeatureGroupContentController extends VisualEditor.DynamicPickList{

    @AuraEnabled(cacheable=true)
    public static ConnectApi.ManagedContentVersion getFeaturesGroupContentApex(String contentType){
//        String newRichText = replaceAll("<[^>]*>", "");
        ConnectApi.ManagedContentTextNodeValue managedContentTextNodeValue;
        for(ConnectApi.ManagedContentVersion managedContentVersion : ManagedContentController.getFeaturesGroupContent()) {
            managedContentTextNodeValue = (ConnectApi.ManagedContentTextNodeValue) managedContentVersion.contentNodes.get('Name');
            if(contentType.equalsIgnoreCase(managedContentTextNodeValue.value)) {
                return managedContentVersion;
            }

        }

        return null;
    }

    public override VisualEditor.DataRow getDefaultValue(){
        List<ConnectApi.ManagedContentVersion> featureContent = ManagedContentController.getFeaturesGroupContent();
        ConnectApi.ManagedContentTextNodeValue managedContentTextNodeValue = (ConnectApi.ManagedContentTextNodeValue) featureContent.get(0).contentNodes.get('Name');
        VisualEditor.DataRow defaultValue = new VisualEditor.DataRow(managedContentTextNodeValue.value, managedContentTextNodeValue.value);
        return defaultValue;
    }

    public override VisualEditor.DynamicPickListRows getValues() {
        List<ConnectApi.ManagedContentVersion> featureContent = ManagedContentController.getFeaturesGroupContent();
        ConnectApi.ManagedContentTextNodeValue managedContentTextNodeValue;
        VisualEditor.DynamicPickListRows  myValues = new VisualEditor.DynamicPickListRows();

        for(ConnectApi.ManagedContentVersion managedContentVersion : featureContent) {
            managedContentTextNodeValue = (ConnectApi.ManagedContentTextNodeValue) managedContentVersion.contentNodes.get('Name');
            myValues.addRow(new VisualEditor.DataRow(managedContentTextNodeValue.value, managedContentTextNodeValue.value));
        }

        return myValues;
    }
}