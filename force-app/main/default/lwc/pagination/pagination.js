/**
 * Created by BMaleczek on 09.04.2020.
 */

import { LightningElement, api, wire, track } from "lwc";

export default class Pagination extends LightningElement {
  @api page;
  @api pageSize;
  @api itemsLength;

  @track paginationItems = [];

  recordsPerPageLimit = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "100", label: "100" }
  ];

  constructor() {
    super();
  }

  connectedCallback() {
    this.getPaginationItems();
  }

  goToPage() {}

  goToNext() {}

  goToLast() {}

  goToFirst() {}

  goToPrevious() {}

  handlePageSizeChange() {}

  getLastPage() {
    return Math.ceil(this.itemsLength / this.pageSize) - 1;
  }

  getPaginationItems() {
    const lastPage = this.getLastPage();

    let min = Math.max(this.page - 2, 0),
      max = Math.min(this.page + 2, lastPage);

    if (min != 0) {
      this.paginationItems.push({ label: "...", value: min - 1 });
    }

    for (; min <= max; min++) {
      this.paginationItems.push({ label: min + 1, value: min });
    }

    if (max != lastPage) {
      this.paginationItems.push({ label: "...", value: max + 1 });
    }
  }

  getAndSetCurrentPage() {}

  setOldPageAndPageSize() {}

  getPageAndPageSizePayload() {}

  reversePageAndPageSize() {}

  firePaginationEvt() {}
}
