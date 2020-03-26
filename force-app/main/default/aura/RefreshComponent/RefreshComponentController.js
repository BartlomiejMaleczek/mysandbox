({

    handleInit: function (cmp, evt, helper) {
        console.log('handleInit');
        // helper.queryRecord(cmp, helper);

    },

    recordUpdated: function(component, event, helper) {
        console.log('recordUpdated');
        var changeType = event.getParams().changeType;

        if (changeType === "ERROR") { /* handle error; do this first! */
        }
        else if (changeType === "LOADED") { /* handle record load */
        }
        else if (changeType === "REMOVED") { /* handle record removal */
        }
        else if (changeType === "CHANGED") { /* handle record change */
            console.log('zmieniam sie');
            // var appEvent = $A.get("e.c:RefreshComponentEvt");
            // appEvent.setParams({
            //     "message" : "An application event fired me. " +
            //     "It all happened so fast. Now, I'm everywhere!" });
            // appEvent.fire();
        }


    },

    changeName: function (cmp, evt, helper) {
        console.log('changed');
        helper.queryRecord(cmp, helper);
    }
})