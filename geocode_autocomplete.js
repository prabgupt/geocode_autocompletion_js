/*

Copyright (c) 2011 Prabhat Gupta(prabhatgupta.webs.com | golygon.com)

This script may be used for non-commercial purposes only. For any
commercial purposes, please contact the author at prabhat@golygon.com

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/

var geocoder = new google.maps.Geocoder();

$('.geocode_autocomplete').live('focus', function(){
        $(this).autocomplete({
            source: function(request, response) {
              geocoder.geocode( {'address': request.term}, function(results, status) {
                //$("#map_location").attr("value","");
                response($.map(results, function(item) {
                    value = item.address_components[0].long_name;
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
              // $("#map_location").html("Latitude: " + ui.item.location.lat() + " Longitude: "+ ui.item.location.lng());
	      showMap(ui.item.location.lat(), ui.item.location.lng(), 8, 'map_location');
	    }
          });
        });
	
function showMap(lat, lng, zoom, div) {
  var location = new google.maps.LatLng(lat,lng);
  var mapOptions = {
    zoom: zoom,
    center: location,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: true
  };
  var mapShow =  new google.maps.Map(document.getElementById(div), mapOptions);
  var local_marker = new google.maps.Marker({
	                position: location,
	                animation: google.maps.Animation.DROP,
	                map: mapShow
               	     });
}

