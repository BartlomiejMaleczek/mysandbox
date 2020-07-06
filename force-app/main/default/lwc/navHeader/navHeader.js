/**
 * Created by BMaleczek on 29.06.2020.
 */

import {LightningElement, track} from 'lwc';
import rbLogo from '@salesforce/contentAssetUrl/Rblogo';
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
    @track dropdownNavItems = [];

    svgProfile = `${headerSvg}#male`;
    svgCart = `${headerSvg}#cart`;
    svgBookmark = `${headerSvg}#bookmark`;
    svgHamburger = `${headerSvg}#hamburger`;
    svgChevronRight = `${headerSvg}#line-angle-right`;

    _isSmallScreen;
    _isMediumScreen;
    _isLargeScreen;

    linkMouseOverTimeout = null;
    dropdownMouseOverTimeout = null;
    dropdownIconsMouseOverTimeout = null;

    expandableContent = [];
    currentExpandableNavItemName;
    isRendered = false;

    dropdownContent = {};
    activeNavIconId;

    constructor() {
        super();

        const isSmallScreen = window.matchMedia("(max-width: 480px)");
        const isMediumScreen = window.matchMedia("(max-width: 768px)");
        const isLargeScreen = window.matchMedia("(min-width: 1300px)");

        isSmallScreen.addListener(this.isSmallScreen.bind(this));
        isMediumScreen.addListener(this.isMediumScreen.bind(this));
        isLargeScreen.addListener(this.isLargeScreen.bind(this));

        this._isLargeScreen = isLargeScreen.matches;

        window.onresize = this.onWindowResize.bind(this);

        console.log('IS LARGE SCREEN', isLargeScreen.matches);
        console.log('IS MEDIUM SCREEN', isMediumScreen.matches);
        console.log('IS SMALL SCREEN', isSmallScreen.matches);

        this.handleLoad();
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
                                item.item['styleClasses'] = ['is-current-page', 'is-active'].join(' ');
                            } else {
                                item.item['styleClasses'] = '';
                            }

                            if (item.hasSubItems) {
                                item.subItems.forEach(function (subItem, index) {
                                    if (index == 0) {
                                        subItem.item['styleClasses'] = ['slds-m-left_xx-small', 'nav-dropdown-chevron-right-icon', 'nav-dropdown-chevron-right-icon-is-active'].join(' ');
                                    } else {
                                        subItem.item['styleClasses'] = ['slds-m-left_xx-small', 'nav-dropdown-chevron-right-icon'].join(' ');
                                    }

                                    if (item.item.Label == 'Our Brands') {
                                        subItem.item['imageSrc'] = logos[index];
                                    }
                                });

                            }
                        });
                    } catch (e) {
                        console.error(e);
                    }


                    console.log('RESULTX', result);

                    this.navItems = result;

                    console.log('RESULTX', this.navItems);
                    resolve(result);
                }).catch((error) => {
                    console.log("error", error);
                    reject(error);
                });
            }
        ));
    }

    renderedCallback() {
        try {

            if (!this.isRendered) {
                this.isRendered = this.switchToCurrentPage();
            }
        } catch (e) {
            console.error(e);
        }
    }

    onWindowResize() {
        this.switchToCurrentPage();
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

    handleLinkMouseOver(event) {
        clearTimeout(this.linkMouseOverTimeout);

        const target = event.currentTarget,
            hasSubItems = target.getAttribute('data-has-sub-items');

        this.switchActiveNavItem(target);

        if (hasSubItems === 'true') {
            clearTimeout(this.dropdownMouseOverTimeout);

            const rowIndex = target.getAttribute('aria-rowindex');
            this.dropdownNavItems = JSON.parse(JSON.stringify(this.navItems[rowIndex].subItems));

            this.dropdownContent = Object.assign({}, this.dropdownNavItems[0]);

            this.openDropdown();
        }
    }

    handleLinkMouseLeave(event) {
        const hasSubItems = event.currentTarget.getAttribute('data-has-sub-items');

        this.linkMouseOverTimeout = setTimeout(function () {
            this.switchToCurrentPage();
        }.bind(this), 600);

        if (hasSubItems === 'true') {
            this.dropdownMouseOverTimeout = setTimeout(function () {
                this.closeDropdown();
            }.bind(this), 200);
        }
    }

    switchActiveNavItem(newActiveItem) {
        const underBar = this.template.querySelector('.under-bar'),
            oldActiveItem = this.template.querySelector('.is-active');

        underBar.style.setProperty('left', (newActiveItem.offsetLeft - 2) + 'px');
        underBar.style.setProperty('width', (newActiveItem.offsetWidth + 3) + 'px');

        oldActiveItem.classList.remove('is-active');
        newActiveItem.classList.add('is-active');
    }

    switchToCurrentPage() {
        const currentPageNavItem = this.template.querySelector('.is-current-page');

        if (currentPageNavItem) {
            this.switchActiveNavItem(currentPageNavItem);
            return true;
        } else {
            return false;
        }
    }

    handleDropdownMouseOver() {
        clearTimeout(this.dropdownMouseOverTimeout);
        clearTimeout(this.linkMouseOverTimeout);
    }

    handleDropdownMouseLeave() {
        this.closeDropdown();

        this.linkMouseOverTimeout = setTimeout(function () {
            this.switchToCurrentPage();
        }.bind(this), 300);
    }

    openDropdown() {
        const navDropdown = this.template.querySelector('.nav-dropdown');
        navDropdown.style.setProperty('max-height', '1000px');
        navDropdown.style.setProperty('opacity', '1');
    }

    closeDropdown() {
        const navDropdown = this.template.querySelector('.nav-dropdown');
        navDropdown.style.setProperty('max-height', '0px');
        navDropdown.style.setProperty('opacity', '0');
    }

    get isBrandNavItem() {
        return this.currentExpandableNavItemName == 'Our Brands';
    }

    get isResourceCenterNavItem() {
        return this.currentExpandableNavItemName == 'Resource Center';
    }

    get isDropdownContentNotEmpty() {
        return Object.keys(this.dropdownContent) && Object.keys(this.dropdownContent).length;
    }

    handleDropdownLinkMouseOver(event) {
        window.setTimeout(function () {
            const contentElem = this.template.querySelector('.nav-dropdown-content');
            contentElem.setAttribute('opacity', 0);
        }.bind(this), 500);

        const target = event.currentTarget,
            dropdownContentIndex = target.getAttribute('data-dropdown-nav-item-index');

        this.dropdownContent = Object.assign({}, this.dropdownNavItems[dropdownContentIndex]);

        this.hideCurrentDropdownChevronRightIcon();
        this.showDropdownChevronRightIcon(dropdownContentIndex);
    }

    showDropdownChevronRightIcon(dropdownContentIndex) {
        this.dropdownNavItems[dropdownContentIndex].item.styleClasses = this.dropdownNavItems[dropdownContentIndex].item.styleClasses + ' nav-dropdown-chevron-right-icon-is-active';
    }

    hideCurrentDropdownChevronRightIcon() {
            const dropdownContentIndex = this.template.querySelector('.nav-dropdown-chevron-right-icon-is-active').parentElement.getAttribute('data-dropdown-nav-item-index');
            this.dropdownNavItems[dropdownContentIndex].item.styleClasses = this.dropdownNavItems[dropdownContentIndex].item.styleClasses.replace('nav-dropdown-chevron-right-icon-is-active', '');

    }

    handleDropdownContentImageLoaded(event) {
        window.setTimeout(function () {
            const contentElem = this.template.querySelector('.nav-dropdown-content');
            contentElem.setAttribute('opacity', 1);
        }.bind(this), 500);

    }

    openNavIconDropdown() {
        const navIconDropdown = this.template.querySelector('.nav-items-icons-group-dropdown');
        navIconDropdown.style.setProperty('opacity', '1');
    }

    closeNavIconDropdown() {
        const navIconDropdown = this.template.querySelector('.nav-items-icons-group-dropdown');
        navIconDropdown.style.setProperty('opacity', '0');
    }

    get isProfileIconActive() {
        return this.activeNavIconId == 'profile';
    }

    get isOrderIconActive() {
        return this.activeNavIconId == 'orders';
    }

    get isResourcesIconActive() {
        return this.activeNavIconId == 'resources';
    }


}
