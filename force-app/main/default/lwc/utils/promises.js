function callPromises(promisesMap, finalMethod) {
    let firstPromisesLevel = [],
        firstElement = 0;

    console.groupCollapsed('Promises Framework');
    console.log('PromisesMap:', promisesMap);
    console.log('OnFinalMethod:', finalMethod.name);
    console.groupEnd();

    return callPromiseLevel(promisesMap, finalMethod, 0);
}

function callPromiseLevel(promisesMap, finalMethod, iteration) {
    const nextLevelPromises = [];

    console.groupCollapsed('Promises Level: ', iteration);
    console.log('Promises methods: ', promisesMap[iteration].map(function(func){return func.name;}));

    try {
        if (promisesMap[iteration]) {
            return Promise.all(promisesMap[iteration].map(callback => callback())).then(function (result) {
                console.log("Promise level " + iteration + ' has been finished.');
                iteration = iteration + 1;

                if (iteration >= Object.keys(promisesMap).length) {
                    console.groupEnd();
                    console.groupCollapsed("Promises final method: ", finalMethod.name);
                    finalMethod();
                    console.log('Promises finished');
                    console.groupEnd();
                } else {
                    console.groupEnd();
                    return callPromiseLevel(promisesMap, finalMethod, iteration);
                }

            }).catch(function (error) {
                promisesMap[finalMethod]();
                console.error('Promises finished with Errors:', error);
                console.groupEnd();
            });
        } else {
            finalMethod();
            console.log('Promises finished');
            console.groupEnd();
        }
    } catch (error) {
        finalMethod();
        console.error('Promises finished with Errors:', error);
        console.groupEnd();
    }
}

const _promises = {
    callPromises: callPromises
}

export {_promises};