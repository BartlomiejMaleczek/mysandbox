import {LightningElement} from 'lwc';
import getAllBrandContentByTopicApex from '@salesforce/apex/BrandTabsController.getAllBrandContentByTopicApex';

export default class BrandTabs extends LightningElement {
    topicsWithBrands;
    topics;
    selectedTopicContent;
    selectedTopic

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

                    resolve(result);
                }).catch((error) => {
                    console.log("error", error);
                    reject(error);
                });
            }
        ));
    }

    handleChangeTab(event) {
        let target = event.currentTarget,
            tabName = target.getAttribute('data-tab-name');

        console.log(tabName);
        console.log(this.topicsWithBrands[tabName]);

        this.selectedTopicContent = this.topicsWithBrands[tabName];
    }
}