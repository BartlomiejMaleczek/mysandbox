/**
 * Created by BMaleczek on 05.04.2020.
 */

import {LightningElement, api, track, wire} from 'lwc';

export default class DatatableColumn extends LightningElement {
    _isSortable;
    _isTruncated;
    _isHeaderFixed;
    truncateClass;
    finallyHeaderLinkClasses;

    @api columnTitle;

    constructor() {
        super();
        this._isSortable = false;
        this.finallyHeaderLinkClasses = 'finally-header-link slds-text-link_reset';
    }

    connectedCallback() {
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
    get isHeaderFixed() {
        return this._isHeaderFixed;
    }

    set isHeaderFixed(value) {
        this._isHeaderFixed = (value == 'true');

        if(this._isHeaderFixed)
            this.finallyHeaderLinkClasses = this.finallyHeaderLinkClasses.concat(' slds-cell-fixed');

    }

    @api
    get isTruncated() {
        return this._isTruncated;
    }

    set isTruncated(value) {
        this._isTruncated = (value == 'true');

        if(this._isTruncated) {
            this.truncateClass = 'slds-truncate';
        } else {
            this.truncateClass = 'slds-size--1-of-1 ';
        }
    }

    @api
    get isSortable() {
        return this._isSortable;
    }

    set isSortable(value) {
        this._isSortable = (value == 'true');
    }
}