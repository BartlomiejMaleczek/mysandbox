/**
 * Created by BMaleczek on 07.04.2020.
 */

import {LightningElement} from 'lwc';

export default class DatatableCell extends LightningElement {
    connectedCallback() {
        this.classList.add('table-body-cell');
    }
}