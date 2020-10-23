import {LightningElement} from 'lwc';
import getBrandContentApex from '@salesforce/apex/SectionBrandsController.getBrandContentApex';


export default class SectionBrands extends LightningElement {
    brands;
    carouselItems;
    isSelected = false;
    currentSlideIndexElement = 0;

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
                    console.log("RESULTS", result);
                    const carouselItems = [];
                    this.brands.forEach(function(brand) {
                        carouselItems.push(
                            {
                                RecommendedProductImage: brand.data.contentNodes.RecommendedProductImage.url,
                                RecommendedProductTitle: brand.data.contentNodes.RecommendedProductTitle.value
                            }
                        );
                    });

                    this.carouselItems = carouselItems;
                    // this.selectedBrand = [result[1]];

                    resolve(result);
                }).catch((error) => {
                    console.log("error", error);
                    reject(error);
                });
            }
        ));
    }

    handleShowBrand(event) {
        let target = event.currentTarget;
        this.currentSlideIndexElement = event.currentTarget.getAttribute('aria-rowindex');

        if(target.classList.contains('active')) {
            target.classList.remove('active');
            this.template.querySelector('.product-image').classList.remove('product-image-visible');
            this.isSelected = false;
        } else {
            target.classList.add('active');
            this.template.querySelector('.product-image').classList.add('product-image-visible');
            this.isSelected = true;
        }
        console.log(event);
    }
}