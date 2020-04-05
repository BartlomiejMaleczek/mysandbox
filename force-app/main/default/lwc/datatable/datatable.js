/**
 * Created by BMaleczek on 28.03.2020.
 */
import {LightningElement, wire, api, track} from "lwc";

export default class Datatable extends LightningElement {
    _emptyColumns;

    constructor() {
        super();
        this._emptyColumns = [];

        console.log('constructor')
        console.log(this.template);

        const templateElment = this.template.content;
        console.log('constructor');
        console.log(console.log(this.template.querySelector("div")));
        console.log(this.template);
        const slot = document.createElement('slot');
        document.body.appendChild(slot);
        // this.template.appendChild(slot);

        // this.template = templateElment;
        console.log(this);
        // this.appendChild(slot);
        // this.template.appendChild(document.createElement("p", { is: "datatable" }));


        // this.template.innerHTML = '<input type="text"></input><button>add div</button>';
        // this.template.querySelector('#host').appendChild(slot);
        // console.log(this.template.querySelector('#host'));

        // const slot = document.createElement('slot');
        // this.template.appendChild(slot);

    }

    connectedCallback() {
        console.log('connected callback')
        const slot = document.createElement('slot');
        document.body.appendChild(slot);
        const paragraphElement = document.createElement('p');
        // console.log(paragraphElement);
        // paragraphElement.innerHTML = 'Test';
        // this.template.appendChild(paragraphElement);
    }
    //
    // renderedCallback() {
    //     console.log('TRKA');
    //     console.log(this.template.querySelector("tr"));
    //
    //     const slot = document.createElement('slot');
    //     slot.name = 'test2';
    //     this.template.querySelector("tr").appendChild(slot);
    //     this.template.querySelector("tr").innerHTML = `
    //         <slot name="username"></slot>
    //         <slot name="birthday"></slot>
    //     `;
    //
    // }

    @api
    set columns(columnsNbr) {
        for(let i = 0; i < columnsNbr; i++) {
            this._emptyColumns.push('column' + i);
        }
    }

    get columns() {
        this._emptyColumns;
    }

}