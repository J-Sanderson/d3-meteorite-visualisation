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
  
  svg.selectAll(".country")
    .data(countries)
    .enter()
    .insert("path")
    .attr("class", "country")
    .attr("d", path)
  
  d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json", function(error, data) {
    
    if (error) throw error;
    
    var rScale = d3.scaleLinear()
      .domain([
        d3.min(data.features, function (d) {return d.properties.mass}),
        d3.max(data.features, function (d) {return d.properties.mass})
      ])
      .range([1, 3])
    
    var tip = d3.tip().attr("class", "d3-tip").html(function(d){
      var text = "<p><strong>" +
          d.properties.name +
          "</p><p>Mass:</strong> " +
          d.properties.mass +
          "<br><strong>Year:</strong> " +
          new Date(d.properties.year).getFullYear() +
          "<br><strong>Latitude:</strong> " +
          d.properties.reclat +
          "<br><strong>Longitude:</strong> " +
          d.properties.reclong +
          "<br><strong>Class:</strong> " +
          d.properties.recclass +
          "</p>"
      return text;
    }).direction("ne");
    svg.call(tip);
    
    svg.selectAll(".meteorite")
      .data(data.features)
      .enter()
      .append("circle")
      .attr("class", "meteorite")
      .attr("cx", function(d) {
        if (d.geometry) {
          return projection(d.geometry.coordinates)[0];
        }
      })
      .attr("cy", function(d) {
        if (d.geometry) {
          return projection(d.geometry.coordinates)[1];
        }
      })
      .attr("r", function(d) {
        return Math.cbrt(rScale(d.properties.mass));
      })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
    
  });
  
});