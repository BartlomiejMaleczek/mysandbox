import {LightningElement, api, wire, track} from 'lwc';
import getFeatureContent from '@salesforce/apex/SectionFeatureContentController.getFeatureContentApex';

export default class SectionFeature extends LightningElement {
    featureContent;
    @api dynamicContent;

    @wire(getFeatureContent)
    wiredContent({ error, data }) {
        console.log(JSON.stringify(this.dynamicContent, undefined, 4));

        if (data) {
            this.featureContent = data;
            // console.log(JSON.stringify(this.featureContent, undefined, 4));
            this.error = undefined;
        } else if (error) {
            console.log('ERROR', error);
            this.error = error;
            this.featureContent = undefined;
        }
    }
}