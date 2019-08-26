({
    Graph: function (value) {
        this.vertices = [];
        this.edges = [];

        this.edges.push(value);

        this.addEdges = function (value) {
            this.edges.push(value);
        }
    },

    GraphChild: function (helper, value) {
        helper.Graph.call(this, value);
    }
})