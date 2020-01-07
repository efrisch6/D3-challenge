// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("assets/data/data.csv").then(function(stateData) {
    console.log("hello");
    // console.log(stateData);
    
    stateData.forEach(data => {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });
    // console.log(stateData)

    var xLinearScale = d3.scaleLinear()
      .domain([0,d3.max(stateData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(stateData, d => d.healthcare)])
      .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    var circlesGroup = 
    chartGroup.selectAll("circle")
      .data(stateData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "15")
      .attr("fill", "lightblue")
      .attr("opacity", "1").text(d => d.abbr).exit()
      ;

    

    chartGroup.selectAll("text.states")
      .data(stateData)
      .enter()
      .append("text")
      .classed("states", true)
      .attr("dx", d => xLinearScale(d.poverty))
      .attr("dy", d => yLinearScale(d.healthcare)+4)
      .style("text-anchor","middle")
      .attr("fill", "white")
      .text(d=> d.abbr).exit();
    
      stateData.forEach(d=>console.log(`${d.abbr} - ${d.poverty} - ${d.healthcare}`));

    chartGroup.append("text")
      .attr("transform","rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height /2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .attr("font-weight","bold")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .attr("font-weight","bold")
      .text("In Poverty (%)");


});