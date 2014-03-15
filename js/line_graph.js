var m = [20, 20, 20, 60]; // margins
var w = 1200 - m[1] - m[3]; // width
var h = 250 - m[0] - m[2]; // height

var data = social_development;
clean = [];
for(var i = 0; i < data.length; i++) { 
    clean[i] = [];
    clean[i].date       = parseFloat(data[i].date.replace(',', ''));  
    clean[i].west_total = parseInt(data[i].west_total);
    clean[i].east_total = parseInt(data[i].east_total);
    if(data[i].east_total == 0) { 
        clean[i].east_total = 1;
    }
}

// X scale will fit all values from data[] within pixels 0-w
var x = d3.scale.linear().domain([-10000, 2000]).range([0, w]);

// Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
var y = d3.scale.log().domain([1, 1000]).range([h, 0]).nice();

// automatically determining max range can work something like this
// var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);

var east_line = d3.svg.line()

// assign the X function to plot our line as we wish
.x(function(d,i) { 
	// verbose logging to show what's actually being done

	// return the X coordinate where we want to plot this datapoint
	return x(d.date); 
})
.y(function(d) { 
	// verbose logging to show what's actually being done
	// return the Y coordinate where we want to plot this datapoint
	//console.log(east_total);
	var ret = d.west_total;
 
	return y(ret); 
}).interpolate("basis");


var west_line = d3.svg.line()

// assign the X function to plot our line as we wish
.x(function(d,i) { 
	// verbose logging to show what's actually being done
	
	// return the X coordinate where we want to plot this datapoint
	return x(d.date); 
})
.y(function(d) { 
	// verbose logging to show what's actually being done
	
	// return the Y coordinate where we want to plot this datapoint
	//console.log(east_total);
	var ret = d.east_total;
 
	return y(ret); 
}).interpolate("basis");


// Add an SVG element with the desired dimensions and margin.
var graph = d3.select("#graph").append("svg:svg")
      .attr("width", w + m[1] + m[3])
      .attr("height", h + m[0] + m[2])
      .append("svg:g")
      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

// create yAxis
var xAxis = d3.svg.axis().scale(x).tickSize(-h);

// Add the x-axis.
graph.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis);

// create left yAxis
var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");

// Add the y-axis to the left
graph.append("svg:g")
      .attr("class", "y axis")
      .attr("transform", "translate(-25,0)")
      .call(yAxisLeft);
      

graph.selectAll("dot")    
      .data(clean)         
      .enter().append("circle")                               
      .attr("r", 1)       
      .attr("cx", function(d) { return x(d.date); })       
      .attr("cy", function(d) { return y(d.west_total); })     
      .on("mouseover", function(d) {
            
        })
      .on("mouseout", function(d) {       

      });

// Add the line by appending an svg:path element with the data line we created above
// do this AFTER the axes above so that the line is above the tick-lines
graph.append("svg:path").attr("d", east_line(clean)).attr("class", "east_total");
graph.append("svg:path").attr("d", west_line(clean)).attr("class", "west_total");1