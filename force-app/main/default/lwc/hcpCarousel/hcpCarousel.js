import {LightningElement, track, api} from 'lwc';
import {guid, classUtils} from "c/utils";

const SLDS_IS_ACTIVE = 'slds-is-active';
const SLDS_CAROUSEL_INDICATION_ACTION = 'slds-carousel__indicator-action';
const SWIPE_DISTANCE_THRESHOLD = 20;
const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';
const DATA_INDEX_ATTR = 'data-node-index';
const ARIA_HIDDEN_ATTR = 'aria-hidden';
const ARIA_CONTROLS_ATTR = 'aria-controls';
const ARIA_LABELLED_BY_ATTR = 'aria-labelledby';

export default class HcpCarousel extends LightningElement {
    @track navItems = [];
    @track assignedNodes = [];

    currSlideNumber = 0;
    swipeXStart = 0;
    initPosition = 0;
    initDataNodeIndex = 0;
    hasAriaControlsBeenSet = false;

    autoPlayTimer;
    loopBackTimer;

    isLoopingBack = false;
    hasLoopBackTimerStarted = false;

    _autoPlay = false;
    _dots = false;
    _infinite = false;

    _autoPlaySpeed = 2000;
    _scrollSlideSpeed = 500;
    _slidesToShow = 1;
    _slidesToScroll = 1;

    @api paddings = '';

    constructor() {
        super();
        this._debouncedChangeSlide = this.debounce(this.changeSlide.bind(this), 200);
    }

    disconnectedCallback() {
        this.stopAutoPlay();
    }

    renderedCallback() {
        if (this.dots && !this.hasAriaControlsBeenSet) {
            this.setAriaControls();
        }
    }

    setAriaControls() {
        const anchors = this.template.querySelectorAll('a');

        if (anchors && anchors.length) {
            let initAssignedNodeIndex = 0;
            let endAssignedNodeIndex = this.assignedNodes.length;
            let dataIndexAttr;

            if (this.infinite) {
                this.setAriaControlsForClonedNodes(anchors);
                initAssignedNodeIndex = this.initDataNodeIndex;
                endAssignedNodeIndex = this.assignedNodes.length - this.initDataNodeIndex;
            }

            for (let i = initAssignedNodeIndex; i < endAssignedNodeIndex; i++) {
                for (let j = 0; j < anchors.length; j++) {
                    dataIndexAttr = this.assignedNodes[i].getAttribute(DATA_INDEX_ATTR);

                    if (this.getLeftRange(j) <= dataIndexAttr && this.getRightRange(j) > dataIndexAttr) {
                        this.assignedNodes[i].setAttribute(
                            ARIA_LABELLED_BY_ATTR,
                            anchors[j].getAttribute(ARIA_CONTROLS_ATTR)
                        );
                        break;
                    }
                }
            }

            this.hasAriaControlsBeenSet = true;
        }
    }

