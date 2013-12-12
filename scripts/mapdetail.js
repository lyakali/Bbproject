var Map = {
    Models: {},
    Collections: {},
    Views: {},
    Templates:{}
}

Map.Models.MapView = Backbone.Model.extend({
  
});

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

Map.Models.mapview = new Map.Models.MapView();

Map.Views.MapView = Backbone.View.extend({
  id: 'map-canvas',
  initialize: function(){
   
    var mapOptions = {
        center: new google.maps.LatLng(51.511093, -0.118189),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.el, mapOptions);
     this.collection = new Map.Collections.Details();


    _.bindAll(this, 'render');
     
      var that = this;
      this.collection.fetch({
        success: function (data) {
            
          console.log(data)

            that.render();
        }
      });
   // this.render();

  },
  render: function(position){


            marker = new google.maps.Marker({
                  position: position,
                  map: this.map,
                  title: "yep"   
            })
    $('#map-canvas').replaceWith(this.el);
    
  }
});
Map.Models.mapview = new Map.Views.MapView({model: Map.Models.mapview});



Map.Models.Detail = Backbone.Model.extend({})


Map.Templates.details = _.template($("#tmplt-Details").html())

Map.Views.Details = Backbone.View.extend({
    el: $("#mainContainer"),
    template: Map.Templates.details,
  

    initialize: function () {
        this.collection.bind("reset", this.render, this);
        this.collection.bind("add", this.addOne, this);


    },

    render: function () {
        
        $(this.el).html(this.template());
        this.addAll();
    },

    addAll: function () {
        console.log("addAll")
        this.collection.each(this.addOne);
    },

    addOne: function (model) {
        console.log("addOne")
        view = new Map.Views.Detail({ model: model });
        $("ul", this.el).append(view.render());
    }

})


Map.Templates.detail = _.template($("#tmplt-Detail").html())
Map.Views.Detail = Backbone.View.extend({
    tagName: "li",
    template: Map.Templates.detail,

    initialize: function () {
       
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

