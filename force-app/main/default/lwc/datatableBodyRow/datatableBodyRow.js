/**
 * Created by BMaleczek on 07.04.2020.
 */

import {LightningElement} from 'lwc';

export default class DatatableBodyRow extends LightningElement {

    connectedCallback() {
        this.classList.add('finally-table-row');
        this.classList.add('slds-hint-parent');
    }
}