({

    handleInit: function (cmp, evt, helper) {

    },

    handleShowNotice : function(component, event, helper) {

        // console.log(component.find('notifLib'));
        //
        // component.find('notifLib').showToast({
        //     "title": "Success!",
        //     "message": "Record {0} created! See it {1}!",
        //     "messageData": [
        //         'Salesforce',
        //         {
        //             url: 'http://www.salesforce.com/',
        //             label: 'here',
        //         }
        //     ]
        // });
    },

    handleNavigate: function (cmp, evt, helper) {
        // console.log('handleNavigate');
        // var navService = cmp.find("navService");
        // console.log(navService);
        //
        // var pageReference = {
        //     type: 'standard__recordPage',
        //     attributes: {
        //         actionName: 'view',
        //         objectApiName: 'Account',
        //         recordId: '0011n000024jUpdAAE'
        //     },
        // };

        // let pageReference = {
        //     type: 'standard__webPage',
        //     attributes: {
        //         url: '/apex/TestListViewVF'
        //     },
        //
        // };

        // var pageReference = {
        //     type: "standard__objectPage",
        //     attributes: {
        //         objectApiName: "Account",
        //         actionName: "list"
        //     }
        // };
        //
        // debugger;
        //
        // evt.preventDefault();

        // var navigateVar = navService.navigate(pageReference);
        // console.log('navigateVar', navigateVar);

        // debugger;

        // console.log(helper.isLightningDesktop());
        //
        // debugger;
        //
        // navService.generateUrl(pageReference)
        //     .then($A.getCallback(function (url) {
        //         console.log('URL', url);
        //         // navService.navigate(pageReference);
        //
        //
        //     }), $A.getCallback(function (error) {
        //         console.log(error);
        //     }));


    }

})