/**
 * Created by BMaleczek on 28.03.2020.
 */

import { LightningElement } from "lwc";
import CLIENT_FORM_FACTOR from "@salesforce/client/formFactor";
import { _utils } from "c/utils";

export class ServiceAbstract extends _utils.navigation(LightningElement) {
  get utils() {
    return _utils;
  }
}
