/**
 * Created by BMaleczek on 01.04.2020.
 */

import {LightningElement, api, wire, track} from 'lwc';

export default class Card extends LightningElement {
    @api title;
    @api iconName;
    @api isFooterVisible;
}