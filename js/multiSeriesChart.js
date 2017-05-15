var margin={top:50, bottom:50, left:100, right:100},
    width=1400-margin.left-margin.right,
    height=600-margin.top-margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0,width], 1,0);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis().scale(y)
  .orient("left");

var valueline = d3.svg.line()
  .x(function(d) { return x(d.Year); })
  .y(function(d) { return y(d.Birth); });

var valueline2 = d3.svg.line()
  .x(function(d) { return x(d.Year); })
  .y(function(d) { return y(d.Death); });

var svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("../output/rate.json", function(error, data) {
  data.forEach(function(d) {
    d.Year = d.Year;
    d.Birth = d.Birth;
    d.Death = d.Death;
  });

x.domain(data.map(function(d){
    return d.Year;
  }));
  // Scale the range of the data
  
y.domain([0, d3.max(data, function(d) { return Math.max(d.Birth, d.Death); })]);

svg.append("path")    
    .attr("class", "line birth")
        .style("fill", "navy")     //counrty Vs Birth
    .attr("d", valueline(data));
    


svg.append("path")    
    .attr("class", "line death")
    .style("fill", "green")  //counrty Vs Death
    .attr("d", valueline2(data));


svg.append("g")
    .attr("class", "axis yearalgin")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("transform", "translate(" + width + ",0)")
    .attr("dy","1.3em")
    .attr("dx","1.2em")
    .style("font-size","17px")
    .style("font-weight","bold")
    .style("color","red")
    .text("Year");

  

svg.append("g")
    .attr("class", "axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("dy","1em")
    .style("text-anchor", "end")
    .style("font-size","16px")
    .style("font-weight","bold")
    .text("Birth,Death");       
});
