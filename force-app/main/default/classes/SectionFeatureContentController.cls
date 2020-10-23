public with sharing class SectionFeatureContentController {

    @AuraEnabled(cacheable=true)
    public static List<ContentService.Content> getFeatureContentApex(){
        return ManagedContentController.getAllFeatureContent();
    }
//    extends VisualEditor.DynamicPickList


//    public override VisualEditor.DataRow getDefaultValue(){
//        VisualEditor.DataRow defaultValue = new VisualEditor.DataRow('red1', 'RED1');
//        return defaultValue;
//    }
//
//    public override VisualEditor.DynamicPickListRows getValues() {
//        VisualEditor.DataRow value1 = new VisualEditor.DataRow('red1', 'RED1');
//        VisualEditor.DataRow value2 = new VisualEditor.DataRow('yellow1', 'YELLOW1');
//        VisualEditor.DynamicPickListRows  myValues = new VisualEditor.DynamicPickListRows();
//        myValues.addRow(value1);
//        myValues.addRow(value2);
//        return myValues;
//    }

//    public class DynamicContentPicklist extends VisualEditor.DynamicPickList{
//
//
//    }
}