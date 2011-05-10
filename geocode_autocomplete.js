var geocoder = new google.maps.Geocoder();

$('.geocode_autocomplete').live('focus', function(){
        $(this).autocomplete({
            source: function(request, response) {
              geocoder.geocode( {'address': request.term}, function(results, status) {
                $("#map_location").attr("value","");
                response($.map(results, function(item) {
                  //if(event_type != "route")
                    value = item.address_components[0].long_name;
                  //else
                    //value = item.formatted_address;
                  return {
                    label: item.formatted_address,
                    value: value,
                    location: item.geometry.location,
                    addr: item.address_components[0]
                  }
                }));
              })
            },
            minLength: 2,
            select: function(event, ui) {
               $("#map_location").html("Latitude: " + ui.item.location.lat() + " Longitude: "+ ui.item.location.lng());
	    }
          });
        });
