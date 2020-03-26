/**
 * Created by BMaleczek on 22.03.2020.
 */

import {LightningElement} from 'lwc';

export default class ParentCustomEvent extends LightningElement {
    page = 1;

    constructor() {
        super();

        this.addEventListener('previous', () => {
            console.log('Handler previous');
            if (this.page > 1) {
                this.page = this.page - 1;
            }
        });
        this.addEventListener('next', () => {
            console.log('Handler next');
            this.page = this.page + 1;
        });

        this.template.addEventListener('previous', () => {
            console.log('Handler previous');
            if (this.page > 1) {
                this.page = this.page - 1;
            }
        });
        this.template.addEventListener('next', () => {
            console.log('Handler next');
            this.page = this.page + 1;
        });
    }

    fireComposedEvent() {
        console.log('fireComposedEvent');
        this.dispatchEvent(new CustomEvent('composedevt', { bubbles: true, composed: true }));
    }

    previousHandler(evt) {
        console.log('Handler previous');
        if (this.page > 1) {
            this.page = this.page - 1;
        }
    }

    nextHandler(evt) {
        console.log('Handler next');
        this.page = this.page + 1;
    }
}