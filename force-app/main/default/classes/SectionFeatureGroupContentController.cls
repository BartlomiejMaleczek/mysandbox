public with sharing class SectionFeatureGroupContentController extends VisualEditor.DynamicPickList{

    @AuraEnabled(cacheable=true)
    public static ContentService.Content getFeaturesGroupContentApex(String contentType){
        ContentService.ManagedContent managedContent;
        Map<String, Object> main;
        for(ContentService.Content content : ManagedContentController.getAllFeaturesGroupContent()) {
            managedContent = (ContentService.ManagedContent) content;
            main = (Map<String, Object>) ((Map<String, Object>) managedContent.data).get('main');

            if(contentType.equalsIgnoreCase((String) main.get('title'))) {
                return managedContent;
            }

        }

        return null;
    }

    public override VisualEditor.DataRow getDefaultValue(){
        List<ContentService.Content> featureContent = ManagedContentController.getAllFeaturesGroupContent();
        ContentService.ManagedContent managedContent = (ContentService.ManagedContent) featureContent.get(0);
        Map<String, Object> main = (Map<String, Object>) ((Map<String, Object>) managedContent.data).get('main');

        VisualEditor.DataRow defaultValue = new VisualEditor.DataRow((String) main.get('title'), (String) main.get('title'));
        return defaultValue;
    }

    public override VisualEditor.DynamicPickListRows getValues() {

        VisualEditor.DynamicPickListRows  myValues = new VisualEditor.DynamicPickListRows();
        ContentService.ManagedContent managedContent;
        Map<String, Object> main;
        for(ContentService.Content content : ManagedContentController.getAllFeaturesGroupContent()) {
            managedContent = (ContentService.ManagedContent) content;
            main = (Map<String, Object>) ((Map<String, Object>) managedContent.data).get('main');

            myValues.addRow(new VisualEditor.DataRow((String) main.get('title'), (String) main.get('title')));
        }




//        List<ConnectApi.ManagedContentVersion> featureContent = ManagedContentController.getFeaturesGroupContent();
//        ConnectApi.ManagedContentTextNodeValue managedContentTextNodeValue;
//        VisualEditor.DynamicPickListRows  myValues = new VisualEditor.DynamicPickListRows();
//
//        for(ConnectApi.ManagedContentVersion managedContentVersion : featureContent) {
//            managedContentTextNodeValue = (ConnectApi.ManagedContentTextNodeValue) managedContentVersion.contentNodes.get('Name');
//            myValues.addRow(new VisualEditor.DataRow(managedContentTextNodeValue.value, managedContentTextNodeValue.value));
//        }
//
//        return myValues;
        return myValues;
    }
}