({
    handleInit: function (cmp, evt, helper) {
        helper.queryBoatTypes(cmp, helper);
    },

    handleCreateNewRecord: function (cmp, evt, helper) {
        // var windowHash = 'https://bartlomiejmaleczek-dev-ed.lightning.force.com/lightning/r/Account/0011n00001kxe2HAAQ/view';

        var newBoatType = cmp.find('selectBoatType').get("v.value");
        if($A.util.isUndefinedOrNull(newBoatType) || $A.util.isEmpty(newBoatType)) {
        } else {
            var createRecordEvent = $A.get("e.force:createRecord");
            cmp.set("v.isCreateRecordEventFired", createRecordEvent);
            createRecordEvent.setParams({
                "entityApiName": "Boat__c",
                "defaultFieldValues": {
                    'BoatType__c' : newBoatType
                }
                // , "panelOnDestroyCallback": function(event) {
                //     window.location.hash = windowHash;
                // }
            });
            createRecordEvent.fire();
        }
    },

    onFormSubmit: function (component, evt, helper) {
        var formSubmitEvt = component.getEvent("formsubmit");
        var newBoatType = component.find('selectBoatType').get("v.value");

        formSubmitEvt.setParams({
            'formData' : {
                'boatTypeId': newBoatType
            }
        });
        formSubmitEvt.fire();
    }
})