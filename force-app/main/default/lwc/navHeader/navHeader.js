/**
 * Created by BMaleczek on 29.06.2020.
 */

import {LightningElement} from 'lwc';
import rbLogo from '@salesforce/contentAssetUrl/Rblogo';
import male from '@salesforce/resourceUrl/male';
import headerSvg from '@salesforce/resourceUrl/headerSvg';


export default class NavHeader extends LightningElement {
    logo = rbLogo;
    navItems;

    svgProfile = `${headerSvg}#male`;
    svgCart = `${headerSvg}#cart`;
    svgBookmark = `${headerSvg}#bookmark`;
    svgHamburger = `${headerSvg}#hamburger`;

    _isSmallScreen;
    _isMediumScreen;
    _isLargeScreen;

    currentNavItem;
    isMouseOverStarted;
    timeout = null;
    expandableContent;


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

        this.navItems = [
            {
                value: 'Home',
                key: 'key1',
                styleClasses: 'is-current-page is-active'
            },
            {
                value: 'Our Brands',
                key: 'key2',
                styleClasses: 'is-expandable',
                expandableContent: [
                    'Our Brands Content1',
                    'Our Brands Content2',
                    'Our Brands Content3',
                    'Our Brands Content4',
                    'Our Brands Content5',
                    'Our Brands Content6'
                ]
            },
            {
                value: 'Resource Center',
                key: 'key3',
                styleClasses: 'is-expandable',
                expandableContent: [
                    'Resource Center Content1',
                    'Resource Center Content2',
                    'Resource Center Content3',
                    'Resource Center Content4',
                    'Resource Center Content5',
                    'Resource Center Content6'
                ]
            },
            {
                value: 'About Us',
                key: 'key4',
                styleClasses: ''
            }

        ];
    }

    renderedCallback() {
        console.log('RENDERED CALLBACK');
        this.switchToCurrentPage();
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
        clearTimeout(this.timeout);

        const target = event.currentTarget;
        this.switchActiveNavItem(target);

        if (target.classList.contains('is-expandable')) {
            this.openDropdown();
        }
    }

    handleLinkMouseLeave(event) {
        this.timeout = setTimeout(function () {
            this.switchToCurrentPage();
        }.bind(this), 400);

        this.closeDropdown();
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
        }
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


    // get navItemsIconsClasses() {
    //        slds-col slds-border_left slds-m-around_medium
    //     const styleClasses = [
    //       'slds-grid',
    //       'slds-gutters',
    //       'slds-grid_vertical-align-center'
    //     ];
    // }
}