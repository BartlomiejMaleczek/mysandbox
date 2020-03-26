({
    navigateToComponent: function (cmp, recordId, componentName) {
        var navigationToCmpObj = {
            componentDef: componentName,
            componentAttributes: {
                recordId: recordId
            }
        };

        const evt = $A.get("e.force:navigateToComponent");
        evt.setParams(navigationToCmpObj);
        evt.fire();
    }
})