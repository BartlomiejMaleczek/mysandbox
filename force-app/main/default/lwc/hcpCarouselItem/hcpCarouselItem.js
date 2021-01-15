import {LightningElement} from 'lwc';
import {classUtils} from "c/utils";

export default class HcpCarouselItem extends LightningElement {
    connectedCallback() {
        classUtils.listMutation(this.classList, )
        this.classList.add('slds-carousel__panel');
    }
}
