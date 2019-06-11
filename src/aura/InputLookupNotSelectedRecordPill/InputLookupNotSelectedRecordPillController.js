({
    handleInit: function (cmp, evt, helper) {
        helper.fetchFieldsToSearch(cmp, helper);
    },

    handleOpenResultList: function (cmp, evt, helper) {
        cmp.set("v.isResultListVisible", true);
    },

    handleCloseResultList: function (cmp, evt, helper) {
        cmp.find('UtilsService').setTimeout(
            cmp,
            function () {
                if(!cmp.get("v.isResultListScrolling")) {
                    cmp.set("v.isResultListVisible", false);
                }
            },
            200
        );
    },

    handleSearch: function (cmp, evt, helper) {
        cmp.set("v.isLoading", true);
        var fieldsToSearch = cmp.get("v.fieldsToSearch");
        var search = cmp.get("v.search").trim().toLowerCase();
        var items = cmp.get('v.records');
        var results = [];

        cmp.find('UtilsService').setTimeout(
            cmp,
            function () {
                if (search) {
                    results = items.filter(function (item) {
                        for (var i = 0; i < fieldsToSearch.length; i++) {
                            var value = cmp.find('UtilsService').fetchByString(item, fieldsToSearch[i]);
                            if (typeof value == 'string') {
                                value = value.toLowerCase()
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
            500
        );
    },

    // handleAddNewCustomProfileOnClick: function (cmp, evt, helper) {
    //     var customProfileName = cmp.get("v.search");
    //     var defaultCustomProfile = helper.getDefaultCustomProfile(cmp, helper, customProfileName);
    //
    //     cmp.find('InputLookupEvtHandler').fireSelectRecordLookupEvt(defaultCustomProfile);
    // },

    // handleAddNewCustomProfileOnEnter: function (cmp, evt, helper) {
    //     var dependentValue = cmp.get("v.dependentValue");
    //     var customProfileName = cmp.get("v.search");
    //
    //     if(dependentValue == 'Other' && customProfileName && evt.which == 13) {
    //         var defaultCustomProfile = helper.getDefaultCustomProfile(cmp, helper, customProfileName);
    //
    //         cmp.find('InputLookupEvtHandler').fireSelectRecordLookupEvt(defaultCustomProfile);
    //     }
    // },

    onFocusInput: function (cmp, evt, helper) {
        var lookupInput = cmp.find('lookupInput');
        if(lookupInput) {
            cmp.find('UtilsService').setTimeout(cmp, function () {
                lookupInput.focus();
            }, 1);
        }
    }
})