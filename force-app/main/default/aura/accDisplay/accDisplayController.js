({
    handleInit: function (cmp, evt, helper) {
        var fields = ['Name', 'Industry', 'Description', 'Phone', 'Active__c', 'SLA__c', 'SLAExpirationDate__c', 'SLASerialNumber__c'];
        cmp.set("v.fields", fields);
        console.log($A.get("$SObjectType.CurrentUser.Id"));
        console.log(JSON.stringify($A.get("$SObjectType")));
        console.log($A.get("$SobjectType.Contact.fields.FirstName"));

        // console.log(cmp.get("$SObjectType.CurrentUser.Id"));
        // console.log(cmp.get("$$SObjectType"));

    },

    handleAddId: function (cmp, evt, helper) {
        cmp.set('v.recordId', '0010Y00001Cp1beQAB');
    },

    handleQueryAccount: function (cmp, evt, helper) {
        var id = cmp.get('v.recordId');
        var fields = cmp.get('v.fields');
        cmp.find('simpleCRUDService').queryRecord(id, fields, 'EDIT', function (result) {
            cmp.set("v.queriedRecord", result);
        });
    },

    handleCloneAndInsert: function (cmp, evt, helper) {
        cmp.find('simpleCRUDService').getNewSObject('Account', null, true, function (newObject) {
            var queriedRecord = cmp.get("v.queriedRecord");
            newObject.Name = 'Test Simple Crud Service';

            cmp.find('simpleCRUDService').insertRecord(newObject, function (result) {
               console.log(result);
            });
        });
    },

    handleEdit: function (cmp, evt, helper) {
        var queriedRecord = cmp.get("v.queriedRecord");
        queriedRecord.Name = queriedRecord.Name + '2';
        cmp.find('simpleCRUDService').editRecord(queriedRecord, function(editedObject) {
            console.log('EDITED OBJECT: ', editedObject);
        });
    }
})