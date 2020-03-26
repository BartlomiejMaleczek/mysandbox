({
    queryRecord: function (cmp, helper) {
        helper.setTimeout(cmp, function () {
            var recordId = cmp.get("v.recordId");
            var record = cmp.get("v.record");

            helper.callApex(cmp, "c.queryRecordApex",
                {
                    recordId: recordId
                },
                function (cmp, response) {
                    console.log('Return Value:', response);

                    if(!record) {
                        console.log('inicjalizuje');
                        cmp.set("v.record", response);
                    } else if(record.Name !== response.Name) {
                        console.log('odswiezam');
                        $A.get('e.force:refreshView').fire();
                    }

                    helper.queryRecord(cmp, helper);
                },
                function (error) {
                    console.log('error');
                    helper.queryRecord(cmp, helper);
                }
            );
            // var action = cmp.get("c.queryRecordApex");
            // action.setStorable();
            // action.setCallback(this, function(response) {
            //     var returnValue = response.getReturnValue();
            //     console.log('Opportunity Return Value:', response.getReturnValue());
            //     console.log("Opportunity loaded in %fms",
            //         performance.now() - startTime);
            //
            //     var accountFieldsRecord = cmp.get("v.accountFieldsRecord");
            //     console.log(JSON.stringify(accountFieldsRecord));
            //
            //     var state = response.getState();
            //     if (state === "SUCCESS") {
            //         if(accountFieldsRecord.Name !== returnValue.Name) {
            //             console.log('zmienilo sie');
            //             $A.get('e.force:refreshView').fire();
            //         } else {
            //             console.log('nie zmienilo sie');
            //         }
            //     } else if(state === "INCOMPLETE") {
            //         console.log('Incomplete');
            //     } else if(state === "ERROR") {
            //         var errors = response.getError();
            //         if (errors) {
            //             if (errors[0] && errors[0].message) {
            //                 console.log("Error message: " +
            //                     errors[0].message);
            //             }
            //         }
            //     }
            // });
            // var startTime = performance.now();
            // $A.enqueueAction(action);
        }, 5000)
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

    callApex : function(component,controllerMethod, actionParameters, successCallback, errorCallback) {
        const action = component.get(controllerMethod);
        action.setParams(actionParameters);
        action.setStorable();
        action.setCallback(this, function(response) {
            const state = response.getState();

            console.group('Callapex: ', controllerMethod);
            console.log('params:', actionParameters);
            console.log('State:', state);
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