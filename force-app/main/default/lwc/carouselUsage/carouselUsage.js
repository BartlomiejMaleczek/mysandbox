/**
 * Created by BMaleczek on 15.01.2021.
 */

import {LightningElement} from 'lwc';
import carousel01jpg from '@salesforce/contentAssetUrl/carousel01jpg';
import carousel02jpg from '@salesforce/contentAssetUrl/carousel02jpg';
import carousel03jpg from '@salesforce/contentAssetUrl/carousel03jpg';

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

    images = {
        carousel01jpg: carousel01jpg,
        carousel02jpg: carousel02jpg,
        carousel03jpg: carousel03jpg
    }

    autoPlay = true;
    hasNextSlide = true;
    hasPrevSlide = false;

    startAutoPlay() {
        this.autoPlay = true;
    }

    stopAutoPlay() {
        this.autoPlay = false;
    }

    get isPrevDisabled() {
        return !this.hasPrevSlide;
    }

    get isNextDisabled() {
        return !this.hasNextSlide;
    }

    nextSlide() {
        const carousel = this.template.querySelector('.carousel-with-custom-next-prev');
        carousel.changeNextSlide().then(() => {
            this.hasNextSlide = carousel.hasNextSlide();
            this.hasPrevSlide = carousel.hasPrevSlide();
        });
    }

    prevSlide() {
        const carousel = this.template.querySelector('.carousel-with-custom-next-prev');
        carousel.changePrevSlide().then(() => {
            this.hasNextSlide = carousel.hasNextSlide();
            this.hasPrevSlide = carousel.hasPrevSlide();
        });
    }
}
