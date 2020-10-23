/**
 * Created by BMaleczek on 28.03.2020.
 */
import { LightningElement, wire, api, track } from "lwc";

export default class Datatable extends LightningElement {
  connectedCallback() {
    this.classList.add("finally-table");
    this.classList.add("slds-table");
    this.classList.add("slds-table_fixed-layout");
    this.classList.add("reset-action-padding");
  }
}
