({
    showToast: function (title, msg, type) {
        var toastEvent = $A.get("e.force:showToast");

        if(toastEvent) {
            toastEvent.setParams({
                "title": title,
                "message": msg,
                "type": type,
                'duration': 10000
            });
            toastEvent.fire();
        }
    },

    hideElement: function (cmp, auraId) {
        $A.util.addClass(cmp.find(auraId), "slds-hide");
    },

    showElement: function (cmp, auraId) {
        $A.util.removeClass(cmp.find(auraId), "slds-hide");
    },

    navigateToDetailPage: function (Id, sliderDevName) {
        var navEvt = $A.get("e.force:navigateToSObject");

        navEvt.setParams({
            "recordId": Id,
            "slideDevName": sliderDevName
        });

        navEvt.fire();
    },

    navigateToURL: function (url, isRedirect) {
        var navEvt = $A.get("e.force:navigateToURL");

        navEvt.setParams({
            "url": url,
            "isredirect": isRedirect
        });

        navEvt.fire();
    },

    isInputDatesValid: function (helper, inputDates) {
        var isValid = true;

        inputDates.forEach(function (input) {
            isValid = helper.isInputDateValid(helper, isValid, input);
        });

        return isValid;
    },

    isInputDateValid: function (helper, isValid, inputDate) {
        var isValid = isValid;

        inputDate.set("v.errors", []);
        if (!$A.util.isEmpty(inputDate.get("v.value"))) {

            if (!helper.isValidDateType(inputDate.get("v.value"))) {
                inputDate.set("v.errors", [{message: "Invalid format of date."}]);
                isValid = false;
            }
        }

        return isValid;
    },

    isValidDateType: function (dateValue) {
        var inputDateValue = new Date(dateValue);
        if (inputDateValue.toString() === 'Invalid Date') {
            return false;
        } else {
            return true;
        }
    },

    fetchByString: function (record, fieldName) {
        fieldName = fieldName.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        fieldName = fieldName.replace(/^\./, '');           // strip a leading dot
        var splitedDisplayField = fieldName.split('.');
        for (var i = 0, n = splitedDisplayField.length; i < n; ++i) {
            var key = splitedDisplayField[i];
            if (key in record) {
                record = record[key];
            } else {
                return;
            }
        }
        return record;
    },

    setTimeout: function (cmp, fn, timeout) {
        window.setTimeout($A.getCallback(
            function () {
                if (cmp.isValid()) {
                    fn();
                }
            }
        ), timeout);
    },

    convertFromTextBoolToBoolValue: function (value) {
        var convertedInputValue;

        if (value == 'true') {
            convertedInputValue = true;
        } else if (value == 'false') {
            convertedInputValue = false;
        }

        return convertedInputValue;
    },

    isValueNotUndefinedOrNull: function (value) {
        return (!$A.util.isUndefinedOrNull(value));
    },

    isValueNotEmpty: function (value) {
        return (!$A.util.isEmpty(value));
    },

    refreshView: function () {
        $A.get('e.force:refreshView').fire();
    },
    
    format: function (value, params) {
        return typeof value === 'string' && value.replace(
            /\{([^{}]*)\}/g,
            function (a, b) {
                var r = params[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    },

    getFormattedList: function (formatValue, strList, helper) {
        var formattedList = [];
        for (const str of strList) {
            formattedList.push(helper.format(str, [formatValue]));
        }

        return formattedList;
    },

    addDays: function (dateToAddDays, days) {
        var newDate = new Date(dateToAddDays);
        newDate.setDate(dateToAddDays.getDate() + days);
        return newDate;
    },

    startOfWeek: function (date) {
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

        return new Date(date.setDate(diff));
    },

    formatDateYYYYMMDD: function (date) {

        let month = date.getMonth() + 1;
        let formattedDate = date.getFullYear() + '-' + (month > 9 ? month : '0' + month) + "-" + date.getDate() ;
        return formattedDate;
    },

    getWeekNumber: function (date) {
        let january = new Date(date.getFullYear(), 0, 1);
        var week = Math.ceil( (((date - january) / 86400000) + january.getDay() + 1) / 7 );

        return week;
    }
})