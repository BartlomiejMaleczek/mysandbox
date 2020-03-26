/**
 * Created by BMaleczek on 23.03.2020.
 */

import {LightningElement, api, track, wire} from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import OPP_NAME from '@salesforce/schema/Opportunity.Account.CreatedBy.LastModifiedById';

export default class LightnintDesignSystem extends LightningElement {
    @api recordId;
    accountObject = ACCOUNT_OBJECT;

    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD] })
    // @wire(getRecord, { recordId: '$recordId', fields: ['Account.Name'] })
    wiredAccount(obj) {
        console.log('DATA', obj.data);
        if (obj.data) {
            this.record = obj.data;
            this.error = undefined;
        } else if (obj.error) {
            this.error = obj.error;
            this.record = undefined;
        }
    }
    // get name() {
    //     return this.record.fields.Name.value;
    // }
    // record;

    get nameValue() {
        return 'test';
        // console.log(this.accountObject);
        // console.log(NAME_FIELD);
        // console.log(OPP_NAME);
        // console.log(this.template.querySelectorAll('lightning-record-form'));
        // return this.record.data ? getFieldValue(this.record.data, NAME_FIELD) : '';
    }

}