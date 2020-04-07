/**
 * Created by BMaleczek on 07.04.2020.
 */

import {LightningElement, api, wire, track} from 'lwc';

export default class DatatableCell extends LightningElement {
    _isTruncated;
    _cellTitle;
    truncateClass;

    connectedCallback() {
        this.classList.add('table-body-cell');
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
            this.truncateClass = 'slds-size--1-of-1';
        }
    }

    @api
    get cellTitle() {
        return this._cellTitle;
    }

    set cellTitle(value) {
       this._cellTitle = value;
    }

    @api getTableBodyRowValue() {
        return this.getParentNode().value;
    }

    @api getTableBodyRowIndex() {
        return this.getParentNode().index;
    }

    getParentNode(parentNode) {
        if(parentNode) {
            if(parentNode.parentNode.localName == 'c-datatable-body-row') {
                return parentNode.parentNode;
            } else {
                this.getParentNode(this.template.host.parentNode);
            }
        } else {
            if(this.template.host.parentNode.localName == 'c-datatable-body-row') {
                return this.template.host.parentNode;
            } else {
                this.getParentNode(this.template.host.parentNode);
            }
        }
    }
}