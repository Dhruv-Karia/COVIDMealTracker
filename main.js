if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}


mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtZiIsImEiOiJjaWZ3bGhtdjgzMnN1dWdrcnEwZTVieG91In0.DkCY-91coDahKvpH7Z26dw';
// This adds the map
var map = new mapboxgl.Map({
    // container id specified in the HTML
    container: 'map',
    // style URL
    style: 'mapbox://styles/mapbox/dark-v10',
    // initial position in [long, lat] format
    center: [-122.15, 47.45],
    // initial zoom
    zoom: 10
});



/// fetch data for emergency meal
fetch('https://data.seattle.gov/resource/kkzf-ntnu.json').then(function (response) {
    // The API call was successful!
    return response.json();
}).then(function (data) {
    // This is the JSON from our response
    data.forEach(function(x)
    {

        // create the popup
        var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            //x.location+ x.address
            '<b>' + x.location + '</b><br>' + x.address + '<br>' + x.operational_notes
        );

        //markers
        new mapboxgl.Marker()
            .setLngLat([x.longitude, x.latitude])
            .setPopup(popup)
            .addTo(map);
    });


});

// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);

map.addControl(
    new MapboxDirections({
        accessToken: mapboxgl.accessToken
    }),
    'top-left'
);








