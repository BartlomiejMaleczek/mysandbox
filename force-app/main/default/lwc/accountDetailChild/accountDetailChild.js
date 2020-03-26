/**
 * Created by BMaleczek on 17.03.2020.
 */

import {LightningElement, api, track} from 'lwc';

export default class AccountDetailChild extends LightningElement {
    @api contacts;
    @api fullName;
    @api age;

    @api contact;

    handlerClick(){
        this.age--;
    }

    handleChange(event) {
        // let tempFullName = Object.assign({}, this.fullName);
        //
        // tempFullName.firstName = 'Test2';
        //
        // this.fullName = tempFullName;
        //
        // console.log(JSON.stringify(this.fullName));


        console.log(this.contact);

        let tempContact = Object.assign({}, this.contact);
        tempContact.Name = 'Test';
        this.contact = tempContact;
    }


    // @api
    // get contact() {
    //     return this.contact2;
    // }
    //
    // set contact(value) {
    //     console.log('CONTACT', value);
    //     this.contact2 = value;
    //
    //     let contactTemp = Object.assign({}, this.contact2);
    //     // this.contact2 = Object.assign({}, value);
    //     // console.log(this.contact2);
    //
    //     setTimeout(() => {
    //         console.log('ZMIENIAM');
    //         contactTemp.Name = 'test';
    //         this.contact2 = contactTemp;
    //
    //         this.contact2 = {
    //             Id: 1,
    //             Name: 'Test',
    //             Title: 'VP of Engineering'
    //         };
    //     }, 3000);
    //     if(this.contact) {
    //         // contact.Name = 'Test';
    //         this.contact = contact;
    //     }
    //
    // }
}