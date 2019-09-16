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

    onNavigateToURL: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const url = params.url;
        const isRedirect = params.isRedirect;
        helper.navigateToURL(url, isRedirect);
    },

    onValidInputDates: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const inputDates = params.inputDates;

        return helper.isInputDatesValid(helper, inputDates);
    },

    onValidInputDate: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const inputDate = params.inputDate;

        return helper.isInputDateValid(helper, true, inputDate);
    },

    onValidDateType: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const dateValue = params.dateValue;

        return helper.isValidDateType(dateValue);
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
    },

    onConvertFromTextBoolToBoolValue: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const value = params.value;

        return helper.convertFromTextBoolToBoolValue(value);
    },

    onIsValueNotUndefinedOrNull: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const value = params.value;

        return helper.isValueNotUndefinedOrNull(value);
    },

    onIsValueNotEmpty: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const value = params.value;

        return helper.isValueNotEmpty(value);
    },

    onRefreshView: function (cmp, evt, helper) {
        helper.refreshView();
    },
    
    onFormat: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const value = params.value;
        const paramValues = params.paramValues;

        return helper.format(value, paramValues);
    },

    onGetFormattedList: function (component, event, helper) {
        const params = event.getParams().arguments;
        const formatValue = params.formatValue;
        const strList = params.strList;

        return helper.getFormattedList(formatValue, strList, helper);
    },

    onHandleAuraResponse: function (component, event, helper) {
        const params = event.getParams().arguments;
        const auraResponse = params.auraResponse;
        const onSuccess = params.onSuccess;
        const onError = params.onError;
        const onWarning = params.onWarning;
        const onUnexpectedError = params.onUnexpectedError;

        helper.handleAuraResponse(helper, auraResponse, onSuccess, onError, onWarning, onUnexpectedError);
    },

    onGetDMLError: function (component, event, helper) {
        const params = event.getParams().arguments;
        const job = params.job;

        return helper.getDMLError(helper, job);
    },
    
    onAddDays: function (component, event, helper) {
        const params = event.getParams().arguments;
        const dateToAddDays = params.dateToAddDays;
        const days = params.days;


        return helper.addDays(dateToAddDays, days);
    },

    onStartOfWeek: function (component, event, helper) {
        const params = event.getParams().arguments;
        const date = params.date;

        return helper.startOfWeek(date);
    },

    onFormatDateYYYYMMDD: function (component, event, helper) {
        const params = event.getParams().arguments;
        const date = params.date;

        return helper.formatDateYYYYMMDD(date);
    },

    onGetWeekNumber: function (component, event, helper) {
        const params = event.getParams().arguments;
        const date = params.date;

        return helper.getWeekNumber(date);
    }
})