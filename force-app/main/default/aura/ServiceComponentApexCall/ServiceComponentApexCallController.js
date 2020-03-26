({
    onCallApex : function(component, event, helper) {
        const params = event.getParams().arguments;
        const callerComponent = params.component;
        const controllerMethod = params.controllerMethod;
        const actionParameters = params.actionParameters;
        const successCallback = params.successCallback;
        const errorCallback = params.errorCallback;
        helper.callApex(callerComponent, controllerMethod, actionParameters, successCallback, errorCallback);
    }
})