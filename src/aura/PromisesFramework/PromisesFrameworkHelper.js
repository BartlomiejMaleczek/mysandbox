/**
 * Created by BMaleczek on 05.01.2018.
 */
({
    callNextPromiseLevel: function(cmp, help, callerHelper, helperMethodsNames, iteration) {
        var nextLevelPromises = [];

        console.group('Next Level promise');
        console.log('Promises methods: ', helperMethodsNames[iteration]);
        console.log('Promise level: ', iteration);
        console.groupEnd();

        helperMethodsNames[iteration].forEach(function(entry){
            nextLevelPromises.push(callerHelper[entry](cmp, null, callerHelper));
        });

        return Promise.all(nextLevelPromises)
            .then(function(result) {
                console.log("Promise level " + iteration + ' has been finished.');
                iteration = iteration + 1;
                if(iteration >= Object.keys(helperMethodsNames).length) {
                    console.log('Promises finished');
                } else {
                    return help.callNextPromiseLevel(cmp, help, callerHelper, helperMethodsNames, iteration);
                }
            }).catch(function(error){
                console.log(error);
            });
    }
})