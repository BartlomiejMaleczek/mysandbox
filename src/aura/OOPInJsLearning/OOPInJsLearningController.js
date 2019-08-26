({
    handleOOP: function (cmp, evt, helper) {
        helper.Graph.prototype.addVertex = function(v){
                this.vertices.push(v);
        };

        var g = new helper.Graph(1);
        g.addVertex(5);
        g.addVertex(6);
        g.addVertex(7);
        g.addEdges(6);
        console.log(g);

        var z = new helper.Graph(2);
        z.addVertex(54);
        console.log(z);

        cmp.set("v.Graph", g);

        helper.GraphChild.prototype = new helper.Graph();
        helper.GraphChild.prototype.calculate = function () {
          console.log('Edges', this.edges);
        };

        var graphChild = new helper.GraphChild(helper, 1);
        graphChild.addVertex(5);
        graphChild.addEdges(6);
        graphChild.calculate();

        console.log('graphChild', graphChild);

    }
})