/**
 * Created by BMaleczek on 28.03.2020.
 */

import {ServiceAbstract} from "c/serviceAbstract";
import {api, track, wire} from 'lwc';

export default class Datatable extends ServiceAbstract {
    @api objectApiName;

    handleNavigateToHome() {
        this.navigateToAccountHome();
    }

    connectedCallback() {
        console.log('OJECTAPINAME', this.objectApiName);
        this.utils.promises.callPromises(
            this,
            [
                [this.promise1.bind(this)],
                [this.promise2.bind(this)]
            ],
            'promiseFinalMethod'
        );
    }

    promise1() {
        console.log('OJECTAPINAME', this.objectApiName);
        return new Promise((resolve, reject) => {
            console.log('before settimeout', this.objectApiName);
            setTimeout(function () {
                console.log('PRomise1');
                resolve('success');
                },
                10000);
        });
    }

    promise2() {
        return new Promise((resolve, reject) => {
            console.log('PRomise2');
            resolve('success');
        });
    }

    promiseFinalMethod() {
        return new Promise((resolve, reject) => {
            console.log('promiseFinalMethod');
            resolve('success');
        });
    }
}