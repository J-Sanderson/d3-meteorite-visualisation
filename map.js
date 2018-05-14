//geoJSOn via https://geojson-maps.ash.ms/
d3.json("https://raw.githubusercontent.com/J-Sanderson/d3-meteorite-visualisation/master/custom.geo.json", function(error, data) {
  
  if (error) throw error;
  
  var w = 800;
  var h = 400

  var svg = d3.select("#chart")
    .attr("width", "100%")
    .attr("height", h)
  
  var eqProjection = d3.geoEquirectangular()
    .scale( 190000 )
    .center([0, 0])
    .translate(w / 2, h / 2);
  
  var geoPath = d3.geoPath()
    .projection(eqProjection)
  
  svg.selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("fill", "red")
    .attr("d", geoPath);
  
});