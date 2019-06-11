({
    handleInit: function (cmp, evt, helper) {
        helper.createForceInputFieldComponent(cmp);
        helper.setColumns(cmp, helper);
        helper.queryAccountMembers(cmp, helper);
    },

    handleForceInputFieldEvt: function (cmp, evt, helper) {
        cmp.set("v.errors", []);
        cmp.find("UtilsService").showElement(cmp, 'spinner');

        var action = evt.getParam('action');
        var accountTeamMembers = cmp.get("v.accountTeamMembers");

        if(action == 'addNewAccountTeamMember') {
            var newAccountTeamMember = helper.getNewAccountTeamMember(evt.getParam('payload'));
            if(helper.isNotOnTheList(cmp, newAccountTeamMember.accountTeamMember.UserId)) {
                accountTeamMembers.push(newAccountTeamMember);
                cmp.set("v.accountTeamMembers", accountTeamMembers);
                helper.createForceInputFieldComponent(cmp);
            } else {
                var errors = cmp.get("v.errors");
                errors.push('User is currently on the list');
                cmp.set("v.errors", errors);
                helper.createForceInputFieldComponent(cmp);
            }
        }

        cmp.find("UtilsService").hideElement(cmp, 'spinner');
    },

    // handleDeleteAccountTeamMember: function (cmp, evt, helper) {
    //     var userId = evt.getSource().get("v.value");
    //     helper.removeAccountTeamMemberByUserId(cmp, userId);
    // },
    
    handleSave: function (cmp, evt, helper) {
        cmp.set("v.isConfirmationDialogModalWindowOpened", true);
    },

    handleSubmitConfirmationEvt: function (cmp, evt, helper) {
        var accountTeamMembers = cmp.get("v.accountTeamMembers");

        if($A.util.isEmpty(accountTeamMembers)) {
            helper.navigateToAccountDetailPage(cmp);
        } else {
            helper.divideAccountTeamMembers(cmp, helper, accountTeamMembers);
            console.group('Accounts After Save');
            console.log('Accounts to modify', cmp.get("v.accountTeamMembersToModify"));
            console.groupEnd();
            helper.navigateToAccountDetailPage(cmp);
        }
    },

    handleCloseDialogWindow: function (cmp, evt, helper) {
        helper.navigateToAccountDetailPage(cmp);
    }
})