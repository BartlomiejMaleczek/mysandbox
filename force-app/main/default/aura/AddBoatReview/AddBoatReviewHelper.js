({
    onInit: function (component, event, helper) {
        var recordData = component.find('service');
        var boat = component.get("v.boat");
        recordData.getNewRecord(
            'BoatReview__c',
            null,
            true,
            function () {
                var error = component.get("v.recordError");
                var record = component.get("v.record");
                console.log(JSON.stringify(record));
                console.log(JSON.stringify(error));
                if(error || (record === null)) {
                    console.log("Error initializing record template: " + error);
                }
                else {
                    console.log("Record template initialized: " + record.apiName);
                    record.fields.Boat__c = {
                        'displayValue': boat.Id,
                        'value': boat.Id
                    };
                    console.log('1=',JSON.stringify(record));
                    component.set("v.record",  record);
                    console.log('2=', JSON.stringify(component.get("v.record")));
                    // var targetFields = component.get("v.boatReview");
                    // targetFields.Boat__c = boat.Id;
                    component.set("v.boatReview", component.get("v.record"));
                    // component.set("v.boatReview",record);
                    // component.set("v.record", record);
                }
            }
        )
    }
})