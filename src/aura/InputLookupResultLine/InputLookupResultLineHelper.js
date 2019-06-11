({
    getMainFieldValueToDisplay: function (cmp, helper, record) {
        var mainFieldToDisplay = cmp.get("v.mainFieldToDisplay");
        cmp.set("v.mainFieldValueToDisplay", record[mainFieldToDisplay.apiName]);
    },

    fetchAdditionalFieldsToDisplay: function (cmp, helper, record) {
        var additionalFieldsToDisplay = cmp.get("v.additionalFieldsToDisplay");
        var additionalFieldsRefs = [];
        var additionalFieldObj = {};
        var additionalFieldValue = {};
        additionalFieldsToDisplay.forEach(function (elem) {
            additionalFieldValue = record[elem.apiName];
            if(cmp.find('UtilsService').isValidDateType(additionalFieldValue)) {
                additionalFieldValue =  $A.localizationService.formatDate(new Date(additionalFieldValue), "YYYY-MM-DD");
            }

            additionalFieldObj = {label: elem.label, value: additionalFieldValue};
            additionalFieldsRefs.push(helper.createAdditionFieldRef(additionalFieldObj));
        });
        helper.createAdditionalFieldsCmp(cmp, additionalFieldsRefs);

    },

    createAdditionFieldRef: function (additionalField) {
        return ["c:InputLookupResultLineAddField", {
            "additionalField": additionalField
        }];
    },

    createAdditionalFieldsCmp: function (cmp, additionalFieldsRefs) {
        $A.createComponents(
            additionalFieldsRefs,
            function (additionalFieldsCmp, status, errorMessage) {
                if (status === "SUCCESS") {
                    cmp.set("v.additionalFieldsCmp", additionalFieldsCmp);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },
})