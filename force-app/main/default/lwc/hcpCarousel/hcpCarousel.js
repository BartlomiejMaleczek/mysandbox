import {LightningElement, track, api} from 'lwc';
import {_utils, classUtils} from "c/utils";

const SLDS_IS_ACTIVE = 'slds-is-active';
const SLDS_CAROUSEL_INDICATION_ACTION = 'slds-carousel__indicator-action';

export default class HcpCarousel extends LightningElement {
    @track navItems = [];
    currSlideNumber = 0;
    isShiftingBack = false;

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

        if (!this._autoPlay && autoPlay && this.navItems.length) {
            this.setAutoPlay();
        }

        if (!_autoPlay) {
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
        return `transform:translateX(-${(this.currSlideNumber + (this.slidesToShow / this.slidesToScroll))  * (100 * (this.slidesToScroll / this.slidesToShow))}%);`
    }

    get carouselPanelsClasses() {
        return classUtils.set('slds-carousel__panels')
            .add({
                'shifting-back': this.isShiftingBack
            });
    }

    handleSlotChange(evt) {
        const slot = this.template.querySelector('slot');
        const navItems = [];

        let styleClasses;
        let slideNumber = 0;

        if (slot.assignedNodes() && slot.assignedNodes().length && !this.navItems.length) {
            slot.assignedNodes().forEach((carouselItem, index) => {
                styleClasses = [];

                classUtils.listMutation(carouselItem.classList, {
                    [`slds-size--1-of-${this.slidesToShow}`]: true
                });

                if (index % this.slidesToScroll === 0) {
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

            this.appendClonedSlides(slot);

        }
    }

    setAutoPlay() {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this._autoPlayTimer = setInterval(this._changeNextSlide, this.autoPlaySpeed);
    }

    appendClonedSlides(slot) {
        const lastAssignedNodesIndex = slot.assignedNodes().length;
        const clonedFirstSlides = slot.assignedNodes()
            .slice(0, this.slidesToShow)
            .map((item) => {return item.cloneNode(true)});

        const clonedLastSlides = slot.assignedNodes()
            .slice(lastAssignedNodesIndex - this.slidesToShow, lastAssignedNodesIndex)
            .map((item) => {return item.cloneNode(true)})
            .reverse();

        clonedLastSlides.forEach((clonedSlide, index) => {
            if(index === 0) {
                slot.insertBefore(clonedSlide, slot.assignedNodes()[0]);
            } else {
                slot.insertBefore(clonedSlide, clonedLastSlides[index - 1]);
            }
        });

        clonedFirstSlides.forEach((clonedSlide) => {
            slot.appendChild(clonedSlide);
        });
    }

    stopAutoPlay() {
        clearInterval(this._autoPlayTimer);
    }

    _changeNextSlide = () => {
        try {
            this.changeSlide(1);
        } catch (e) {
            console.error(e);
        }

    }

    //Use wrapping method, because after query selector component, lambda method cannot be called
    @api
    changeNextSlide() {
        this.changeSlide(1);
    }

    @api
    changePrevSlide() {
        this.changeSlide(-1);
    }

    changeSlide(dir) {
        if (this.isShiftingBack)
            this.isShiftingBack = false;

        let nextSlideNumber = this.currSlideNumber + dir;

        if (nextSlideNumber === this.navItems.length) {
            nextSlideNumber = 0;
        } else if(nextSlideNumber < 0) {
            nextSlideNumber = this.navItems.length - 1;
        }

        const currentSlide = this.findCurrSlide();
        const prevSlide = this.findSlideByNumber(nextSlideNumber);

        this.deactivateSlide(currentSlide);
        this.activateSlide(prevSlide);

        this.currSlideNumber += dir;
    }

    handleSelectSlide(event) {
        if (this._autoPlayTimer)
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
        return this.navItems.find(item => item.index === Math.abs(this.currSlideNumber) % this.navItems.length);
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

    handleTransitioned(event) {
        if (this.currSlideNumber === this.navItems.length) {
            this.isShiftingBack = true;
            this.currSlideNumber = 0;
        } else if (this.currSlideNumber < 0) {
            this.isShiftingBack = true;
            this.currSlideNumber = this.navItems.length - 1;
        }
    }
}
