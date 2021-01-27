import {LightningElement} from 'lwc';
import {classUtils} from "c/utils";

export default class HcpCarouselItem extends LightningElement {
    connectedCallback() {
        classUtils.listMutation(this.classList, {
            'slds-carousel__content': true,
            'slds-carousel__panel': true
        });
    }
}
