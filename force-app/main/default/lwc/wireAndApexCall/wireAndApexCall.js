/**
 * Created by BMaleczek on 25.03.2020.
 */

import {LightningElement, api, track, wire} from 'lwc';
import {refreshApex, getSObjectValue} from '@salesforce/apex';
import getContactListApex from '@salesforce/apex/WireAndApexCallController.getContactListApex';
import getContactListApex2 from '@salesforce/apex/WireAndApexCallController.getContactListApex2';
import getContactListApex3 from '@salesforce/apex/WireAndApexCallController.getContactListApex3';
import getInnerWireAndApexCallApex from '@salesforce/apex/WireAndApexCallController.getInnerWireAndApexCallApex';
import setInnerWireAndApexCallApex from '@salesforce/apex/WireAndApexCallController.setInnerWireAndApexCallApex';

// normalna funkcja w wire z refreshApex funkcji INIT

export default class WireAndApexCall extends LightningElement {
    isChangedOnWire = false;
    contacts;
    error;

    @api recordId;
    recordId2 = '0011n000028w6nJAAQ';
    privateRecordId;
    accountIds = [];
    innerWireAndApexCallArr;

    connectedCallback() {
        //
        this.getContactList()
            .then((result) => {
                    console.log('PROMISE CONNECTED THEN', result);
                }
            ).catch((error) => {
                    console.log('PROMISE ERROR CONNECTED catch', error);
                }
            );

        this.getInnerWireAndApexCall();
    }

    getContactList() {
        return new Promise(((resolve, reject) => {
            getContactListApex(
                {
                    accountId: this.recordId
                })
                .then((result) => {
                    console.log('PROMISE CONNECTED', result);
                    resolve(result);
                })
                .catch((error) => {
                        console.log('PROMISE ERROR CONNECTED', error);
                        reject(error);
                    }
                );
        }));
    }

    getInnerWireAndApexCall() {
        return new Promise(((resolve, reject) => {
            getInnerWireAndApexCallApex({

            })
                .then((result) => {
                    console.log('getInnerWireAndApexCall CONNECTED', result);
                    this.innerWireAndApexCallArr = result;
                    resolve(result);
                })
                .catch((error) => {
                        console.log('getInnerWireAndApexCall ERROR CONNECTED', error);
                        reject(error);
                    }
                );
        }));
    }

    // @wire(refreshApex, {accountId: '$recordId'})

// {accountId: '$recordId'}
    @wire(getContactListApex, {accountId: '$recordId'})
    wiredContacts({error, data}) {
        console.log('wiredContacts');
        console.log(data);
        if (data) {
            this.contacts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }

    @wire(getContactListApex2, {accountIds: '$accountIds'})
    wiredContacts2({error, data}) {
        console.log('wiredContacts');
        console.log(data);
        if (data) {
            this.contacts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }

    @wire(getContactListApex3, {accountId: '$recordId'})
    wiredContacts3({error, data}) {
        console.log('wiredContacts');
        console.log(data);
        if (data) {
            this.contacts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }


    get isContactsDataNotEmpty() {
        return (this.contacts && this.contacts.data ? true : false);
    }

    setInnerWireAndApexCall() {
        setInnerWireAndApexCallApex({innerWireAndApexCallsJSON: JSON.stringify(this.innerWireAndApexCallArr)}).then(() => {
            console.log('setInnerWireAndApexCall successs');
        }).catch((error) => {

        });
    }

    handleChangeId() {
        console.log('HANDLE CHANGE ID');
        this.recordId = '0011n000028w6nJAAQ';
    }

}