({
    callNextPromiseLevel: function (cmp, help, callerHelper, helperMethodsNames, iteration, finalMethod) {
        var nextLevelPromises = [];

        console.group('Next Level promise');
        console.log('Promises methods: ', helperMethodsNames[iteration]);
        console.log('Promise level: ', iteration);
        console.groupEnd();

        if (!$A.util.isUndefinedOrNull(helperMethodsNames[iteration])) {
            helperMethodsNames[iteration].forEach(function (entry) {
                nextLevelPromises.push(callerHelper[entry](cmp, callerHelper));
            });

            return Promise.all(nextLevelPromises).then(
                $A.getCallback(function (result) {
                    console.log("Promise level " + iteration + ' has been finished.');
                    iteration = iteration + 1;
                    if (iteration >= Object.keys(helperMethodsNames).length) {
                        console.log('Start finishing promises');
                        console.log(finalMethod);
                       callerHelper[finalMethod](cmp, callerHelper);
                        console.log('Promises finished');
                    } else {
                        return help.callNextPromiseLevel(cmp, help, callerHelper, helperMethodsNames, iteration, finalMethod);
                    }
                })).catch(function (error) {
                console.log(error);
            });
        } else {
            callerHelper[finalMethod](cmp, callerHelper);
            console.log('Promises finished');
        }
    }
})