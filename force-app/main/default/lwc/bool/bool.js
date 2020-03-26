/**
 * Created by BMaleczek on 18.03.2020.
 */

import {LightningElement, api} from 'lwc';

export default class Bool extends LightningElement {
    @api show = false;

    constructor() {
        super();

        window.addEventListener('composedevt', () => {
            console.log("window COMPOSED EVENT HANDLER");
        });

        this.addEventListener('composedevt', () => {
            console.log(" thisCOMPOSED EVENT HANDLER");
        });
        this.template.addEventListener('composedevt', () => {
            console.log(" templateCOMPOSED EVENT HANDLER");
        });
    }
}