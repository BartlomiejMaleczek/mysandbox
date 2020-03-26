/**
 * Created by BMaleczek on 22.03.2020.
 */

import {LightningElement} from 'lwc';

export default class ChildCustomEvent extends LightningElement {
    previousHandler(evt) {
        console.log('strzelam previous');
        this.dispatchEvent(new CustomEvent('previous', {bubbles: true}));
    }

    nextHandler() {
        console.log('strzelam next');
        this.dispatchEvent(new CustomEvent('next', {bubbles: true}));
    }
}