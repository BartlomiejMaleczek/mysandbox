({
    getLookupFieldValue: function (cmp, evt, helper) {
        return cmp.get("v.accountTeamMember");
    },

    handleOnChangeAccountTeamMember: function (cmp, evt, helper) {
        const iconAddUserButtonContinerName = 'iconAddUserButtonContiner';
        const smallMarginClassName = 'slds-p-top--x-small';
        const mediumMarginClassName = 'slds-p-top--medium';

        var accountTeamMember = cmp.get("v.accountTeamMember");
        var iconAddUserButtonContinerElem = cmp.find(iconAddUserButtonContinerName);

        if(!$A.util.isEmpty(accountTeamMember.User.Name)) {
            cmp.set("v.isAddButtonDisabled", false);
            if($A.util.hasClass(iconAddUserButtonContinerElem, smallMarginClassName)) {
                $A.util.removeClass(iconAddUserButtonContinerElem, smallMarginClassName);
                $A.util.addClass(iconAddUserButtonContinerElem, mediumMarginClassName);
            }

        } else {
            cmp.set("v.isAddButtonDisabled", true);
            if($A.util.hasClass(iconAddUserButtonContinerElem, mediumMarginClassName)) {
                $A.util.removeClass(iconAddUserButtonContinerElem, mediumMarginClassName);
                $A.util.addClass(iconAddUserButtonContinerElem, smallMarginClassName);
            }
        }
    },
    
    handleAddAccountTeamMember: function (cmp, evt, helper) {
        var accountTeamMember = cmp.get("v.accountTeamMember");
        helper.fireAddAccountMemberEvt(cmp, accountTeamMember);
    }
})