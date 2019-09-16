({
    changeActiveTab: function(component, event, helper) {
      var tabElem = event.currentTarget;
//     var tabElem = event.getSource();
      var elem = component.find("tab-default__item_li-2");
//      var elem = event.target.get("tab-default__item_li-2");
     // var tabElem2 = $A.get("e.v.");
//      var tabElemId = event.currentTarget.id;
//      console.log(tabElemId);
      $A.util.toggleClass(tabElem, "slds-active");
      if(tabElem.id == 'tab-default__item_li-1') {
        console.log('Jestem jedynka');
        $A.util.toggleClass(tabElem, "slds-active");
        $A.util.removeClass();
      }else if(tabElem.id == 'tab-default__item_li-2') {
        console.log('Jestem dwojka');
      }
    },
})