var w = 1045;
var h = 548;

var svg = d3.select("#chart")
  .attr("width", w)
  .attr("height", h);

var projection = d3.geoEquirectangular()
  .center([0, 5])
  .scale(180) //180
  .rotate([0, 0])

var path = d3.geoPath(projection);

d3.json("https://giottojs.org/geo/world-110m.json", function(error, world) {
  
  if (error) throw error;
  
  var countries = topojson.feature(world, world.objects.countries).features;
  //var neighbors = topojson.neighbors(world.objects.countries.geometries);
  
  svg.selectAll(".country")
    .data(countries)
    .enter()
    .insert("path")
    .attr("class", "country")
    .attr("d", path)
  
});