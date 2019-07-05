public without sharing class ChartHelper {

    @AuraEnabled
    public static List<chartData> GetInventory() {
        List<chartData> cht = new List<chartData>();
        //ToDo: Perform a calculation that aggregates active Products that have a positive Quantity_Remaining__c
        //  And return a list of chartData
        //  Where the name is the Product Family and the Qty is the sum of the Quantity_Remaining__c
        List<AggregateResult> aggregateResults = [
                SELECT Sum(Quantity_Remaining__c) total , Family
                FROM Product2
                WHERE Quantity_Remaining__c > 0
                AND IsActive = true
                GROUP BY Family

        ];

        System.debug('aggregateResults' + aggregateResults);

        for(AggregateResult aggregateResult : aggregateResults) {
//            Decimal val = Decimal.valueOf( String.valueOf(aggregateResult.get('val') + '.0'));
//            System.debug(val);
            cht.add(new ChartData( (String) aggregateResult.get('Family'),  Integer.valueOf(aggregateResult.get('total'))));


        }

//        (Decimal) aggregateResult.get('val')

        System.debug('CHART DATA' + JSON.serializePretty(cht));

//        cht.add(new ChartData('Test1', 23.2));
//        cht.add(new ChartData('Test2', 23.3));
//        cht.add(new ChartData('Test3', 23.4));
        return cht;
    }

    public class ChartData {
        @AuraEnabled
        public String name { get; set; }
        @AuraEnabled
        public Decimal val { get; set; }

        public ChartData(String name, Decimal val) {
            this.name = name;
            this.val = val;
        }
    }

}