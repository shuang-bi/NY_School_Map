'use strict'
console.log('Load map.js')

mapboxgl.accessToken = 'pk.eyJ1Ijoic2h1YW5nLWJpIiwiYSI6ImNrOGR1Y3M3eDB0aHAzbWp4YmoyemdsY2UifQ.qyhGcRVPbCdbzFPD-HnKQw'

var map = new mapboxgl.Map({
    container:'map',
    style:'mapbox://styles/shuang-bi/ckbmsodhc11uk1io27vgmwssu',
    center:[-73.9510,40.7605],
    zoom: 11

});



map.on('mousemove',function(e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers:['Upward-mobility-ny']    
    });

    if (features.length > 0) {
        document.getElementById('pd').innerHTML = '<h3><strong>' + features[0].properties.ntaname 
        + '</strong></h3><p><strong><em>' + features[0].properties.Tractkfr_pooled_pooled_p25 
        + '</strong> Mean predicted income percentile for children with parents at 25 percentile in the national household income distribution</em></p>';
      } else {
        document.getElementById('pd').innerHTML = '<p>Hover over a Census Tract!</p>';
      }

});

var schooldata_url = './data/NY_School_Data.geojson'
map.on('load',function(){
    map.addSource('schooldata',{
        'type':'geojson',
        'data':'./data/NY_School_Data.geojson'
    });


    map.addLayer(
        {
            'id':'poverty%',
            'source':'schooldata',
    
            'type':'circle',
            'paint':{
                'circle-radius':4,
                'circle-color':'#fcc603',
                'circle-opacity':0.8
               }
        },
    )
})

map.on('click','poverty%',function(e) {
    var p = e.features[0].properties;
    new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(p.School_Demographic_PovertyRate + ' (' + p.School_Performance_Rank_Ave_Standard_Score + ')')
    .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the states layer.
map.on('mouseenter','poverty%', function() {
    map.getCanvas().style.cursor = 'pointer';
});
     
    // Change it back to a pointer when it leaves.
map.on('mouseleave', 'poverty%', function() {
    map.getCanvas().style.cursor = 'default';
});






