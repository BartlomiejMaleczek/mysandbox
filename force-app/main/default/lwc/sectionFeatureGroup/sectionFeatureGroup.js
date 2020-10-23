import {LightningElement, api, wire, track} from 'lwc';
import getFeaturesGroupContentApex from '@salesforce/apex/SectionFeatureGroupContentController.getFeaturesGroupContentApex';

import BartSnap from '@salesforce/contentAssetUrl/BartSnap';

export default class SectionFeatureGroup extends LightningElement {
    featureGroupContent;
    error;
    @api dynamicContent;

    description1;
    description2;
    description3;

    image = BartSnap;

    // constructor() {
    //     super();
    //     this.dynamicContent = [
    //         {label: 'override1', value: 'override1'},
    //         {label: 'override2', value: 'override2'},
    //     ];
    // }
    //
    // connectedCallback() {
    //     this.dynamicContent = [
    //         {label: 'override1', value: 'override1'},
    //         {label: 'override2', value: 'override2'},
    //     ];
    // }

    // renderedCallback() {
    //     this.template.querySelector('.testDiv').innerHTML = '<marquee>Untrusted markup</marquee>';
    // }

    constructor() {
        super();
        // this.handleLoad();

    }
    //
    // handleLoad() {
    //     return new Promise((
    //         (resolve, reject) => {
    //             getFeaturesGroupContentApex(
    //                 {
    //                     contentType: 'Features1'
    //                 }
    //             ).then((result) => {
    //                 console.log("RESULTS", result);
    //                 resolve(result);
    //             }).catch((error) => {
    //                 console.log("error", error);
    //                 reject(error);
    //             });
    //         }
    //     ));
    // }

    @wire(getFeaturesGroupContentApex, {contentType: '$dynamicContent'})
    wiredGroupContent({ error, data }) {
        console.log('getFeaturesGroupContentApexxxxx');
        console.log(data);
        if (data) {
            this.featureGroupContent = data;

            this.description1 = this.featureGroupContent.data.contentNodes.Description1.value.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            this.description2 = this.featureGroupContent.data.contentNodes.Description2.value.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            this.description3 = this.featureGroupContent.data.contentNodes.Description3.value.replace(/&lt;/g, "<").replace(/&gt;/g, ">");

            console.log(JSON.stringify(this.featureGroupContent, undefined, 4));
            this.error = undefined;
        } else if (error) {
            console.log('ERROR', error);
            this.error = error;
            this.featureGroupContent = undefined;
        }
    }

    get convertToPlain() {
        if(this.featureGroupContent) {
            let rtf = this.featureGroupContent.contentNodes.Description1.value;

            // rtf = rtf.replaceAll("<[^>]*>", "");
            // rtf = rtf.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "")
            // return rtf.replace(/\\'[0-9a-zA-Z]{2}/g, "").trim();
            return rtf;
        }

    }

    get isNotNull() {
        return this.featureGroupContent && Object.keys(this.featureGroupContent);
    }
}