({
    ACTIONS: {
        MANAGE_SKILL_COMMUNITY: 'ManageSkillCommunity',
        REMOVE_NEW_SKILL_COMMUNITY: 'RemoveNewSkillCommunity',
        TIMESHEET_ACCEPT_OR_REJECT: 'TimesheetAcceptOrReject'
    },

    fireManageSkillCommunity: function (component, helper, payload) {
        var payload = payload;
        var action = this.ACTIONS.MANAGE_SKILL_COMMUNITY;

        helper.fireCmpEvent(component, payload, action);
    },

    isManageSkillCommunityEvtActionType: function (component, helper, cmpEvent, callback) {
        var action = cmpEvent.getParam('action');
        if(this.ACTIONS.MANAGE_SKILL_COMMUNITY == action) {
            callback(cmpEvent.getParam('payload'));
        }
    },

    fireTimesheetAcceptOrRejectEvt: function (component, helper, payload) {
        var payload = payload;
        var action = this.ACTIONS.TIMESHEET_ACCEPT_OR_REJECT;

        helper.fireCmpEvent(component, payload, action);
    },

    isTimesheetAcceptOrRejectEvtActionType: function (component, helper, cmpEvent, callback) {
        var action = cmpEvent.getParam('action');
        if(this.ACTIONS.TIMESHEET_ACCEPT_OR_REJECT == action) {
            callback(cmpEvent.getParam('payload'));
        }
    },

    fireRemoveNewSkillCommunityEvt: function (component, helper, payload) {
        var payload = payload;
        var action = this.ACTIONS.REMOVE_NEW_SKILL_COMMUNITY;

        helper.fireCmpEvent(component, payload, action);
    },

    isRemoveNewSkillCommunityEvtActionType: function (component, helper, cmpEvent, callback) {
        var action = cmpEvent.getParam('action');

        if(this.ACTIONS.REMOVE_NEW_SKILL_COMMUNITY == action) {
            callback(cmpEvent.getParam('payload'));
        }
    },

    fireCmpEvent: function (component, payload, action) {
        var cmpEvent = component.getEvent("cmpEvent");

        cmpEvent.setParams({
            "payload" : payload,
            "action": action
        })

        cmpEvent.fire();
    }


})