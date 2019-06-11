({
    handleInit: function (cmp, evt, helper) {
        // var dependentValue = cmp.get("v.dependentValue");
        // if(dependentValue) {
            cmp.find("PromisesService").callPromises(
                cmp,
                helper,
                [
                    ['queryRecords'],
                ],
                'finalizeRendering'
            );
        // }
    },

    handleInputLookupEvt: function (cmp, evt, helper) {
        if(cmp.find('InputLookupEvtHandler').isSelectRecordLookupEvtActionType(evt)) {
            var payload = evt.getParam('payload');
            cmp.set("v.selectedRecord", payload.selectedRecord);
        } else if(cmp.find('InputLookupEvtHandler').isRemoveSelectedRecordLookupEvtActionType(evt)) {
            cmp.set("v.selectedRecord", {});
            cmp.set("v.currentRecords", cmp.get("v.records"));
            cmp.find('InputLookupNotSelectedRecordPill').focusInput();
        }
    }

    // handleOnChangeDependentValue: function (cmp, evt, helper) {
    //     var dependentValue = cmp.get("v.dependentValue");
    //
    //     cmp.set("v.selectedRecord", {});
    //     cmp.set("v.records", []);
    //     cmp.set("v.currentRecords", []);
    //     cmp.set("v.isResultListVisible", false);
    //
    //     if(dependentValue && dependentValue != 'Other') {
    //             cmp.set("v.isLoading", true);
    //             cmp.find("PromisesService").callPromises(
    //                 cmp,
    //                 helper,
    //                 [
    //                     ['queryRecords'],
    //                 ],
    //                 'finalizeRendering'
    //             );
    //     }
    // }
})