import { CurrentPageReference, NavigationMixin } from "lightning/navigation";

const _navigation = LightningElement =>
  class Navigation extends NavigationMixin(LightningElement) {
    currentPageReference;

    constructor() {
      super();

      this.currentPageReference = CurrentPageReference;
    }

    navigateToAccountHome() {
      this[NavigationMixin.Navigate]({
        type: "standard__objectPage",
        attributes: {
          objectApiName: "Account",
          actionName: "home"
        }
      });
    }

    navigateToWebPage(url, isReplaced) {
      this[NavigationMixin.Navigate](
        {
          type: "standard__webPage",
          attributes: {
            url: url
          }
        },
        isReplaced
      );
    }

    navigateToRelatedList(recordId, objectApiName, relationshipApiName) {
      this[NavigationMixin.Navigate]({
        type: "standard__recordRelationshipPage",
        attributes: {
          recordId: recordId,
          objectApiName: objectApiName,
          relationshipApiName: relationshipApiName,
          actionName: "view"
        }
      });
    }

    navigateToListView(objectApiName, filterName) {
      this[NavigationMixin.Navigate]({
        type: "standard__objectPage",
        attributes: {
          objectApiName: "Contact",
          actionName: "list"
        },
        state: {
          // 'filterName' is a property on the page 'state'
          // and identifies the target list view.
          // It may also be an 18 character list view id.
          filterName: filterName
        }
      });
    }

    navigateToLightningComponent(componentName, state) {
      this[NavigationMixin.Navigate]({
        type: "standard__component",
        attributes: {
          componentName: componentName
        },
        state: state
      });
    }

    navigateToTab(tabName) {
      this[NavigationMixin.Navigate]({
        type: "standard__navItemPage",
        attributes: {
          apiName: tabName
        }
      });
    }

    get currentPageReference() {
      return CurrentPageReference;
    }
  };

export { _navigation };
