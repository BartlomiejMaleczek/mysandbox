import {ServiceAbstract} from "c/serviceAbstract";
import {api, track, wire} from 'lwc';

export default class Carousel extends ServiceAbstract {
    @track navItems = [];
    @api currentSlideIndexElement = 0;
    @api areNavItemsVisible = false;
    _changeNextSlideAutomatically;


    renderedCallback() {

        if(this.areNavItemsVisible) {
            if (!this.navItems.length) {
                const slot = this.template.querySelector('slot'),
                    navItems = [];

                let styleClasses;

                if (slot.assignedNodes() && slot.assignedNodes().length) {
                    slot.assignedNodes().forEach((carouselItem, index) => {
                        styleClasses = [];
                        styleClasses.push('slds-carousel__indicator-action');

                        if (index == 0) {
                            styleClasses.push('slds-is-active');
                        }

                        navItems.push({
                            key: this.utils.guid.generate(),
                            tabindex: 0,
                            ariaControls: carouselItem.ariaLabelledBy,
                            index: index,
                            styleClasses: styleClasses.join(' ')
                        });
                    });

                    this.navItems = navItems;

                    try {
                        // this._changeNextSlideAutomatically = this.changeNextSlideAutomatically();
                    } catch (e) {
                        console.error(e);
                    }

                }
            }
        }
    }

    changeNextSlideAutomatically() {
        this._changeNextSlideAutomatically = setTimeout(function () {
            let navItem, nextNavItemIndex;

            for (let i = 0; i <= this.navItems.length; i++) {
                navItem = this.navItems[i];

                if (navItem.styleClasses.includes('slds-is-active')) {
                    navItem.styleClasses = navItem.styleClasses.replace('slds-is-active', '');
                    nextNavItemIndex = (i + 1 == this.navItems.length ? 0 : i + 1);

                    const nextNavItem = this.navItems[nextNavItemIndex];
                    nextNavItem.styleClasses = [nextNavItem.styleClasses, 'slds-is-active'].join(' ');

                    this.currentSlideIndexElement = nextNavItemIndex;
                    break;
                }
            }

            this.changeNextSlideAutomatically();
        }.bind(this), 6000);

    }

    get carouselTranslate() {
        const transformStyleForm = this.utils.jsUtils.format('transform:translateX(-{0}%)', [this.currentSlideIndexElement * 100]);
        return transformStyleForm;
    }

    handleSelectSlide(event) {
        if (this._changeNextSlideAutomatically) {
            clearTimeout(this._changeNextSlideAutomatically);
            this._changeNextSlideAutomatically = null;
        }

        this.navItems.forEach((navItem) => {
            if (event.target.getAttribute('aria-controls').includes(navItem.ariaControls)) {
                if (!event.target.classList.contains('slds-is-active')) {
                    navItem.styleClasses = [navItem.styleClasses, 'slds-is-active'].join(' ');
                    this.currentSlideIndexElement = navItem.index;
                    event.target.blur();
                }
            } else {
                navItem.styleClasses = navItem.styleClasses.replace('slds-is-active', '');
            }
        });

    }

}