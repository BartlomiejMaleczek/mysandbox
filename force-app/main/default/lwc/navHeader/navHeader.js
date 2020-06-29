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

    constructor() {
        super();

        const isSmallScreen = window.matchMedia("(max-width: 480px)");
        const isMediumScreen = window.matchMedia("(max-width: 768px)");
        const isLargeScreen = window.matchMedia("(min-width: 1300px)");

        isSmallScreen.addListener(this.isSmallScreen.bind(this));
        isMediumScreen.addListener(this.isMediumScreen.bind(this));
        isLargeScreen.addListener(this.isLargeScreen.bind(this));

       this._isLargeScreen = isLargeScreen.matches;

       console.log('IS LARGE SCREEN', isLargeScreen.matches);
        console.log('IS MEDIUM SCREEN', isMediumScreen.matches);
        console.log('IS SMALL SCREEN', isSmallScreen.matches);

        this.navItems = [
            {
                value: 'Home',
                key: 'key1'
            },
            {
                value: 'Our Brands',
                key: 'key2'
            },
            {
                value: 'Resource Center',
                key: 'key3'
            },
            {
                value: 'About Us',
                key: 'key4'
            }

        ];
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

    // get navItemsIconsClasses() {
    //        slds-col slds-border_left slds-m-around_medium
    //     const styleClasses = [
    //       'slds-grid',
    //       'slds-gutters',
    //       'slds-grid_vertical-align-center'
    //     ];
    // }
}