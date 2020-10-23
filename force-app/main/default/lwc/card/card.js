/**
 * Created by BMaleczek on 01.04.2020.
 */

import { LightningElement, api, wire, track } from "lwc";

export default class Card extends LightningElement {
  @api title;
  @api iconName;
  @api _isFooterVisible = false;

  @api
  get isFooterVisible() {
    return this._isFooterVisible;
  }

  set isFooterVisible(value) {
    this._isFooterVisible = value == "true";
  }

  get isIconNameNotEmpty() {
    return this.iconName && this.iconName.length;
  }
}
