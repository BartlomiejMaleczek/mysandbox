({
    showToast: function (title, msg, type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": msg,
            "type": type
        });
        toastEvent.fire();
    },

    hideElement: function (cmp, auraId) {
        var elem = cmp.find(auraId);
        if(!$A.util.hasClass(elem, "slds-hide")) {
            $A.util.addClass(elem, "slds-hide");
        }
    },

    showElement: function (cmp, auraId) {
        var elem = cmp.find(auraId);
        if($A.util.hasClass(elem, "slds-hide")) {
            $A.util.removeClass(elem, "slds-hide");
        }
    },

    navigateToDetailPage: function (Id) {
        var navEvt = $A.get("e.force:navigateToSObject");

        navEvt.setParams({
            "recordId": Id
        });

        navEvt.fire();
    },

    isInputDatesValid: function (helper, inputDates) {
        var isValid = true;

        inputDates.forEach(function (input) {
            isValid = helper.isInputDateValid(isValid, input);
        });

        return isValid;
    },

    isInputDateValid: function (isValid, inputDate) {
        var isValid = isValid;

        inputDate.set("v.errors", []);
        if (!$A.util.isEmpty(inputDate.get("v.value"))) {
            var inputDateValue = new Date(inputDate.get("v.value"));

            if (inputDateValue.toString() === 'Invalid Date') {
                inputDate.set("v.errors", [{message: "Invalid format of date."}]);
                isValid = false;
            }
        }

        return isValid;
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
    }
})