({
    updateCaseStatusAction: function (cmp, evt, helper) {
        console.log('siemka');
        // console.log(cmp.find('quickActionAPI'));
        // console.log(Sfdc.canvas);
        // console.log(Sfdc.canvas.publisher);

        // Sfdc.canvas.publisher.publish({name:"publisher.selectAction",payload:{actionName:"Opportunity.New_Task"}});
        // var actionAPI = cmp.find("quickActionAPI");
        var fields = {
            Id: {value: "0061n00000V0PGxAAN"},
            Name: {value: "TestUpdt"},
            accountName: {Id: "0011n000022oIQOAA2"}
        };
        // var args = {actionName: "Opportunity.UpdateOpp", entityName: "Opportunity", targetFields: fields};
        // actionAPI.setActionFieldValues(args).then(function () {
        //     actionAPI.invokeAction(args);
        // }).catch(function (e) {
        //     console.error(e.errors);
        // });


        var actionAPI = cmp.find("quickActionAPI");
        var args = {actionName: "Opportunity.UpdateOpp", entityName: "Opportunity", };
        actionAPI.selectAction(args).then(function(result){
            console.log(result);
            //Action selected; show data and set field values
        }).catch(function(e){
            if(e.errors){
                console.error(e.errors);
                //If the specified action isn't found on the page, show an error message in the my component
            }
        });

    }
})