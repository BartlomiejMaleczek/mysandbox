/**
 * Created by BMaleczek on 18.03.2020.
 */

import {LightningElement} from 'lwc';

export default class ParentItemRegister extends LightningElement {

    connectedCallback() {
        console.log('connectedCallback');
        console.log(this.getAttribute('accessKey'));
        console.log(this.getAttribute('accesskey'));
    }

    handleChildRegister(event) {
        // Suppress event if it’s not part of the public API
        event.stopPropagation();
        const item = event.detail;
        const guid = item.guid;


        const target = event.target,
            callbacks = event.detail.callbacks,
            itemName = event.detail.name;

        console.log(target);
        console.log(event);
        // this.privateChildrenRecord[guid] = item;
    }


}