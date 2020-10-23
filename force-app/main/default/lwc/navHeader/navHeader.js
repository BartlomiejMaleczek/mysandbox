/**
 * Created by BMaleczek on 29.06.2020.
 */

import {LightningElement, track} from 'lwc';

import rbLogo from '@salesforce/contentAssetUrl/Rblogo3';
import male from '@salesforce/resourceUrl/male';
import headerSvg from '@salesforce/resourceUrl/headerSvg';

import MucinexLogo from '@salesforce/contentAssetUrl/MucinexLogo';
import digestive_advantage_logo from '@salesforce/contentAssetUrl/digestive_advantage_logo';
import move_free_logo from '@salesforce/contentAssetUrl/move_free_logo';
import cepacol from '@salesforce/contentAssetUrl/cepacol';
import KYLogo from '@salesforce/contentAssetUrl/KYLogo';

import getMenuItemsApex from '@salesforce/apex/NavHeaderController.getMenuItemsApex';


export default class NavHeader extends LightningElement {
    logo = rbLogo;

    @track navItems = [];

    svgProfile = `${headerSvg}#user`;
    svgCart = `${headerSvg}#shopping-bag`;
    svgBookmark = `${headerSvg}#Save_Resources_Icon`;
    svgHamburger = `${headerSvg}#hamburger-rectangle`;
    svgChevronRight = `${headerSvg}#Arrow`;

    _isSmallScreen;
    _isMediumScreen;
    _isLargeScreen;

    currentPageNavItemLinkTarget;
    switchUnderBarToCurrentNavItemLinkPageTimeout;

    constructor() {
        super();

        this._isLargeScreen = true;
        this._isMediumScreen = false;
        this._isSmallScreen = false;


        // const isSmallScreen = window.matchMedia("(min-width: 480px)");
        // const isMediumScreen = window.matchMedia("(min-width: 768px)");
        // const isLargeScreen = window.matchMedia("(min-width: 1300px)");
        //
        // isSmallScreen.addListener(this.isSmallScreen.bind(this));
        // isMediumScreen.addListener(this.isMediumScreen.bind(this));
        // isLargeScreen.addListener(this.isLargeScreen.bind(this));

        // this._isLargeScreen = isLargeScreen.matches;

        window.onresize = this.onWindowResize.bind(this);

        // console.log('IS LARGE SCREEN', isLargeScreen.matches);
        // console.log('IS MEDIUM SCREEN', isMediumScreen.matches);
        // console.log('IS SMALL SCREEN', isSmallScreen.matches);

        this.handleLoad();

        window.onscroll = this.handleOnScroll.bind(this);
    }

    handleOnScroll(event) {
        const header = this.template.querySelector('header');

        if (window.scrollY > 10) {
            if (!header.classList.contains('nav-header-on-scroll')) {
                header.classList.add('nav-header-on-scroll');
            }
        } else {
            header.classList.remove('nav-header-on-scroll');
        }
        console.log(window.scrollY);

    }

    handleLoad() {
        return new Promise((
            (resolve, reject) => {
                getMenuItemsApex(
                    {}
                ).then((result) => {
                    try {

                        const logos = [
                            MucinexLogo,
                            KYLogo,
                            cepacol,
                            move_free_logo,
                            digestive_advantage_logo
                        ];

                        result.forEach(function (item, index) {
                            if (index == 0) {
                                item.item['isCurrentPage'] = true;
                            } else {
                                item.item['isCurrentPage'] = false;
                            }

                            if (item.hasSubItems) {
                                item.subItems.forEach(function (subItem, index) {
                                    if (index == 0) {
                                        subItem.item['styleClasses'] = ['slds-m-left_xx-small', 'nav-dropdown-content-chevron-right-icon', 'nav-dropdown-content-chevron-right-icon-is-active'].join(' ');
                                    } else {
                                        subItem.item['styleClasses'] = ['slds-m-left_xx-small', 'nav-dropdown-content-chevron-right-icon'].join(' ');
                                    }

                                    if (item.item.Label == 'Our Brands') {
                                        subItem.item['imageSrc'] = logos[index];
                                    }
                                });
                            }
                        }.bind(this));
                    } catch (e) {
                        console.error(e);
                    }

                    this.navItems = result;

                    console.log(result);

                    resolve(result);
                }).catch((error) => {
                    console.log("error", error);
                    reject(error);
                });
            }
        ));
    }

    renderedCallback() {
        if (this.currentPageNavItemLinkTarget) {
            this.switchUnderBar(this.currentPageNavItemLinkTarget);
        }
    }

    handleSetCurrentPageNavItemLinkTarget(event) {
        this.currentPageNavItemLinkTarget = event.detail;
    }

    onWindowResize() {
        if (this.currentPageNavItemLinkTarget) {
            this.switchUnderBar(this.currentPageNavItemLinkTarget);
        }
    }

    isSmallScreen(event) {
        this._isSmallScreen = event.matches;
    }

    isMediumScreen(event) {
        this._isMediumScreen = event.matches;
    }

    isLargeScreen(event) {
        this._isLargeScreen = event.matches;
    }

    get isSmallOrMediumScreen() {
        return this._isMediumScreen || this._isSmallScreen;
    }

    handleSwitchActiveNavItemLink(event) {

        clearTimeout(this.switchUnderBarToCurrentNavItemLinkPageTimeout);

        this.switchUnderBar(event.detail);
    }

    switchUnderBar(newActiveNavItemLink) {
        const underBar = this.template.querySelector('.under-bar');
        underBar.style.setProperty('left', (newActiveNavItemLink.offsetLeft - 2) + 'px');
        underBar.style.setProperty('width', (newActiveNavItemLink.offsetWidth + 3) + 'px');
    }

    handleSwitchToCurrentNavItemLinkPage(event) {
        this.switchUnderBarToCurrentNavItemLinkPageTimeout = setTimeout(function () {
            this.switchUnderBar(this.currentPageNavItemLinkTarget);
        }.bind(this), 300);
    }

    get isDropdownContentNotEmpty() {
        return Object.keys(this.ourBrandsDropdownContent) && Object.keys(this.ourBrandsDropdownContent).length;
    }

    handleDropdownLinkMouseOver(event) {
        const target = event.currentTarget,
            dropdownContentIndex = target.getAttribute('data-dropdown-nav-item-index');
        this.ourBrandsDropdownContent = Object.assign({}, this.ourBrandsDropdownNavItems[dropdownContentIndex]);


        this.hideCurrentDropdownChevronRightIcon();
        this.showDropdownChevronRightIcon(dropdownContentIndex);
    }

    showDropdownChevronRightIcon(dropdownContentIndex) {
        this.ourBrandsDropdownNavItems[dropdownContentIndex].item.styleClasses = this.ourBrandsDropdownNavItems[dropdownContentIndex].item.styleClasses + ' nav-dropdown-chevron-right-icon-is-active';
    }

    hideCurrentDropdownChevronRightIcon() {
        const dropdownContentIndex = this.template.querySelector('.nav-dropdown-chevron-right-icon-is-active').parentElement.getAttribute('data-dropdown-nav-item-index');
        this.ourBrandsDropdownNavItems[dropdownContentIndex].item.styleClasses = this.ourBrandsDropdownNavItems[dropdownContentIndex].item.styleClasses.replace('nav-dropdown-chevron-right-icon-is-active', '');

    }

    handleDropdownContentImageLoaded(event) {
        // window.setTimeout(function () {
        //     const contentElem = this.template.querySelector('.nav-dropdown-content');
        //     contentElem.setAttribute('opacity', 1);
        // }.bind(this), 500);

    }


}
