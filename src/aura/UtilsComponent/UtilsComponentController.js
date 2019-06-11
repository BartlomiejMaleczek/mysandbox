({
    onShowToast: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const title = params.title;
        const type = params.type;
        const msg = params.msg;
        helper.showToast(title, msg, type);
    },

    onShowElement: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const component = params.component;
        const auraId = params.auraId;
        helper.showElement(component, auraId);
    },

    onHideElement: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const component = params.component;
        const auraId = params.auraId;
        helper.hideElement(component, auraId);
    },

    onNavigateToDetailPage: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const Id = params.Id;
        helper.navigateToDetailPage(Id);
    },

    onValidInputDates: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const inputDates = params.inputDates;

        return helper.isInputDatesValid(helper, inputDates);
    },

    onValidInputDate: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const inputDate = params.inputDate;

        return helper.isInputDateValid(true, inputDate);
    },
    
    onFetchByString: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const record = params.record;
        const fieldName = params.fieldName;

        return helper.fetchByString(record, fieldName);
    },

    onSetTimeout: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const component = params.component;
        const callback = params.callback;
        const timeout = params.timeout;

        helper.setTimeout(component, callback, timeout);
    }
})