({
    onCallPromises: function(cmp, evt, help) {
        console.log('Argumenty', evt.getParams().arguments);
        console.log(arguments);
        const params = evt.getParams().arguments;
        var callerComponent = params.component;
        var callerHelper = params.helper;
        var promisesMap = params.methods;
        var finalMethod = params.onFinalMethod;

        var firstPromisesLevel = [];
        var firstElement = 0;

        console.group('Promises Framework');
        console.log('CallerHelper', callerHelper);
        console.log('PromisesMap', promisesMap);
        console.log('OnFinalMethod', finalMethod);
        console.groupEnd();


        promisesMap[firstElement].forEach(function (entry) {
            firstPromisesLevel.push(callerHelper[entry](callerComponent, callerHelper));
        });

        Promise.all( firstPromisesLevel
        ).then($A.getCallback(function (result) {
            console.log("First part promises finished");
            return help.callNextPromiseLevel(callerComponent, help, callerHelper, promisesMap, 1, finalMethod);
        })).catch(function (error) {
            console.log(error);
        });

    }
})