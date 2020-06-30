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

    linkMouseOverTimeout = null;
    dropdownMouseOverTimeout = null;

    expandableContent = [];
    isRendered = false;

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
                    {
                        key: 'keyContent1',
                        value: 'Our Brands Content1'
                    },
                    {
                        key: 'keyContent2',
                        value: 'Our Brands Content2'
                    },
                    {
                        key: 'keyContent3',
                        value: 'Our Brands Content3'
                    },
                    {
                        key: 'keyContent4',
                        value: 'Our Brands Content4'
                    },
                    {
                        key: 'keyContent5',
                        value: 'Our Brands Content5'
                    },
                    {
                        key: 'keyContent6',
                        value: 'Our Brands Content6'
                    }


                ]
            },
            {
                value: 'Resource Center',
                key: 'key3',
                styleClasses: 'is-expandable',
                expandableContent: [
                    {
                        key: 'keyContent7',
                        value: 'Resource Center Content1'
                    },
                    {
                        key: 'keyContent8',
                        value: 'Resource Center Content2'
                    },
                    {
                        key: 'keyContent9',
                        value: 'Resource Center Content3'
                    },
                    {
                        key: 'keyContent10',
                        value: 'Resource Center Content4'
                    },
                    {
                        key: 'keyContent11',
                        value: 'Resource Center Content5'
                    },
                    {
                        key: 'keyContent12',
                        value: 'Resource Center Content6'
                    }
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
        if(!this.isRendered) {
            this.switchToCurrentPage();
            this.isRendered = true;
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

        const target = event.currentTarget;
        this.switchActiveNavItem(target);

        if (target.classList.contains('is-expandable')) {
            clearTimeout(this.dropdownMouseOverTimeout);

            this.expandableContent = [...this.navItems[target.getAttribute('aria-rowindex')].expandableContent];
            this.openDropdown();
        }
    }

    handleLinkMouseLeave(event) {
        this.linkMouseOverTimeout = setTimeout(function () {
            this.switchToCurrentPage();
        }.bind(this), 600);

        if (event.currentTarget.classList.contains('is-expandable')) {
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
}