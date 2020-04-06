/**
 * Created by BMaleczek on 05.04.2020.
 */

import {LightningElement, api, track, wire} from 'lwc';

export default class DatatableColumn extends LightningElement {
    _isSortable;
    @api columnTitle;
    @api columnClasses;
    @api columnStyle;

    constructor() {
        super();
    }

    connectedCallback() {
        console.log('Connected Callback');
        this.classList.add('finally-table-header-cell');

        if(this.isSortable) {
            this.classList.add('finally-table-header-sortable');
            this.classList.add('slds-is-sortable');
        } else {
            this.classList.add('finally-table-header-not-sortable');
        }


        if(this.columnTitle) {
            this.setAttribute('title', this.columnTitle);
        }

        console.log(this.template);
    }

    handleHeaderOnClick(event) {
        if(this.isSortable) {
            const linkAction = this.template.querySelector('.finally-header-link');
            linkAction.setAttribute('tabindex', 0);
            linkAction.focus();
        }
    }

    @api
    get isSortable() {
        return this._isSortable;
    }

    set isSortable(value) {
        if(value == 'true') {
            this._isSortable = true;
        } else if(value == 'false') {
            this._isSortable = false;
        }
    }
}