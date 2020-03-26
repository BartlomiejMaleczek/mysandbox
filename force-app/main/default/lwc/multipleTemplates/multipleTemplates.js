/**
 * Created by BMaleczek on 17.03.2020.
 */

import {LightningElement} from 'lwc';
import templateOne from './templateOne.html';
import templateTwo from './templateTwo.html';

export default class MultipleTemplates extends LightningElement {
    templateOne = true;

    // render() {
    //     return this.templateOne ? templateOne : templateTwo;
    // }

    switchTemplate(){
        this.templateOne = this.templateOne === true ? false : true;
    }
}