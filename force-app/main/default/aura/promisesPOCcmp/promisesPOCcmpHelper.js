/**
 * Created by BMaleczek on 19.09.2017.
 */
({
    getAccounts: function (cmp, evt, help) {
        console.log('Rozpoczynam getAccounts');
        const action = cmp.get("c.getAccountsApex");
        return new Promise(function (resolve, reject) {

        action.setParams({

        });

            console.log('Jestem przed callbackiem');
        action.setCallback(this, function (response) {
            console.log('Jestem w callbacku');
            const state = response.getState();
            const error = response.getError();
            const returnValue = response.getReturnValue();

            if (state === "SUCCESS") {
                window.setTimeout(
                    $A.getCallback(function() {
                        console.log('GET ACCOUNTS SIE SKONCZYL');
                        console.log(returnValue);
                        resolve('Dziala');
                        // return new Promise(function (resolve, reject) {
                        //     resolve('DZIALA');
                        // });

                    }), 5000
                );
                // console.log('GET ACCOUNTS SIE SKONCZYL');
                // console.log(returnValue);
                // resolve('DZIALA');

            }
            else if (state === "INCOMPLETE") {
                console.log("invokeSAPQuoteWebservice:::INCOMPLETE");
                // return new Promise(function (resolve, reject) {
                //     reject(' NIE DZIALA');
                // });
            }
            else if (state === "ERROR") {
                console.log("invokeSAPQuoteWebservice:::ERROR");
                // return new Promise(function (resolve, reject) {
                //     reject(' NIE DZIALA');
                // });
            }
        });

        $A.enqueueAction(action);

        });
    },

    getContacts: function (cmp, evt, help) {

        console.log('Rozpoczynam getContacts');

        const action = cmp.get("c.getContactsApex");
        return new Promise(function (resolve, reject) {
            action.setParams({

            });

            action.setCallback(this, function (response) {
                const state = response.getState();
                const returnValue = response.getReturnValue();

                if (state === "SUCCESS") {
                    console.log('GET Contacts SIE SKONCZYL');
                    console.log(returnValue);
                    resolve('DZIALA');
                }
                else if (state === "INCOMPLETE") {
                    console.log("incomplete");
                    reject('NIE DZIALA');
                }
                else if (state === "ERROR") {
                    console.log("wywalilo sie");
                    reject('NIE DZIALA');
                }
            });

            $A.enqueueAction(action);
        });


    },

    getCases: function (cmp, evt, help) {

        console.log('Rozpoczynam getCases');

        const action = cmp.get("c.getCasesApex");
        return new Promise(function (resolve, reject) {
            action.setParams({

            });
            console.log('Przed callbackiem cases');
            // resolve('dziala');
            action.setCallback(this, function (response) {
                console.log('Po callbackiem cases');
                const state = response.getState();
                const returnValue = response.getReturnValue();

                if (state === "SUCCESS") {
                    console.log('GET cases SIE SKONCZYL');
                    console.log(returnValue);
                    resolve('DZIALA');
                }
                else if (state === "INCOMPLETE") {
                    console.log("incomplete");
                    reject('NIE DZIALA');
                }
                else if (state === "ERROR") {
                    console.log("wywalilo sie");
                    reject('NIE DZIALA');
                }
            });

            $A.enqueueAction(action);
        });
    },

    promisesHandler: function(cmp, helper) {
        // console.log("Promises handler");
        //
        // var arg1 = arguments[0];
        // console.log(arg1);
        // var arg2 = arguments[1];
        // console.log(arg2);
        // var arg3 = arguments[2];
        // console.log(arg3[0]);
        // helper[arg3[0]](cmp, null, helper);
        // console.log(helper.get(arg3[0]));
        // helper.superMethod(cmp);
        // var myFunction = new Function(helper['getAccounts']);
        // helper['getAccounts'].arguments.callee;
        // $A.util.
        // eval(helper[arg3[0]]);
        // helper.get(arg3[0]);
    }
})