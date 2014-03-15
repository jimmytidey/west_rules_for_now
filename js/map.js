



var map = new Datamap({
     scope: 'world', //currently supports 'usa' and 'world', however with custom map data you can specify your own
     element: document.getElementById('map_container'),
     setProjection: function(element) {
         var projection = d3.geo.equirectangular()
           .center([34.802075 , 38.996815])
           //.rotate([4.4, 0])
           .scale(170)
           .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
            var path = d3.geo.path()
               .projection(projection);
            return {path: path, projection: projection};
     },
     projection: 'equirectangular', //style of projection to be used. try "mercator"
     done: function() {}, //callback when the map is done drawing
     fills: {
       defaultFill: '#ABDDA4' //the keys in this object map to the "fillKey" of [data] or [bubbles]
     },
     geographyConfig: {
         dataUrl: null, //if not null, datamaps will fetch the map JSON (currently only supports topojson)
         hideAntarctica: true,
         borderWidth: 1,
         borderColor: '#FDFDFD',
         popupTemplate: function(geography, data) { //this function should just return a string
           return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong></div>';
         },
         popupOnHover: true, //disable the popup while hovering
         highlightOnHover: true,
         highlightFillColor: '#FC8D59',
         highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
         highlightBorderWidth: 2
     },
     bubbleConfig: {
         borderWidth: 2,
         borderColor: '#FFFFFF',
         popupOnHover: true,
         popupTemplate: function(geography, data) {
           return '<div class="hoverinfo"><strong>' + data.name + '</strong></div>';
         },
         fillOpacity: 0.75,
         highlightOnHover: true,
         highlightFillColor: '#FC8D59',
         highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
         highlightBorderWidth: 2,
         highlightFillOpacity: 0.85
     }
 });


