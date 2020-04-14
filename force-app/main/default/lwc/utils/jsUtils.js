function isValidDateType(dateValue) {
    const inputDateValue = new Date(dateValue);

    if (inputDateValue.toString() === 'Invalid Date') {
        return false;
    } else {
        return true;
    }
}

function fetchByString(record, fieldName) {
    fieldName = fieldName.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    fieldName = fieldName.replace(/^\./, '');           // strip a leading dot

    const splitedDisplayField = fieldName.split('.');

    for (let i = 0, n = splitedDisplayField.length; i < n; ++i) {
        let key = splitedDisplayField[i];

        if (key in record) {
            record = record[key];
        } else {
            return;
        }
    }
    return record;
}

function normalizeBoolean(value) {
    return typeof value === 'string' || !!value;
}

function format(value, params) {
    return typeof value === 'string' && value.replace(
        /\{([^{}]*)\}/g,
        function (a, b) {
            let r = params[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
}

function getFormattedList(formatValue, strList) {
    const formattedList = [];

    for (const str of strList) {
        formattedList.push(format(str, [formatValue]));
    }

    return formattedList;
}

function onSort(collection, key, order) {
    function compareValues(key, order) {
        return function (a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA = (typeof a[key] === 'string') ?
                a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ?
                b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order == 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    if (!!collection && !!key) {
        return collection.sort(compareValues(key, order));
    } else
        return collection;
}

function copyObjectWithoutProperties(object, keys) {
    let target = {};

    for (let i in object) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(object, i))
            continue;
        target[i] = object[i];
    }

    return target;
}

function searchInCollection(searchStr, collection, fieldsToSearch) {
    const searchResults = [];

    if (searchStr) {
        collection.forEach((item) => {
            fieldsToSearch.some((fieldToSearch) => {
                if (item.hasOwnProperty(fieldToSearch) &&
                    item[fieldToSearch]
                        .toUpperCase()
                        .replace(/ /g, '')
                        .indexOf(searchStr.toUpperCase()) !== -1) {

                    searchResults.push(item);
                    return true;
                } else {
                    return false;
                }
            });
        });

        return searchResults;
    } else {
        return collection.slice();
    }
}

function addDays(dateToAddDays, days) {
    let newDate = new Date(dateToAddDays);
    newDate.setDate(dateToAddDays.getDate() + days);
    return newDate;
}

function startOfWeek(date) {
    let diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

    return new Date(date.setDate(diff));
}

function formatDateYYYYMMDD(date) {
    let month = date.getMonth() + 1,
        formattedDate = date.getFullYear() + '-' + (month > 9 ? month : '0' + month) + "-" + date.getDate();
    return formattedDate;
}

function getWeekNumber(date) {
    let january = new Date(date.getFullYear(), 0, 1),
        week = Math.ceil((((date - january) / 86400000) + january.getDay() + 1) / 7);

    return week;
}

function removeWhitespaces(text) {
    return text.replace(/ /g, '').trim();
}

function getURLParams(url) {
    const pageURL = (url ? url.split('?') : ''),
        paramsMap = {};

    let paramMap = {};

    if (pageURL) {
        if (pageURL.length > 1) {
            const params = pageURL[1].split('&');

            if (params) {
                params.forEach(function (param) {
                    paramMap = param.split('=');
                    paramsMap[paramMap[0]] = (paramMap[1] ? paramMap[1] : '');
                });
            }
        }
    }

    return paramsMap;
}

const _jsUtils = {
    isValidDateType: isValidDateType,
    fetchByString: fetchByString,
    normalizeBoolean: normalizeBoolean,
    format: format,
    getFormattedList: getFormattedList,
    onSort: onSort,
    copyObjectWithoutProperties: copyObjectWithoutProperties,
    searchInCollection: searchInCollection,
    removeWhitespaces: removeWhitespaces,
    getURLParams: getURLParams,
    addDays: addDays,
    startOfWeek: startOfWeek,
    formatDateYYYYMMDD: formatDateYYYYMMDD,
    getWeekNumber: getWeekNumber
}

export {_jsUtils};