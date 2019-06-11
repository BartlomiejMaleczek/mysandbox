/**
 * Created by BMaleczek on 18.05.2017.
 *//*toggleCssController.js*/
   ({
       toggle : function(component, event, helper) {
         //  var toggleText = component.find("text");
         var toggleText = event.getSource();
           console.log(toggleText);
           $A.util.toggleClass(toggleText, "toggle");
       }
   })