/**
 * Created by BMaleczek on 18.03.2020.
 */

import {LightningElement} from 'lwc';

export default class ChildItemRegister extends LightningElement {
    connectedCallback() {
        const itemregister = new CustomEvent('privateitemregister', {
            bubbles: true,
            detail: {
                callbacks: {
                    select: this.select,
                },
                guid: this.guid,
            }
        });

        console.log('STRZDELAM');

        this.dispatchEvent(itemregister);
    }

    renderedCallback() {

    }
}