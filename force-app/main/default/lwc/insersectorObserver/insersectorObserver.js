import { LightningElement } from "lwc";
import { loadScript, loadStyle } from "lightning/platformResourceLoader";
import intersectionObserver from "@salesforce/resourceUrl/intersectionObserver";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class InsersectorObserver extends LightningElement {
  connectedCallback() {
    try {
      console.log("renderedCallback", intersectionObserver);
      Promise.all([
        loadScript(this, intersectionObserver + "/intersection-observer.js")
      ])
        .then(() => {
          console.log("UDALO SIE");
        })
        .catch(error => {
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Error loading D3",
              message: error.message,
              variant: "error"
            })
          );
        });
    } catch (e) {
      console.error(e);
    }
    //         window.addEventListener('scroll', function(e) {
    //             try {
    //                 console.log('FIRE');
    //                 const sectionOne = this.template.querySelector(".section-one");
    //
    //                 if(sectionOne) {
    //                     var position = sectionOne.getBoundingClientRect();
    // //                 console.group();
    // //                 console.log(window.scrollY);
    // //                 console.log('bottom', sectionOne.getBoundingClientRect().bottom);
    //
    // //                 console.log('top', sectionOne.getBoundingClientRect().top);
    // //                 console.log('innerHeight', window.innerHeight);
    // //                 // console.log('sectionOne.innerHeight', position);
    // //                 console.groupEnd();
    //                     if(position.top + 200 < window.innerHeight && position.bottom >= 200) {
    //                         console.log('SECTION ONE ZACZYNA BYC WIDOCZNY');
    //                         if(!sectionOne.classList.contains('visible-class')) {
    //                             sectionOne.classList.add('visible-class');
    //                         }
    //
    //                     } else {
    //                         sectionOne.classList.remove('visible-class');
    //                         console.log('SECTION ONE nie jest widoczny');
    //                     }
    //                 }
    //
    //
    //                 const sectiontwo = this.template.querySelector(".section-two");
    //
    //                 if(sectiontwo) {
    //                     var position2 = sectiontwo.getBoundingClientRect();
    // //                 console.group();
    // //                 console.log(window.scrollY);
    // //                 console.log('bottom', sectiontwo.getBoundingClientRect().bottom);
    //
    // //                 console.log('top', sectiontwo.getBoundingClientRect().top);
    // //                 console.log('innerHeight', window.innerHeight);
    // //                 // console.log('sectionOne.innerHeight', position);
    // //                 console.groupEnd();
    //                     if(position2.top + 200 < window.innerHeight && position2.bottom >= 200) {
    //                         console.log('SECTION TWO ZACZYNA BYC WIDOCZNY');
    //                         if(!sectiontwo.classList.contains('visible-class')) {
    //                             sectiontwo.classList.add('visible-class');
    //                         }
    //
    //                     } else {
    //                         sectiontwo.classList.remove('visible-class');
    //                         console.log('SECTION TWO nie jest widoczny');
    //                     }
    //                 }
    //
    //             } catch (e) {
    //                 console.error(e);
    //             }
    //
    //         }.bind(this));
  }

  handleOnScroll() {
    try {
      console.log("FIRE");
      const sectionOne = this.template.querySelector(".section-one");

      const options = {};
      const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
          console.log(entry);
        });
      }, options);

      observer.observe(sectionOne);

      if (sectionOne) {
        var position = sectionOne.getBoundingClientRect();
        //                 console.group();
        //                 console.log(window.scrollY);
        //                 console.log('bottom', sectionOne.getBoundingClientRect().bottom);

        //                 console.log('top', sectionOne.getBoundingClientRect().top);
        //                 console.log('innerHeight', window.innerHeight);
        //                 // console.log('sectionOne.innerHeight', position);
        //                 console.groupEnd();
        if (position.top + 200 < window.innerHeight && position.bottom >= 200) {
          console.log("SECTION ONE ZACZYNA BYC WIDOCZNY");
          if (!sectionOne.classList.contains("visible-class")) {
            sectionOne.classList.add("visible-class");
          }
        } else {
          sectionOne.classList.remove("visible-class");
          console.log("SECTION ONE nie jest widoczny");
        }
      }

      const sectiontwo = this.template.querySelector(".section-two");

      if (sectiontwo) {
        var position2 = sectiontwo.getBoundingClientRect();
        //                 console.group();
        //                 console.log(window.scrollY);
        //                 console.log('bottom', sectiontwo.getBoundingClientRect().bottom);

        //                 console.log('top', sectiontwo.getBoundingClientRect().top);
        //                 console.log('innerHeight', window.innerHeight);
        //                 // console.log('sectionOne.innerHeight', position);
        //                 console.groupEnd();
        if (
          position2.top + 200 < window.innerHeight &&
          position2.bottom >= 200
        ) {
          console.log("SECTION TWO ZACZYNA BYC WIDOCZNY");
          if (!sectiontwo.classList.contains("visible-class")) {
            sectiontwo.classList.add("visible-class");
          }
        } else {
          sectiontwo.classList.remove("visible-class");
          console.log("SECTION TWO nie jest widoczny");
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  renderedCallback() {}
}
