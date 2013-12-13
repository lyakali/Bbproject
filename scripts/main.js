
var Map = {
    Models: {},
    Collections: {},
    Views: {},
    Templates:{}
}

Map.Models.Detail = Backbone.Model.extend({})
Map.Collections.Details = Backbone.Collection.extend({
    model: Map.Models.Detail,
    url: "scripts/data/stops.json",
    initialize: function(){
        console.log("Details initialize")
    },
    parse: function(response) {
        return response.markers;
    }
});

Map.Templates.details = _.template($("#tmplt-Details").html())

Map.Views.Details = Backbone.View.extend({
    el: $("#mainContainer"),
    template: Map.Templates.details,
    events: {
        "click a": "clicked"
    },
    
    initialize: function () {
         _.bindAll(this, "render", "addOne", "addAll","clicked");
        this.collection.bind("reset", this.render, this);
        this.collection.bind("add", this.addOne, this);

    },
    clicked: function(e, model){
       var id = $(e.currentTarget).data("id");
        var item = this.collection.get(id);
        var name = item.get("name");
        console.log(name);
        view = new Map.Views.Detail({ model: model });
        $("ul", this.el).append(view.render());
    },

    render: function () {
        $(this.el).html(this.template());
        //this.addAll();
    },/*

    addAll: function () {
        //console.log("addAll")
        //this.collection.each(this.addOne);
    },

    addOne: function (model) {
        //console.log("addOne")
        view = new Map.Views.Detail({ model: model });
        $("ul", this.el).append(view.render());
    }*/

})


Map.Templates.detail = _.template($("#tmplt-Detail").html())
Map.Views.Detail = Backbone.View.extend({
    tagName: "li",
    template: Map.Templates.detail,

    initialize: function () {
       _.bindAll(this, 'render');
    },

    render: function () {
        return $(this.el).append(this.template(this.model.toJSON())) ;
    }
})


Map.Router = Backbone.Router.extend({
    routes: {
        "": "defaultRoute"  //http://localhost:22257/Map/theater.htm
    },

    defaultRoute: function () {
        console.log("defaultRoute");
        Map.details = new Map.Collections.Details()
        new Map.Views.Details({ collection: Map.details }); 
        Map.details.fetch({
            sucess: function(response, xhr) {
                console.log(Map.details.length)
            },
            error: function(errorResponse) {
                console.log(errorResponse)
            }
        });
        
    }
})

var appRouter = new Map.Router();
Backbone.history.start();




