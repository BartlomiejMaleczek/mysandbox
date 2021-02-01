/**
 * Created by BMaleczek on 15.01.2021.
 */

import {LightningElement} from 'lwc';
import carousel01jpg from '@salesforce/contentAssetUrl/carousel01jpg';
import carousel02jpg from '@salesforce/contentAssetUrl/carousel02jpg';
import carousel03jpg from '@salesforce/contentAssetUrl/carousel03jpg';

export default class CarouselUsage extends LightningElement {
    items = [
        {ariaLabelledBy: '1'},
        {ariaLabelledBy: '2'},
        {ariaLabelledBy: '3'},
        {ariaLabelledBy: '4'},
        {ariaLabelledBy: '5'},
        {ariaLabelledBy: '6'},
        {ariaLabelledBy: '7'},
        {ariaLabelledBy: '8'},
        {ariaLabelledBy: '9'}
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
