/**
 * Created by BMaleczek on 23.06.2020.
 */

import {LightningElement} from 'lwc';

export default class LwcPoc extends LightningElement {
    renderedCallback() {
        const style = document.createElement('style');
        style.innerText = `.slds-accordion__section {background-color: red;padding: 0.5rem;}`;
        var accordionSection = this.template.querySelector('lightning-accordion-section');
        console.log('accordionSection', accordionSection);
        if (accordionSection) {
            console.log('append child', style);
            accordionSection.appendChild(style);
        };
    }
}