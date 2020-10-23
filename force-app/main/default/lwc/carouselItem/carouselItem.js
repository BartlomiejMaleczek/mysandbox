import {LightningElement} from 'lwc';

export default class CarouselItem extends LightningElement {

    connectedCallback() {
        this.classList.add('slds-carousel__panel');
    }
}