/**
 * Created by BMaleczek on 18.08.2017.
 */
({
    doInit: function(cmp, event, helper) {
         var accounts = [];
                console.log('start');

                for (var i = 0; i < 10; i++) {
                    accounts.push({
                        sObjectType:'Account',
                        Name : 'Test Account #' +i,
                        Type : 'Personal Account'
                    });
                }
                console.log(accounts[0][0]);

        //        console.log(accounts);

                cmp.set("v.parentItems", accounts);
    }
})