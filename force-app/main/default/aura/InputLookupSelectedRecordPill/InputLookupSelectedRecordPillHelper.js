({
    getMainFieldValueToDisplay: function (cmp, helper, selectedRecord) {
        var mainFieldToDisplay = cmp.get("v.mainFieldToDisplay");
        cmp.set("v.mainFieldValueToDisplay", selectedRecord[mainFieldToDisplay.apiName]);
    }
})