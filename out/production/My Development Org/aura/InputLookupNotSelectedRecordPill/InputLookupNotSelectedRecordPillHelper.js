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

    filterCurrentRecords: function (cmp, helper, search) {
        var results = [];
        var fieldsToSearch = cmp.get("v.fieldsToSearch");
        var items = cmp.get('v.records');

        search = search.trim().toLowerCase();

        if (search && search.length) {
            results = items.filter(function (item) {
                for (var i = 0; i < fieldsToSearch.length; i++) {
                    var value = cmp.find('UtilsService').fetchByString(item, fieldsToSearch[i]);

                    if (typeof value == 'string') {
                        value = value.toLowerCase();
                    }

                    if (value && String(value).indexOf(search) != -1) {
                        return true;
                    }
                }
            });

            cmp.set('v.currentRecords', results);

        } else {
            cmp.set("v.currentRecords", cmp.get("v.records"));
        }

        cmp.set("v.isLoading", false);
    },

    fireModifySearchParamsEvt: function (cmp, helper, search) {
        cmp.find('InputLookupEvtHandler').fireModifySearchParamsLookupEvt(search);
    },
})