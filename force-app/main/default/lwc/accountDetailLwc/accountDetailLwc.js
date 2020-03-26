import {LightningElement, api, track} from 'lwc';

export default class AccountDetailLwc extends LightningElement {
    bike = {
        name: 'Electra X4',
        picture: 'https://s3-us-west-1.amazonaws.com/sfdc-demo/ebikes/electrax4.jpg'
    };

    @track age = 28;
    @api recordId;

    isDivVisible = false;
    @track fullName = {
        firstName: 'TestFirstName',
        lastName: 'TestLastName',
    };
    @track contacts = [
        {
            Id: 1,
            Name: 'Amy Taylor',
            Title: 'VP of Engineering',
        },
        {
            Id: 2,
            Name: 'Michael Jones',
            Title: 'VP of Sales',
        },
        {
            Id: 3,
            Name: 'Jennifer Wu',
            Title: 'CEO',
        },
    ];

    get getFirstElem() {
        return this.contacts[0].Name;
    }

    handleChange(event) {
        this.isDivVisible = true;
        console.log(this.fullName);
       this.contacts[0].Name = 'Amy Taylor Test';
       this.fullName.firstName = 'Test2';
    }

    get fullNameUpperCase() {
        let fullName = this.fullName.firstName + this.fullName.lastName;
        return fullName.trim().toUpperCase();
         // return `${this.fullName.firstName} ${this.fullName.lastName}`.trim().toUpperCase();
    }

    handleChangeFirstName() {
        this.fullName.firstName = 'pfff';
    }
    //
    get getFullName() {
        const handler1 = {
            set: function(obj, prop, value) {
                console.log(obj);
                console.log(prop);
                console.log(value);
                obj[prop] = value;
                guid();
                return true;
            },

            get: function (target, prop, receiver) {
                return target[prop];
            }
        };

        return new Proxy(Object.assign({}, this.fullName), handler1);
    }

    get classNames() {
        if(this.isDivVisible) {
            return 'red-div';
        } else {
            return 'blue-div';
        }
    }

    @api get computedValue() {
        return false;
    }


    constructor() {
        super();

        this.template.addEventListener('previous', evt => {
            console.log('accout Handler previous');
            if (this.page > 1) {
                this.page = this.page - 1;
            }
        });
        this.template.addEventListener('next', evt => {
            console.log('accout Handler next');
            this.page = this.page + 1;
        });
    }

    previousHandler(evt) {
        console.log('Handler previous account detail');
        if (this.page > 1) {
            this.page = this.page - 1;
        }
    }

    nextHandler(evt) {
        console.log('Handler next account detail');
        this.page = this.page + 1;
    }


}