/**
 * Created by BMaleczek on 22.03.2020.
 */

import {LightningElement} from 'lwc';

export default class LifecycleChild extends LightningElement {
     constructor() {
        super();

        this.isChildVisible = true;
        console.log('CONCTRUCTOR CHILD');
    }

    connectedCallback() {
        console.log('Connected Callback CHILD');
        // throw new Error('TEST EROR');
    }
    disconnectedCallback() {
        console.log('Disconnected Callback CHILD');
    }

    renderedCallback() {
        console.log('RENDERED CHILD');
    }

    error;
    stack;
    errorCallback(error, stack) {
        this.error = error;
        console.log("CHILD ERROR", error);

    }

}