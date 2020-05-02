({
	toggleDaySelected : function(component, event, helper) {
        const calendarDay = component.get('v.calendarDay');

        component.set('v.calendarDay.selected', !calendarDay.selected);
    },

	handleRender : function(component, event, helper) {
        const calendarDay = component.get('v.calendarDay'),
            button = component.find('button').getElement(),
            isWeekend = calendarDay.date.getDay()%6==0;

        $A.util.removeClass(button, !calendarDay.selected ? 'slds-button_brand' : 'slds-button_neutral');
        $A.util.addClass(button, calendarDay.selected ? 'slds-button_brand' : 'slds-button_neutral');

        if (isWeekend) {
            $A.util.addClass(button, 'isWeekend');
        } else {
            $A.util.removeClass(button, 'isWeekend');
        }
    }
})