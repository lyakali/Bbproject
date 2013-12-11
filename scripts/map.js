
function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(51.511093, -0.118189),
      zoom: 11
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    

    $.getJSON( "json/bus-stops.json", function( data ) {
      var items = [];

      $.each(data.markers,function() {

        var item = this;
        latLng = new google.maps.LatLng(this.lat, this.lng); 

         // Creating a marker and putting it on the map
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: this.name
        });

        var infoWindow = new google.maps.InfoWindow({
          content:'<strong>' + item.id + '</strong>'
        });

      
        google.maps.event.addListener(marker, "click", function(e) {
          // infoWindow.setContent(this.name);
          infoWindow.open(map, marker);
        });

      });
    });

  }


    google.maps.event.addDomListener(window, 'load', initialize);


 