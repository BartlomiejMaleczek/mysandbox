import {LightningElement, api, track, wire} from 'lwc';

export default class NavItemIcon extends LightningElement {

    @api iconSvg;
    @api title;
    @api numerator;


    get isNumeratorNotNull() {
        return this.numerator != null;
    }
}