/**
 * Created by BMaleczek on 17.05.2017.
 */
({
    submitUser: function(component, event, helper) {
        console.log('wywowalem sie');
        var user = component.get("v.user");
        var getUserByUsernameAndPassword = component.get("c.getUserByUsernameAndPassword");
        getUserByUsernameAndPassword.setParams({
            "user": user
        });
        getUserByUsernameAndPassword.setCallback(this, function(response){
            var state = response.getState();
            var createEvent = component.getEvent("successLogin");
            if (component.isValid() && state === "SUCCESS") {
                var gotUser = response.getReturnValue();
                console.log(JSON.parse(JSON.stringify(gotUser)));
                createEvent.setParams({
                    "booleanLoginSuccess": true
                });
            }else {
                createEvent.setParams({
                    "booleanLoginSuccess": false
                });
            }
            createEvent.fire();
        });
        //console.log()
        $A.enqueueAction(getUserByUsernameAndPassword);
    }
})