({
    queryRecords: function (cmp, helper) {
        var searchParams = cmp.get("v.searchParams");
        if(searchParams && searchParams.length) {
            return new Promise(function (resolve, reject) {
                cmp.find('ApexService').callApex(
                    cmp,
                    "c.queryRecordsApex",
                    {
                        "whereParamsJSON": JSON.stringify(searchParams)
                    },
                    function onSuccess(cmp, results) {
                        cmp.set("v.records", results);
                        cmp.set("v.currentRecords", results);
                        if(cmp.get("v.isFirstRecordDefault")) {
                            helper.defaultInputWithFirstRecord(cmp, results);
                        }
                        resolve("Success");
                    },
                    function onFailure(result) {
                        reject('Failure');
                        // helper.fireInputLookupErrorEvt(cmp, result);
                    }
                )
            });
        }
    },

    defaultInputWithFirstRecord: function (cmp, results) {
        if(cmp.find("UtilsService").isValueNotUndefinedOrNull(results) && results.length > 0) {
            cmp.set("v.selectedRecord", results[0]);
        }
    },

    fireInputLookupErrorEvt: function (cmp, errorMsg) {
        cmp.find('InputLookupEvtHandler').fireAddErrorMsgLookupEvt(errorMsg);
    },

    finalizeRendering: function (cmp, helper) {
        cmp.set("v.isLoading", false);
    }
})