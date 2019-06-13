({
    queryRecords: function (cmp, helper, searchParams) {
            return new Promise(function (resolve, reject) {
                cmp.find('ApexService').callApex(
                    cmp,
                    "c.queryRecordsApex",
                    {
                        "searchParamsMapJSON": (searchParams ? JSON.stringify(searchParams) : searchParams),
                        "classType": cmp.get("v.classType")
                    },
                    function onSuccess(cmp, results) {
                        cmp.set("v.records", results);
                        cmp.set("v.currentRecords", results);
                        if(cmp.get("v.isFirstRecordDefault")) {
                            helper.defaultInputWithFirstRecord(cmp, results);
                        }
                        resolve("Success");
                        cmp.set("v.isLoading", false);
                    },
                    function onFailure(result) {
                        reject('Failure');
                        console.log(result);
                        // helper.fireInputLookupErrorEvt(cmp, result);
                    }
                )
            });
    },

    defaultInputWithFirstRecord: function (cmp, results) {
        if(cmp.find("UtilsService").isValueNotUndefinedOrNull(results) && results.length > 0) {
            cmp.set("v.selectedRecord", results[0]);
        }
    },

    fireInputLookupErrorEvt: function (cmp, errorMsg) {
        cmp.find('InputLookupEvtHandler').fireAddErrorMsgLookupEvt(errorMsg);
    },
    
    isFieldOnChangeNotEmpty: function (searchParams) {
        return searchParams && searchParams.fieldOnChange &&
            searchParams[searchParams.fieldOnChange] &&
            Object.keys(searchParams[searchParams.fieldOnChange]).length &&
            searchParams[searchParams.fieldOnChange].trim();
    },

    callQueryRecordsWithValidation: function (cmp, helper, searchParams) {
        cmp.set("v.isLoading", true);
        if (searchParams && helper.isFieldOnChangeNotEmpty(searchParams)) {
            helper.queryRecords(cmp, helper, searchParams);
        } else if(cmp.get("v.noDynamicParams")) {
            helper.queryRecords(cmp, helper, '');
        }
    },
    
    resetSearchLookup: function (cmp, helper) {
        var searchParams = cmp.get("v.searchParams");
        if(searchParams && searchParams.fieldOnChange) {
            searchParams[searchParams.fieldOnChange] = {};
        }
        cmp.set("v.currentRecords", []);
        cmp.set("v.records", []);
        cmp.set("v.isLoading", false);
    }
})