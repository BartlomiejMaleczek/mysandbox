/**
 * Created by BMaleczek on 22.03.2020.
 */

import {LightningElement, wire} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';

export default class PubSubFirstPage extends LightningElement {
    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        // subscribe to searchKeyChange event
        registerListener('firepubsub', this.handleReceivedPubSub, this);
    }

    handleReceivedPubSub() {
        console.log('FIRST PAGE handleReceivedPubSub');
    }

    handleFirePubSubEvt() {
        fireEvent(this.pageRef, 'firepubsub', {});
    }
}