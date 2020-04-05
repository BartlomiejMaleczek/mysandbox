/**
 * Created by BMaleczek on 05.04.2020.
 */

import {LightningElement, api, track, wire} from 'lwc';

export default class DatatableColumn extends LightningElement {
    @api isSortable;
    @api title;
    @api columnClasses;

    constructor() {
        super();

        this.isSortable = false;
    }

    get columnClasses() {
        if(this.isSortable) {
            if(this.columnClasses) {
                this.columnClasses = this.columnClasses.concat(' slds-is-resizable slds-is-sortable');
            } else {
                this.columnClasses = 'slds-is-resizable slds-is-sortable';
            }
        }

        return this.columnClasses;
    }
}