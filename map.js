var w = 1045;
var h = 548;

d3.select("#main").style("width", w + "px")

var svg = d3.select("#chart")
  .attr("width", w)
  .attr("height", h)
  .call(d3.zoom().on("zoom", function(){
    svg.attr("transform", d3.event.transform)
  }))
  .append("g")

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