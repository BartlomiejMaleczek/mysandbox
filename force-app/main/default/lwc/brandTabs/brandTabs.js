import {LightningElement} from 'lwc';
import getAllBrandContentByTopicApex from '@salesforce/apex/BrandTabsController.getAllBrandContentByTopicApex';

export default class BrandTabs extends LightningElement {
    topicsWithBrands;
    topics;
    selectedTopicContent;

    constructor() {
        super();
        this.handleLoad();
    }

    handleLoad() {
        return new Promise((
            (resolve, reject) => {
                getAllBrandContentByTopicApex(
                    {}
                ).then((result) => {
                    this.topicsWithBrands = result;
                    this.topics = Object.keys(this.topicsWithBrands);
                    console.log('HANDLE LOAD GET ALL');
                    console.log(result);
                    resolve(result);
                }).catch((error) => {
                    console.log("error", error);
                    reject(error);
                });
            }
        ));
    }
}