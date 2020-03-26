({
    handleInit: function (cmp, evt, helper) {
      var recordId = cmp.get("v.recordId");
        cmp.find('UtilsService').setTimeout(
            cmp,
            function () {
                helper.navigateToComponent(cmp, recordId, 'c:AccountMembersManager')
            },
            1000
        );
    }
})