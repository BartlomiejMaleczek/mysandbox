({
    callApex : function(component,controllerMethod, actionParameters, successCallback, errorCallback) {
        const action = component.get(controllerMethod);
        action.setParams(actionParameters);
        action.setCallback(this, function(response) {
            const state = response.getState();

            console.group('Callapex: ', controllerMethod);
            console.log('params:', actionParameters);
            console.log('State:', state);
            console.log('Return:', response.getReturnValue());
            console.log('Errors:', response.getError());
            console.groupEnd();

            if (state === "SUCCESS") {
                successCallback(component,response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {  }
            else if (state === "ERROR") {
                const errors = response.getError();
                if (errors) {
                    errorCallback && errorCallback(errors[0].message);
                } else {
                    errorCallback && errorCallback('Unknown error');
                }
            }
        });
        $A.enqueueAction(action);
    }
})