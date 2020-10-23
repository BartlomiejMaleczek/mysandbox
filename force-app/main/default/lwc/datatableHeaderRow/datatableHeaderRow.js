import { LightningElement } from "lwc";

export default class DatatableHeaderRow extends LightningElement {
  connectedCallback() {
    this.classList.add("finally-table-row");
    this.classList.add("slds-line-height_reset");
  }
}
