/**
 * Created by BMaleczek on 20.03.2020.
 */

import {LightningElement, api, track} from 'lwc';
// import {NavigationMixin} from "lightning/navigation";
import {_utils} from 'c/shareJavaScriptCodeChild'
// export {getTermOptions, calculateMonthlyPayment, shotToast};
export class ServiceAbstract extends  _utils.SampleMixin(LightningElement) {

    get utils() {
        console.log('XXXX', this.test);

        // this.naviagteToAccountHome();

        return _utils;
    }

}