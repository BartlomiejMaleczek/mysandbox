import {LightningElement, track, api} from 'lwc';
import {_utils, classUtils} from "c/utils";

const SLDS_IS_ACTIVE = 'slds-is-active';
const SLDS_CAROUSEL_INDICATION_ACTION = 'slds-carousel__indicator-action';

export default class HcpCarousel extends LightningElement {
    @track navItems = [];
    currSlideNumber = 0;

    _autoPlayTimer;
    _autoPlay = false;
    _dots = false;

    @api slidesToShow = 1;
    @api slidesToScroll = 1;
    @api paddings = '';
    @api autoPlaySpeed = 2000;

    disconnectedCallback() {
        this.stopAutoPlay();
    }

    @api
    get autoPlay() {
        return this._autoPlay;
    }

    set autoPlay(autoPlay) {
        const _autoPlay = this.normalizeBoolean(autoPlay);

        if(!this._autoPlay && autoPlay && this.navItems.length) {
            this.setAutoPlay();
        }

        if(!_autoPlay) {
            this.stopAutoPlay();
        }

        this._autoPlay = _autoPlay;
    }

    @api
    get dots() {
        return this._dots;
    }

    set dots(dots) {
        this._dots = this.normalizeBoolean(dots);
    }

    get stageStyle() {
        return this.paddings;
    }

    get carouselTranslate() {
        return `transform:translateX(-${this.currSlideNumber * (100 * (this.slidesToScroll / this.slidesToShow))}%);`
    }

    handleSlotChange(evt) {
        const slot = this.template.querySelector('slot');
        const navItems = [];

        let styleClasses;
        let slideNumber = 0;

        if (slot.assignedNodes() && slot.assignedNodes().length) {
            slot.assignedNodes().forEach((carouselItem, index) => {
                styleClasses = [];

                classUtils.listMutation(carouselItem.classList, {
                    [`slds-size--1-of-${this.slidesToShow}`]: true
                });

                if (index % this.slidesToShow === 0) {
                    styleClasses.push(SLDS_CAROUSEL_INDICATION_ACTION);

                    if (slideNumber == 0) {
                        styleClasses.push(SLDS_IS_ACTIVE);
                    }

                    navItems.push({
                        key: _utils.guid.generate(),
                        tabindex: 0,
                        ariaControls: `carousel-item-${slideNumber}`,
                        index: slideNumber,
                        styleClasses: styleClasses.join(' ')
                    });

                    slideNumber += 1;
                }
            });

            this.navItems = navItems;

            if (this.autoPlay) {
                this.setAutoPlay();
            }

        }
    }

    setAutoPlay() {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this._autoPlayTimer = setInterval(this._changeNextSlide, this.autoPlaySpeed);
    }

    stopAutoPlay() {
        clearInterval(this._autoPlayTimer);
    }

    //Use wrapping method, because after query selector component, lambda method cannot be called
    @api
    changeNextSlide() {
        this._changeNextSlide();
    }

    _changeNextSlide = () => {
        let nextSlideNumber = this.currSlideNumber + 1;

        if (nextSlideNumber >= this.navItems.length)
            nextSlideNumber = 0;

        const currentSlide = this.findCurrSlide();
        const nextSlide = this.findSlideByNumber(nextSlideNumber);

        this.deactivateSlide(currentSlide);
        this.activateSlide(nextSlide);

        this.currSlideNumber = nextSlideNumber;
    }

    @api
    changePrevSlide() {
        let prevSlideNumber = this.currSlideNumber - 1;

        if (prevSlideNumber < 0)
            prevSlideNumber = this.navItems.length - 1;

        const currentSlide = this.findCurrSlide();
        const prevSlide = this.findSlideByNumber(prevSlideNumber);

        this.deactivateSlide(currentSlide);
        this.activateSlide(prevSlide);

        this.currSlideNumber = prevSlideNumber;
    }

    handleSelectSlide(event) {
        if(this._autoPlayTimer)
            this.stopAutoPlay();

        const nextSlideNumber = parseInt(event.currentTarget.dataset.index);
        const nextSlide = this.findSlideByNumber(nextSlideNumber);
        const currentSlide = this.findCurrSlide();

       this.deactivateSlide(currentSlide);
       this.activateSlide(nextSlide);

       this.currSlideNumber = nextSlideNumber;

        event.target.blur();
    }

    findCurrSlide() {
        return this.navItems.find(item => item.index === this.currSlideNumber);
    }

    findSlideByNumber(slideNumber) {
        return this.navItems.find(item => item.index === slideNumber);
    }

    activateSlide(slide) {
        slide.styleClasses = [slide.styleClasses, SLDS_IS_ACTIVE].join(' ');
    }

    deactivateSlide(slide) {
        slide.styleClasses = slide.styleClasses.replace(SLDS_IS_ACTIVE, '');
    }

    normalizeBoolean(value) {
        return (typeof value === 'string' ? value === 'true' : value);
    }
}
