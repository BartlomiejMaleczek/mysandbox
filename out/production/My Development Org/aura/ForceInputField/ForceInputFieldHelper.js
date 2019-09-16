({
    decreaseUserLookupInputContainerSize: function (cmp) {
        const sldsSize12Of12ClassName = 'slds-size-12-of-12';
        const sldsSize11Of12ClassName = 'slds-size-11-of-12';

        var userLookInputContainerElem = cmp.find('userLookupContainer');
        if($A.util.hasClass(userLookInputContainerElem, sldsSize12Of12ClassName)) {
            $A.util.removeClass(userLookInputContainerElem, sldsSize12Of12ClassName);
            $A.util.addClass(userLookInputContainerElem, sldsSize11Of12ClassName);
        }
    },

    increaseUserLookupInputContainerSize: function (cmp) {
        const sldsSize12Of12ClassName = 'slds-size-12-of-12';
        const sldsSize11Of12ClassName = 'slds-size-11-of-12';

        var userLookInputContainerElem = cmp.find('userLookupContainer');
        if($A.util.hasClass(userLookInputContainerElem, sldsSize11Of12ClassName)) {
            $A.util.removeClass(userLookInputContainerElem, sldsSize11Of12ClassName);
            $A.util.addClass(userLookInputContainerElem, sldsSize12Of12ClassName);
        }
    },

    fireAddAccountMemberEvt: function (cmp, newAccountTeamMember) {
        var cmpEvent = cmp.getEvent("forceInputFieldEvt");
        cmpEvent.setParams({
            "action" : "addNewAccountTeamMember",
            "payload" : newAccountTeamMember
        });
        cmpEvent.fire();
    }
})