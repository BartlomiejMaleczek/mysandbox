/**
 * Created by BMaleczek on 05.04.2020.
 */

import {ServiceAbstract} from "c/serviceAbstract";
import {api, track, wire} from 'lwc';
import getAccountsApex from '@salesforce/apex/DatatableUsageController.getAccountsApex';

export default class DatatableUsage extends ServiceAbstract {
    @api options = [
        {label: 'New', value: 'new'},
            {label: 'In Progress', value: 'inProgress'},
            {label: 'Finished', value: 'finished'}
        ];

    @track accounts;
    isLoading;

    @track records;


    constructor() {
        super();

        this.isLoading = true;

        this.records = [
            {
                Id: '12345',
                Name: 'Acme - 1,200 Widgets',
                AccountName: 'Acme',
                CloseDate: '4/10/15',
                Stage: 'New',
                Confidence: '30%',
                Amount: '$25,000,000',
                Contact: 'jrogers@acme.com'
            },
            {
                Id: '12346',
                Name: 'Walmart LTD - 1,200 Widgets',
                AccountName: 'Walmart',
                CloseDate: '12/12/15',
                Stage: 'In Progress',
                Confidence: '30%',
                Amount: '$100,000,000',
                Contact: 'bachs@acme.com'
            },
            {
                Id: '12347',
                Name: 'Microsoft Corp',
                AccountName: 'Microsoft',
                CloseDate: '1/03/17',
                Stage: 'Finished',
                Confidence: '30%',
                Amount: '$69,000,000',
                Contact: 'asfd@acme.com'
            }
        ];
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

    get key() {
        return 'test';
    }

    finalizeRendering() {
        this.isLoading = false;
    }

    handleOnChangeStatus(event) {
        console.log('handleOnChangeStatus');
    }

    handleRedirectToRecord(event) {
        let record = event.target.parentNode.getTableBodyRowValue();
        this.records[record.index].AccountName = 'Render Test';
    }


}