/**
 * Created by BMaleczek on 08.04.2020.
 */

import {ServiceAbstract} from "c/serviceAbstract";
import {api, track, wire} from 'lwc';
import getAccountsApex from '@salesforce/apex/DatatableUsageController.getAccountsApex';

export default class DatatableWithFixedHeaderUsage extends ServiceAbstract {
    @api options = [
        {label: 'New', value: 'new'},
        {label: 'In Progress', value: 'inProgress'},
        {label: 'Finished', value: 'finished'}
    ];

    @track accounts;

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
            getAccountsApex({})
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