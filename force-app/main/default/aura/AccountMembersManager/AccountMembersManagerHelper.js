({
    queryAccountMembers: function (cmp, helper) {
        var accountId = cmp.get("v.recordId");
        cmp.find('ApexService').callApex(
                cmp,
                "c.qetAccountTeamMembersApex",
                {
                    "accountId": accountId
                },
                function onSuccess(cmp, result) {
                    cmp.set("v.accountTeamMembers", result);
                    cmp.find("UtilsService").hideElement(cmp, 'spinner');
                },
                function onFailure(result) {
                    cmp.find("UtilsService").showToast('Data Initalization:', result, 'error');
                }
        );
    },

    setColumns: function (cmp, helper) {
        var columns = [];
        columns.push({
            label: 'User Name',
            fieldName: 'accountMember.User.Name',
            type: 'text'
        });

        cmp.set('v.columns', columns);
    },

    createForceInputFieldComponent: function (cmp) {
        cmp.set("v.forceInputField", []);
        $A.createComponent(
            "c:ForceInputField",
            {
                "aura:id": "forceInputField"
            },
            function(forceInputFieldCmp, status, errorMessage){
                if (status === "SUCCESS") {
                    var forceInputField = cmp.get("v.forceInputField");
                    console.log(forceInputFieldCmp);
                    forceInputField.push(forceInputFieldCmp);
                    cmp.set("v.forceInputField", forceInputField);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },

    getNewAccountTeamMember: function (newAccountTeamMember) {
        console.log('new account team member', newAccountTeamMember);
        return {
            accountTeamMember: {
                UserId: newAccountTeamMember.UserId,
                User: {
                    Id: newAccountTeamMember.UserId,
                    Name: newAccountTeamMember.User.Name
                }
            },
            isAssigned: false,
            isSelected: true,
            isError: false,
            errorMsg: ''
        };
    },

    isNotOnTheList: function (cmp, userId) {
        var accountTeamMembers = cmp.get("v.accountTeamMembers");
        for(var i = 0; i < accountTeamMembers.length; i++) {
            if(accountTeamMembers[i].accountTeamMember.UserId == userId) {
                return false;
            }
        }

        return true;
    },
    
    // removeAccountTeamMemberByUserId: function (cmp, userId) {
    //     var accountTeamMembers = cmp.get("v.accountTeamMembers");
    //     for(var i = 0; i < accountTeamMembers.length; i++) {
    //         if(accountTeamMembers[i].accountTeamMember.UserId == userId) {
    //             accountTeamMembers.splice(i, 1);
    //             cmp.set("v.accountTeamMembers", accountTeamMembers);
    //             break;
    //         }
    //     }
    // },

    divideAccountTeamMembers: function (cmp, helper, accountTeamMembers) {
        var accountTeamMembersToModify = cmp.get("v.accountTeamMembersToModify");
        accountTeamMembers.forEach(function (elem) {
           if(helper.isAccountTeamMemberToAdd(elem)) {
               elem.isToAdd = true;
               elem.isToDelete = false;
               accountTeamMembersToModify.push(elem);
           } else if(helper.isAccountTeamMemberToRemove(elem)) {
               elem.isToAdd = false;
               elem.isToDelete = true;
               accountTeamMembersToModify.push(elem);
           }
        });

        cmp.set("v.accountTeamMembersToModify", accountTeamMembersToModify);
    },

    isAccountTeamMemberToAdd: function (elem) {
        return (elem.isSelected && !elem.isAssigned);
    },

    isAccountTeamMemberToRemove: function (elem) {
        return (!elem.isSelected && elem.isAssigned);
    },

    navigateToAccountDetailPage: function (cmp) {
        var recordId = cmp.get("v.recordId");
        cmp.find("UtilsService").navigateToDetailPage(recordId);
    }
})