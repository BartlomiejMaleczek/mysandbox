/**
 * Created by BMaleczek on 07.07.2020.
 */

import {LightningElement} from 'lwc';
import HERO_IMAGE from '@salesforce/contentAssetUrl/hero_image';

export default class Hero extends LightningElement {

    imageSrc = HERO_IMAGE;

    get heroImageStyle() {
        console.log(HERO_IMAGE);
        return 'background-image: url(' + HERO_IMAGE + ')';
    }
}