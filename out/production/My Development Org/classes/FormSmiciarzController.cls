/**
 * Created by BMaleczek on 25.05.2017.
 */

public with sharing class FormSmiciarzController {
    public Time typeString {get; set;}
    public Integer typeInt {get; set;}
        public FormSmiciarzController(ApexPages.StandardController controller) {

        }

    public List<SelectOption> getProductCategories() {
        List<SelectOption> options = new List<SelectOption>();


        for(Integer i = 0; i < 3 ; i++) {
            options.add(new SelectOption('dupa' + i, 'dupa' + i));
        }
        return options;
    }

    public void onProductCategoryChange() {
        System.debug('Wywoluje sie');
    }
    }