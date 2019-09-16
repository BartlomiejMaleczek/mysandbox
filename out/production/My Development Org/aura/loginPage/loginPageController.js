/**
 * Created by BMaleczek on 17.05.2017.
 */
({
    handleSuccessLogin: function(component, event, helper) {
        var booleanSuccessLogin = event.getParam("booleanLoginSuccess");
        console.log(booleanSuccessLogin);
        if(booleanSuccessLogin) {
                var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
               //   "url": "https://bartlomiejmaleczek-dev-ed.lightning.force.com/c/MainPage.app"
               "url": "/006/o"
                });
                urlEvent.fire();
        }
    }
})