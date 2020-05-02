({
    services: {
        utils: {}
    },

    setServices: function (cmp, helper) {
            try {
                helper.services.utils = cmp.find('UtilsService');
            } catch (error) {
                console.log('setServices', error);
            }
    },
})