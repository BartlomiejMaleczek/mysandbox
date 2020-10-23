/**
 * Created by BMaleczek on 07.04.2020.
 */

import { LightningElement, api, wire, track } from "lwc";

export default class DatatableBodyRow extends LightningElement {
  _value;
  _index;

  connectedCallback() {
    this.classList.add("finally-table-row");
    this.classList.add("slds-hint-parent");
  }

  @api
  get value() {
    return this._value;
  }

  set value(value) {
    this._value = Object.assign({}, value);
  }

  @api
  get index() {
    return this._index;
  }

  set index(value) {
    this._index = value;
  }
}
