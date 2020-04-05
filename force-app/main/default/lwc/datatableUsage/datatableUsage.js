/**
 * Created by BMaleczek on 05.04.2020.
 */

import {ServiceAbstract} from "c/serviceAbstract";
import {api, track, wire} from 'lwc';
import getAccountsApex from '@salesforce/apex/DatatableUsageController.getAccountsApex';

export default class DatatableUsage extends ServiceAbstract {
    @track accounts;
    isLoading;


    constructor() {
        super();

        this.isLoading = true;
    }

    connectedCallback() {
        this.utils.promises.callPromises(
            [
                [this.getAccounts.bind(this)]
            ],
            this.finalizeRendering.bind(this)
        );
    }

    getAccounts() {
        return new Promise(((resolve, reject) => {
            getAccountsApex(
                {
                    accountId: this.recordId
                })
                .then((result) => {
                    this.accounts = result;
                    resolve(result);
                })
                .catch((error) => {
                        this.utils.event.showToast(this, 'Error', error, 'error');
                        reject(error);
                    }
                );
        }));

    }

    finalizeRendering() {
        this.isLoading = false;
    }

}