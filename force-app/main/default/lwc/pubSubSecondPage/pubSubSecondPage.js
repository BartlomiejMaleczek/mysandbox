/**
 * Created by BMaleczek on 22.03.2020.
 */

import {LightningElement, api, track, wire} from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class PubSubSecondPage extends LightningElement {

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        registerListener('firepubsub', this.handleReceivedPubSub, this);
    }

    handleReceivedPubSub() {
        console.log('SECOND PAGE handleReceivedPubSub');
    }

}