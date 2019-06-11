({
    fetchFieldsToSearch: function (cmp, helper) {
        var mainFieldToDisplay = cmp.get("v.mainFieldToDisplay");
        var additionalFieldsToDisplay = cmp.get("v.additionalFieldsToDisplay");
        var fieldsToSearch = [];

        fieldsToSearch.push(mainFieldToDisplay.apiName);

        additionalFieldsToDisplay.forEach(function (elem) {
            fieldsToSearch.push(elem.apiName);
        });

        cmp.set("v.fieldsToSearch", fieldsToSearch);
    },

    getDefaultCustomProfile: function (cmp, helper, name) {
        return {
            Id: null,
            Name: name,
            Expertise__c: 'Other'
        };
    }
})