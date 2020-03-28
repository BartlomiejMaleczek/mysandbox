function callPromises(cmp, promisesMap, finalMethod) {
    let firstPromisesLevel = [],
        firstElement = 0;

    console.groupCollapsed('Promises Framework');
    console.log('PromisesMap:', promisesMap);
    console.log('OnFinalMethod:', finalMethod);
    console.groupEnd();

    return callPromiseLevel(cmp, promisesMap, finalMethod, 0);
}

function callPromiseLevel(cmp, promisesMap, finalMethod, iteration) {
    const nextLevelPromises = [];

    console.groupCollapsed('Promises Level: ', iteration);
    console.log('Promises methods: ', promisesMap[iteration]);

    try {
        if (promisesMap[iteration]) {
            return Promise.all(promisesMap[iteration].map(callback => callback())).then(function (result) {
                console.log("Promise level " + iteration + ' has been finished.');
                iteration = iteration + 1;

                if (iteration >= Object.keys(promisesMap).length) {
                    console.groupEnd();
                    console.groupCollapsed("Promises final method: ", finalMethod);
                    cmp[finalMethod]();
                    console.log('Promises finished');
                    console.groupEnd();
                } else {
                    console.groupEnd();
                    return callPromiseLevel(cmp, promisesMap, finalMethod, iteration);
                }

            }).catch(function (error) {
                promisesMap[finalMethod]();
                console.error('Promises finished with Errors:', error);
                console.groupEnd();
            });
        } else {
            cmp[finalMethod]();
            console.log('Promises finished');
            console.groupEnd();
        }
    } catch (error) {
        cmp[finalMethod]();
        console.error('Promises finished with Errors:', error);
        console.groupEnd();
    }
}

const _promises = {
    callPromises: callPromises
}

export {_promises};