/**
 * Created by BMaleczek on 09.07.2020.
 */

import {LightningElement, api, track} from 'lwc';

export default class NavItemLink extends LightningElement {
    @api navItem;
    @api svgChevronRight;

    renderedCallback() {
            if (this.navItem.item.isCurrentPage) {

                const currentPageNavItemLinkTarget = this.template.querySelector('.nav-item-link');

                this.fireCustomEvent(
                    this,
                    'setcurrentpagenavitemlinktarget',
                    {
                        detail: currentPageNavItemLinkTarget.firstElementChild
                    },
                    {bubbles: true}
                );
            }
    }

    handleLinkMouseEnter(event) {
        const target = event.currentTarget;

        this.fireCustomEvent(
            this,
            'switchactivenavitemlink',
            {
                detail: target.firstElementChild
            },
            {bubbles: true}
        );
    }

    handleLinkMouseLeave(event) {
        this.fireCustomEvent(
            this,
            'switchtocurrentnavitemlinkpage',
            {},
            {bubbles: true}
        );

    }

    fireCustomEvent(cmp, name, detail, propagation) {
        const customEvent = new CustomEvent(
            name,
            detail,
            propagation
        );

        cmp.dispatchEvent(customEvent);
    }
}