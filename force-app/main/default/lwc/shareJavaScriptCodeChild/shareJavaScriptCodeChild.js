import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {NavigationMixin} from "lightning/navigation";
import {LightningElement, api} from "lwc";

const getTermOptions = () => {
    return [
        { label: '20 years', value: 20 },
        { label: '25 years', value: 25 },
    ];
};

const calculateMonthlyPayment = (principal, years, rate) => {
    console.log('calculateMonthlyPayment!!');
};

function shotToast(parent, title, message, variant) {
    parent.dispatchEvent(
        new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        })
    );
}

const SampleMixin = (LightningElement) =>
        class Sample extends NavigationMixin(LightningElement) {
    @api
    get test() {
        return 'test';
    }

    naviagteToAccountHome() {

        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'home',
            },
        });
    }
}

const _utils = {
    getTermOptions: getTermOptions,
    calculateMonthlyPayment: calculateMonthlyPayment,
    shotToast: shotToast,
    SampleMixin: SampleMixin
};

export {_utils};