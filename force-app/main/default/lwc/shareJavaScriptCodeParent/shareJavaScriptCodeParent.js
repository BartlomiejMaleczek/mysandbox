/**
 * Created by BMaleczek on 19.03.2020.
 */

// import {shareJavaScriptCodeChild} from 'c/shareJavaScriptCodeChild'

import {ServiceAbstract} from 'c/serviceAbstract';
export default class ShareJavaScriptCodeParent extends ServiceAbstract {

    @api recordId;
    connectedCallback() {
        console.log('SHARE PARENT');
        console.log(this.utils.getTermOptions());

        // importHandler();
        // this.naviagteToAccountHome();

    }


    // async importHandler() {
    //     const module = await import("c/shareJavaScriptCodeChild");
    //     console.log('MODULE', module);
    // }

    get pah() {
        return 'HELLO';
    }
}