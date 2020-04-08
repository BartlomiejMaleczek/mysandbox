import {LightningElement} from 'lwc';

export default class DatatableWithFixedHeaderContainer extends LightningElement {
    connectedCallback() {
        this.classList.add('flex-grid');
        this.classList.add('finally-table--header-fixed_container');
        this.classList.add('slds-table--header-fixed_container');
    }
}