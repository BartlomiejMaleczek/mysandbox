/**
 * Created by BMaleczek on 15.01.2021.
 */

import {LightningElement} from 'lwc';

export default class CarouselUsage extends LightningElement {
    items = [
        {ariaLabelledBy: 'carousel-item-1'},
        {ariaLabelledBy: 'carousel-item-2'},
        {ariaLabelledBy: 'carousel-item-3'},
        {ariaLabelledBy: 'carousel-item-4'},
        {ariaLabelledBy: 'carousel-item-5'},
        {ariaLabelledBy: 'carousel-item-6'},
        {ariaLabelledBy: 'carousel-item-7'},
        {ariaLabelledBy: 'carousel-item-8'},
        {ariaLabelledBy: 'carousel-item-9'}
    ];

    autoPlay = true;

    startAutoPlay() {
        this.autoPlay = true;
    }

    stopAutoPlay() {
        this.autoPlay = false;
    }

    nextSlide() {
        const carousel = this.template.querySelector('.carousel-with-custom-next-prev');
        carousel.changeNextSlide();
    }

    prevSlide() {
        const carousel = this.template.querySelector('.carousel-with-custom-next-prev');
        carousel.changePrevSlide();
    }
}
