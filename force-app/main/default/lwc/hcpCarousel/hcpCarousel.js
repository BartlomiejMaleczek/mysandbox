import {LightningElement, track, api} from 'lwc';
import {_utils, classUtils} from "c/utils";

const SLDS_IS_ACTIVE = 'slds-is-active';
const SLDS_CAROUSEL_INDICATION_ACTION = 'slds-carousel__indicator-action';
const SWIPE_DISTANCE_THRESHOLD = 20;
const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';

export default class HcpCarousel extends LightningElement {
    @track navItems = [];

    currSlideNumber = 0;
    swipeXStart = 0;

    autoPlayTimer;
    loopBackTimer;

    isLoopingBack = false;
    hasLoopBackTimerStarted = false;

    _autoPlay = false;
    _dots = false;

    _autoPlaySpeed = 2000;
    _scrollSlideSpeed = 500;

    @api slidesToShow = 1;
    @api slidesToScroll = 1;
    @api paddings = '';

    constructor() {
        super();
        this._debouncedChangeSlide = this.debounce(this.changeSlide.bind(this), 200);
    }

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
    get autoPlaySpeed() {
        return this._autoPlaySpeed;
    }

    set autoPlaySpeed(autoPlaySpeed) {
        this._autoPlaySpeed = this.parseIntFromStr(autoPlaySpeed);
    }

    @api
    get scrollSlideSpeed() {
        return this._scrollSlideSpeed;
    }

    set scrollSlideSpeed(scrollSlideSpeed) {
        this._scrollSlideSpeed = this.parseIntFromStr(scrollSlideSpeed);
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
        return `transition: transform ${this.scrollSlideSpeed}ms ease-in;transform:translateX(-${(this.currSlideNumber + (this.slidesToShow / this.slidesToScroll)) * (100 * (this.slidesToScroll / this.slidesToShow))}%);`
    }

    get carouselPanelsClasses() {
        return classUtils.set('slds-carousel__panels')
            .add({
                'shifting-back': this.isLoopingBack
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
        clearTimeout(this.autoPlayTimer);
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.autoPlayTimer = setTimeout(this._changeNextSlide, this.autoPlaySpeed);
    }

    appendClonedSlides(slot) {
        const lastAssignedNodesIndex = slot.assignedNodes().length;
        const clonedFirstSlides = slot.assignedNodes()
            .slice(0, this.slidesToShow)
            .map((item) => {
                return item.cloneNode(true)
            });

        const clonedLastSlides = slot.assignedNodes()
            .slice(lastAssignedNodesIndex - this.slidesToShow, lastAssignedNodesIndex)
            .map((item) => {
                return item.cloneNode(true)
            })
            .reverse();

        clonedLastSlides.forEach((clonedSlide, index) => {
            if (index === 0) {
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
        clearTimeout(this.autoPlayTimer);
        clearTimeout(this.loopBackTimer);
    }

    _changeNextSlide = () => {
        if (!this.hasLoopBackTimerStarted) {
            this.changeSlide(1);
        }

        this.setAutoPlay();
    }

    //Use wrapping method, because after query selector component, lambda method cannot be called
    @api
    changeNextSlide() {
        this._debouncedChangeSlide(1);
    }

    @api
    changePrevSlide() {
        this._debouncedChangeSlide(-1);
    }

    @api
    hasNextSlide() {
        return this.currSlideNumber !== this.navItems.length - 1;
    }

    @api
    hasPrevSlide() {
        return this.currSlideNumber !== 0;
    }

    changeSlide(dir) {
        if (this.isLoopingBack)
            this.isLoopingBack = false;

        let nextSlideNumber = this.currSlideNumber + dir;

        if (nextSlideNumber === this.navItems.length) {
            nextSlideNumber = 0;
        } else if (nextSlideNumber < 0) {
            nextSlideNumber = this.navItems.length - 1;
        }

        const currentSlide = this.findCurrSlide();
        const prevSlide = this.findSlideByNumber(nextSlideNumber);

        this.deactivateSlide(currentSlide);
        this.activateSlide(prevSlide);

        this.currSlideNumber += dir;
        try {
            this.loopBack();
        } catch (e) {
            console.error(e);
        }

    }

    loopBack() {
        clearTimeout(this.loopBackTimer);
        this.hasLoopBackTimerStarted = true;

        this.loopBackTimer = setTimeout(() => {
            if (this.currSlideNumber === this.navItems.length) {
                this.isLoopingBack = true;
                this.currSlideNumber = 0;
            } else if (this.currSlideNumber < 0) {
                this.isLoopingBack = true;
                this.currSlideNumber = this.navItems.length - 1;
            }

            this.hasLoopBackTimerStarted = false;
        }, this.scrollSlideSpeed + 50);

    }


    handleSelectSlide(event) {
        if (this.autoPlayTimer)
            this.stopAutoPlay();

        const nextSlideNumber = parseInt(event.currentTarget.dataset.index);
        const nextSlide = this.findSlideByNumber(nextSlideNumber);
        const currentSlide = this.findCurrSlide();

        this.deactivateSlide(currentSlide);
        this.activateSlide(nextSlide);

        this.currSlideNumber = nextSlideNumber;

        event.target.blur();
    }

    handleTouchStart({changedTouches}) {
        this.swipeXStart = (changedTouches && changedTouches[0].clientX) || 0;
    }

    handleTouchEnd(event) {
        const {changedTouches} = event;
        const swipeXEnd = (changedTouches && changedTouches[0].clientX) || 0;
        const dx = swipeXEnd - this.swipeXStart;
        const direction =
            Math.sign(dx) === 1 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        if (Math.abs(dx) > SWIPE_DISTANCE_THRESHOLD) {
            if (direction === DIRECTION_RIGHT) {
                this.changeSlide(1);
            } else {
                this.changeSlide(-1);
            }
            event.preventDefault();
        }
        this.swipeXStart = 0;
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

    parseIntFromStr(value) {
        return (typeof value === 'string' ? parseInt(value) : value);
    }

    debounce = (callback, wait) => {
        let timeout = null;

        return (...args) => {
            const next = () => callback(...args)
            clearTimeout(timeout)
            timeout = setTimeout(next, wait)
        }
    }
}
