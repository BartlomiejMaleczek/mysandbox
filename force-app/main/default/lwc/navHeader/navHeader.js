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
    @track ourBrandsDropdownNavItems = [];
    @track resourceCenterDropdownNavItems = [];

    svgProfile = `${headerSvg}#user`;
    svgCart = `${headerSvg}#shopping-bag`;
    svgBookmark = `${headerSvg}#Save_Resources_Icon`;
    svgHamburger = `${headerSvg}#hamburger`;
    svgChevronRight = `${headerSvg}#Arrow`;

    _isSmallScreen;
    _isMediumScreen;
    _isLargeScreen;

    linkMouseOverTimeout = null;
    dropdownMouseOverTimeout = null;
    dropdownIconsMouseOverTimeout = null;

    expandableContent = [];
    currentExpandableNavItemName;
    isRendered = false;

    ourBrandsDropdownContent = {};
    activeNavItem;
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

                            if(item.item.Label == 'Our Brands') {
                                this.ourBrandsDropdownNavItems = JSON.parse(JSON.stringify(item.subItems));
                            } else if(item.item.Label == 'Resource Center') {
                                this.resourceCenterDropdownNavItems = JSON.parse(JSON.stringify(item.subItems));
                            }
                        }.bind(this));
                    } catch (e) {
                        console.error(e);
                    }

                    this.ourBrandsDropdownContent = Object.assign({}, this.ourBrandsDropdownNavItems[0]);
                    this.navItems = result;

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

        if(this.activeNavItem != target.getAttribute('data-nav-item-name')) {
            this.switchActiveNavItem(target.firstElementChild);
        }

        console.log(target);
        
        console.log('mouseover', this.activeNavItem);

        // if (hasSubItems === 'true') {
        //     clearTimeout(this.dropdownMouseOverTimeout);
        //
        //     const rowIndex = target.getAttribute('aria-rowindex');
        //     this.dropdownNavItems = JSON.parse(JSON.stringify(this.navItems[rowIndex].subItems));
        //
        //     this.ourBrandsDropdownContent = Object.assign({}, this.ourBrandsDropdownNavItems[0]);
        //
        //     this.openDropdown();
        // }
    }

    handleLinkMouseLeave(event) {
        // const hasSubItems = event.currentTarget.getAttribute('data-has-sub-items');

        this.linkMouseOverTimeout = setTimeout(function () {
            this.switchToCurrentPage();
        }.bind(this), 300);

        // if (hasSubItems === 'true') {
        //     this.dropdownMouseOverTimeout = setTimeout(function () {
        //         this.closeDropdown();
        //     }.bind(this), 200);
        // }
    }

    switchActiveNavItem(newActiveItem) {
        const underBar = this.template.querySelector('.under-bar'),
            dataNavItemName = newActiveItem.getAttribute('data-nav-item-name');

        this.activeNavItem = dataNavItemName;

        underBar.style.setProperty('left', (newActiveItem.offsetLeft - 2) + 'px');
        underBar.style.setProperty('width', (newActiveItem.offsetWidth + 3) + 'px');
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

    get isOurBrandsActive() {
        return this.activeNavItem == 'Our Brands';
    }

    get isResourceCenterActive() {
        return this.activeNavItem == 'Resource Center';
    }

    handleDropdownMouseOver() {
        // clearTimeout(this.dropdownMouseOverTimeout);
        // clearTimeout(this.linkMouseOverTimeout);
    }

    handleDropdownMouseLeave() {
        // this.closeDropdown();
        //
        // this.linkMouseOverTimeout = setTimeout(function () {
        //     this.switchToCurrentPage();
        // }.bind(this), 300);
    }

    openDropdown() {
        // const navDropdown = this.template.querySelector('.nav-dropdown');
        // navDropdown.style.setProperty('max-height', '1000px');
        // navDropdown.style.setProperty('opacity', '1');
    }

    closeDropdown() {
        // const navDropdown = this.template.querySelector('.nav-dropdown');
        // navDropdown.style.setProperty('max-height', '0px');
        // navDropdown.style.setProperty('opacity', '0');
    }

    get isBrandNavItem() {
        return this.currentExpandableNavItemName == 'Our Brands';
    }

    get isResourceCenterNavItem() {
        return this.currentExpandableNavItemName == 'Resource Center';
    }

    get isDropdownContentNotEmpty() {
        return Object.keys(this.ourBrandsDropdownContent) && Object.keys(this.ourBrandsDropdownContent).length;
    }

    handleDropdownLinkMouseOver(event) {
        // window.setTimeout(function () {
        //     const contentElem = this.template.querySelector('.nav-dropdown-content');
        //     contentElem.setAttribute('opacity', 0);
        // }.bind(this), 500);
        //
        const target = event.currentTarget,
            dropdownContentIndex = target.getAttribute('data-dropdown-nav-item-index');
        //
        this.ourBrandsDropdownContent = Object.assign({}, this.ourBrandsDropdownNavItems[dropdownContentIndex]);

        console.log('IMAGE SRC', this.ourBrandsDropdownContent.item.imageSrc);
        console.log('LABEL', this.ourBrandsDropdownContent.item.Label);
        //
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

    // openNavIconDropdown() {
    //     const navIconDropdown = this.template.querySelector('.nav-items-icons-group-dropdown');
    //     navIconDropdown.style.setProperty('opacity', '1');
    // }
    //
    // closeNavIconDropdown() {
    //     const navIconDropdown = this.template.querySelector('.nav-items-icons-group-dropdown');
    //     navIconDropdown.style.setProperty('opacity', '0');
    // }

    // get isProfileIconActive() {
    //     return this.activeNavIconId == 'profile';
    // }
    //
    // get isOrderIconActive() {
    //     return this.activeNavIconId == 'orders';
    // }
    //
    // get isResourcesIconActive() {
    //     return this.activeNavIconId == 'resources';
    // }


}
