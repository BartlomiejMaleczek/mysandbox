({
    onFireManageSkillCommunity: function (component, event, helper) {
        const params = event.getParams().arguments;
        const payload = params.payload;

        helper.fireManageSkillCommunity(component, helper, payload);
    },

    onIsManageSkillCommunityEvtActionType: function (component, event, helper) {
        const params = event.getParams().arguments;
        const callback = params.callback;
        const cmpEvent = params.cmpEvent;

        helper.isManageSkillCommunityEvtActionType(component, helper, cmpEvent, callback);
    },

    onFireTimesheetAcceptOrRejectEvt: function (component, event, helper) {
        const params = event.getParams().arguments;
        const payload = params.payload;

        helper.fireTimesheetAcceptOrRejectEvt(component, helper, payload);
    },

    onIsTimesheetAcceptOrRejectEvtActionType: function (component, event, helper) {
        const params = event.getParams().arguments;
        const callback = params.callback;
        const cmpEvent = params.cmpEvent;

        helper.isTimesheetAcceptOrRejectEvtActionType(component, helper, cmpEvent, callback);
    },

    onFireRemoveNewSkillCommunity: function (component, event, helper) {
        const params = event.getParams().arguments;
        const payload = params.payload;

        helper.fireRemoveNewSkillCommunityEvt(component, helper, payload);
    },

    onIsRemoveNewSkillCommunityEvtActionType: function (component, event, helper) {
        const params = event.getParams().arguments;
        const callback = params.callback;
        const cmpEvent = params.cmpEvent;

        helper.isRemoveNewSkillCommunityEvtActionType(component, helper, cmpEvent, callback);
    }
})