    setAriaControlsForClonedNodes(anchors) {
        const firstAnchorAriaControlsAttr = anchors[0].getAttribute(ARIA_CONTROLS_ATTR);
        const lastAnchorAriaControlsAttr = anchors[anchors.length - 1].getAttribute(ARIA_CONTROLS_ATTR);

        for(let i = 0; i < this.slidesToShow; i++) {
            this.assignedNodes[i].setAttribute(ARIA_LABELLED_BY_ATTR, lastAnchorAriaControlsAttr);
        }

        for(let i = this.assignedNodes.length - this.slidesToShow; i < this.assignedNodes.length; i++) {
            this.assignedNodes[i].setAttribute(ARIA_LABELLED_BY_ATTR, firstAnchorAriaControlsAttr);
        }

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
    get infinite() {
        return this._infinite;
    }

    set infinite(infinite) {
        this._infinite = this.normalizeBoolean(infinite);
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

    @api
    get slidesToShow() {
        return this._slidesToShow;
    }

    set slidesToShow(slidesToShow) {
        this._slidesToShow = this.parseIntFromStr(slidesToShow);
    }

    @api
    get slidesToScroll() {
        return this._slidesToScroll;
    }

    set slidesToScroll(slidesToScroll) {
        this._slidesToScroll = this.parseIntFromStr(slidesToScroll);
    }

    get stageStyle() {
        return this.paddings;
    }

    get carouselTranslate() {
        return `transition: transform ${this.scrollSlideSpeed}ms ease-in;transform:translateX(-${(this.currSlideNumber + this.initPosition) * (100 * (this.slidesToScroll / this.slidesToShow))}%);`
    }

    get carouselPanelsClasses() {
        return classUtils.set('slds-carousel__panels')
            .add({
                'shifting-back': this.isLoopingBack
            });
    }

    getInitPosition() {
        return (this.infinite ? (this.slidesToShow / this.slidesToScroll) : 0);
    }

    getInitDataIndex() {
        return (this.infinite ? this.slidesToShow : 0);
    }

    handleSlotChange() {
        const slot = this.getSlot();

        if (slot.assignedNodes() && slot.assignedNodes().length && !this.navItems.length) {
            this.initPosition = this.getInitPosition();
            this.initDataNodeIndex = this.getInitDataIndex();

            this.initProcessingAssignedNodes(slot.assignedNodes());
            this.generateNavItems(slot.assignedNodes().length);

            if (this.autoPlay)
                this.setAutoPlay();

            if (this.infinite) {
                this.appendClonedSlides(slot);
            } else {
                this.assignedNodes = slot.assignedNodes();
            }
        }
    }

    initProcessingAssignedNodes(assignedNodes) {
        assignedNodes.forEach((node, index) => {
            classUtils.listMutation(node.classList, {
                [`slds-size--1-of-${this.slidesToShow}`]: true
            });

            if (index < this.slidesToShow) {
                node.setAttribute(ARIA_HIDDEN_ATTR, false);
            } else {
                node.setAttribute(ARIA_HIDDEN_ATTR, true);
            }

            node.setAttribute(DATA_INDEX_ATTR, index + this.initDataNodeIndex);
        });
    }

    generateNavItems(assignedNodesLength) {
        const navItems = [];
        const slidesAmount = this.getSlidesAmount(assignedNodesLength);

        let styleClasses;
        let isSelected;
        let tabIndex;

        for (let i = 0; i <= slidesAmount; i += 1) {
            styleClasses = [SLDS_CAROUSEL_INDICATION_ACTION];
            isSelected = false;
            tabIndex = -1;

            if (i === 0) {
                styleClasses.push(SLDS_IS_ACTIVE);
                isSelected = true;
                tabIndex = 0;
            }

            navItems.push({
                key: guid.generate(),
                tabIndex: tabIndex,
                ariaControls: `carousel-item-${i}`,
                index: i,
                styleClasses: styleClasses.join(' '),
                isSelected: isSelected
            });
        }

        this.navItems = navItems;
    }

    getSlidesAmount(assignedNodesLength) {
        let leftRange = 1;
        let rightRange = this.slidesToShow;
        let slidesAmount = 0;

        while (true) {

            leftRange += this.slidesToScroll;
            rightRange += this.slidesToScroll;

            if (this.isInfiniteCondFulfilled(leftRange, assignedNodesLength)) {
                break;
            }

            if (this.isFiniteCondFulfilled(leftRange, assignedNodesLength, rightRange)) {
                slidesAmount += 1;
                break;
            }

            slidesAmount += 1;
        }

        return slidesAmount;
    }

    isFiniteCondFulfilled(leftRange, assignedNodesLength, rightRange) {
        return !this.infinite && (leftRange <= assignedNodesLength && assignedNodesLength <= rightRange)
    }

    isInfiniteCondFulfilled(leftRange, assignedNodesLength) {
        return this.infinite && leftRange > assignedNodesLength;
    }

    setAutoPlay() {
        clearTimeout(this.autoPlayTimer);
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.autoPlayTimer = setTimeout(this._changeNextSlide, this.autoPlaySpeed);
    }

    appendClonedSlides(slot) {
        const lastAssignedNodesIndex = slot.assignedNodes().length;
        const shiftPosition = this.initDataNodeIndex + slot.assignedNodes().length;
        const clonedFirstSlides = slot.assignedNodes()
            .slice(0, this.slidesToShow)
            .map((item, index) => {
                const clonedNode = item.cloneNode(true);
                clonedNode.setAttribute(ARIA_HIDDEN_ATTR, true);
                clonedNode.setAttribute(DATA_INDEX_ATTR, shiftPosition + index);
                return clonedNode;
            });

        const clonedLastSlides = slot.assignedNodes()
            .slice(lastAssignedNodesIndex - this.slidesToShow, lastAssignedNodesIndex)
            .map((item, index) => {
                const clonedNode = item.cloneNode(true);
                clonedNode.setAttribute(ARIA_HIDDEN_ATTR, true);
                clonedNode.setAttribute(DATA_INDEX_ATTR, index);
                return clonedNode;
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

        this.assignedNodes = clonedLastSlides.concat(slot.assignedNodes()).concat(clonedFirstSlides);
    }

    stopAutoPlay() {
        clearTimeout(this.autoPlayTimer);
        clearTimeout(this.loopBackTimer);
    }

    _changeNextSlide = async () => {
        if (!this.hasLoopBackTimerStarted) {
            await this.changeSlide(1);
        }

        this.setAutoPlay();
    }

    @api
    changeNextSlide() {
        return this._debouncedChangeSlide(1);
    }

    @api
    changePrevSlide() {
        return this._debouncedChangeSlide(-1);
    }

    @api
    hasNextSlide() {
        return (this.infinite || this.currSlideNumber !== this.navItems.length - 1);
    }

    @api
    hasPrevSlide() {
        return (this.infinite || this.currSlideNumber !== 0);
    }

    async changeSlide(dir) {
        return new Promise(async (resolve) => {
            if (this.isLoopingBack)
                this.isLoopingBack = false;

            let nextSlideNumber = this.currSlideNumber + dir;

            if (this.infinite && nextSlideNumber === this.navItems.length) {
                nextSlideNumber = 0;
            } else if (this.infinite && nextSlideNumber < 0) {
                nextSlideNumber = this.navItems.length - 1;
            }

            if (this.infinite || (nextSlideNumber < this.navItems.length && nextSlideNumber >= 0)) {
                const currentSlide = this.findCurrSlide();
                const prevSlide = this.findSlideByNumber(nextSlideNumber);

                this.deactivateSlide(currentSlide);
                this.activateSlide(prevSlide);

                this.currSlideNumber += dir;
            }

            if (this.infinite) {
                await this.loopBack();
            }

            this.setAriaAttributes();

            resolve();
        });
    }

    setAriaAttributes() {
        this.assignedNodes.forEach((node) => {
            const nodeIndex = node.dataset.nodeIndex

            if (nodeIndex >= this.getLeftRange(this.currSlideNumber)
                && nodeIndex <= (this.getRightRange(this.currSlideNumber) - 1)) {
                node.setAttribute(ARIA_HIDDEN_ATTR, false);
            } else {
                node.setAttribute(ARIA_HIDDEN_ATTR, true);
            }
        });
    }

    loopBack() {
        return new Promise((resolve) => {
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
                resolve();
            }, this.scrollSlideSpeed + 50);
        });
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

        this.setAriaAttributes();
        event.target.blur();
    }

    handleTouchStart({changedTouches}) {
        this.swipeXStart = (changedTouches && changedTouches[0].clientX) || 0;
    }

    async handleTouchEnd(event) {
        if (this.autoPlayTimer)
            this.stopAutoPlay();

        const {changedTouches} = event;
        const swipeXEnd = (changedTouches && changedTouches[0].clientX) || 0;
        const dx = swipeXEnd - this.swipeXStart;
        const direction =
            Math.sign(dx) === 1 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        if (Math.abs(dx) > SWIPE_DISTANCE_THRESHOLD) {
            if (direction === DIRECTION_RIGHT) {
                await this.changeSlide(1);
            } else {
                await this.changeSlide(-1);
            }
            event.preventDefault();
        }
        this.swipeXStart = 0;
    }

    findCurrSlide() {
        return this.navItems.find(item => item.index === this.currSlideNumber % this.navItems.length);
    }

    findSlideByNumber(slideNumber) {
        return this.navItems.find(item => item.index === slideNumber);
    }

    activateSlide(slide) {
        slide.styleClasses = [slide.styleClasses, SLDS_IS_ACTIVE].join(' ');
        slide.isSelected = true;
        slide.tabIndex = 0;
    }

    deactivateSlide(slide) {
        slide.styleClasses = slide.styleClasses.replace(SLDS_IS_ACTIVE, '');
        slide.isSelected = false;
        slide.tabIndex = -1;
    }

    normalizeBoolean(value) {
        return (typeof value === 'string' ? value === 'true' : value);
    }

    parseIntFromStr(value) {
        return (typeof value === 'string' ? parseInt(value) : value);
    }

    getSlot() {
        return this.template.querySelector('slot');
    }

    debounce = (callback, wait) => {
        let timeout = null;
        return (...args) => {
            clearTimeout(timeout);
            return new Promise((resolve) => {
                timeout = setTimeout(
                    () => resolve(callback(...args)),
                    wait,
                );
            });
        };
    }

    getLeftRange = (index) => {
        return this.initDataNodeIndex + (this.slidesToScroll * index);
    }

    getRightRange(index) {
        return (this.initDataNodeIndex + this.slidesToShow) + (this.slidesToScroll * index);
    }
}
