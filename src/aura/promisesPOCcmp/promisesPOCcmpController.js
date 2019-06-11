/**
 * Created by BMaleczek on 19.09.2017.
 */
({
    doInit: function (cmp, evt, help) {
        // Promise.all([help.getAccounts(cmp, evt, help), help.getCases(cmp, evt, help)]).then(
        //     $A.getCallback(function(result) {
        //         console.log('First Part is finished');
        //         return Promise.all([
        //             help.getContacts(cmp, evt, help)
        //         ]).then(function(result){
        //             console.log('Second Part is finished');
        //         }).catch(function(error) {
        //
        //         });
        //     })
        // ).catch(function(error) {
        //
        // });
        // console.log('DO INIT CONTROLLER');
        // console.log(cmp.find("promisesFramework").getElement);

        //
         cmp.find("promisesFramework").callPromises(
             cmp,
             // x,
             help,
             // {
             //     '1' : ['getAccounts'],
             //     '2' : ['getContacts', 'getCases']
             // }
             [
                 ['getAccounts'],
                 ['getContacts', 'getCases'],
                 ['getAccounts']
             ]
         );

    }
})