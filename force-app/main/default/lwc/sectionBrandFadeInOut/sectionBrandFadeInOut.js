/**
 * Created by BMaleczek on 26.06.2020.
 */

import {LightningElement} from 'lwc';
import getBrandContentApex from '@salesforce/apex/SectionBrandsController.getBrandContentApex';

export default class SectionBrandFadeInOut extends LightningElement {
    brands;
    selectedBrand;
    isSelected = false;

    constructor() {
        super();
        this.handleLoad();
    }

    handleLoad() {
        return new Promise((
            (resolve, reject) => {
                getBrandContentApex(
                    {}
                ).then((result) => {
                    this.brands = result;
                    console.log('RESULTSXX', result);

                    this.selectedBrand = {
                        RecommendedProductImage: this.brands[0].data.contentNodes.RecommendedProductImage.url,
                        RecommendedProductTitle: this.brands[0].data.contentNodes.RecommendedProductTitle.value
                    }

                    console.log('SELECTED BRAND', this.selectedBrand);
                    // this.selectedBrand = [result[1]];
                    console.log("RESULTS", result);
                    resolve(result);
                }).catch((error) => {
                    console.log("error", error);
                    reject(error);
                });
            }
        ));
    }

    handleShowBrand(event) {
        try {
            console.log('handleShowBrand');
            let target = event.currentTarget,
                productImage = this.template.querySelector('.product-image'),
                productIndex = event.currentTarget.getAttribute('aria-rowindex'),
                imageBrand = this.template.querySelector('.image-brand');

            if (!target.classList.contains('active')) {
                productImage.classList.remove('product-image-visible');

                window.setTimeout(function () {

                    this.selectedBrand = {
                        RecommendedProductImage: this.brands[productIndex].data.contentNodes.RecommendedProductImage.url,
                        RecommendedProductTitle: this.brands[productIndex].data.contentNodes.RecommendedProductTitle.value
                    };

                }.bind(this), 150);

            }
        } catch (e) {
            console.error(e);
        }

    }

    onLoad() {
        console.log('ONLOAD');
        let productImage = this.template.querySelector('.product-image');
        productImage.classList.add('product-image-visible');
    }

    async loadImage(url, elem) {
        return new Promise((resolve, reject) => {
            elem.onload = () => resolve(elem);
            elem.onerror = reject;
            elem.src = src;
        });
    }
}