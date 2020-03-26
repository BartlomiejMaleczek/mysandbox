/**
 * Created by BMaleczek on 22.03.2020.
 */

import {LightningElement} from 'lwc';

export default class LifecycleParent extends LightningElement {
    isChildVisible;

    constructor() {
        super();
        this.isChildVisible = true;
        console.log('CONCTRUCTOR PARENT');
    }

    connectedCallback() {
        console.log('Connected Callback PARENT');
    }
    disconnectedCallback() {
        console.log('Disconnected Callback PARENT');
    }
    hideChild() {
        this.isChildVisible = false;
    }

    renderedCallback() {
        console.log('RENDERED PARENT');
    }

    error;
    stack;
    errorCallback(error, stack) {
        this.error = error;
        console.log("PARENT ERROR", error);
        console.log(stack);
    }
}