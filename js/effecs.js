///////////////////////////////////////////////////////////////////////////
//////////////////////////// Progress circle //////////////////////////////
///////////////////////////////////////////////////////////////////////////	

function progressCircle(time) {
//Create a small icon that starts when an animation is going on
var progressWrapper = container.append("g")
		.attr("class", "progressWrapper")
		.attr("transform", "translate(0,-220)")
		.style("pointer-events", "none");

//Circle in the back so the whole thing becomes clickable
var backCircle =  progressWrapper.append("circle")
	.attr("r", 12)
	.style("opacity", 0.01);
	
//Create the play button
var play =  progressWrapper.append("path")
	.attr("class", "play")
	.attr("d", d3.svg.symbol().type("triangle-up").size(35))
	.style("fill","#3B3B3B")
	.attr("transform", "translate(1,0) rotate(90)")
	.style("opacity", 0);

/*
//Create pause icon
var pause = container.selectAll(".pause")
				.data([-5,2])
				.enter()
				.append("rect")
				.attr("transform", "translate(0,-200)")
				.attr("x", function (d) {console.log(d); return d;})
				.attr("y",  -5)
				.attr("width", 3)
				.attr("height", 10)
				.style("fill", "white");
*/

/*
//The circle, already created in main script
var arc = d3.svg.arc()
	.innerRadius(10)
	.outerRadius(12);
*/

//Create the arc around the play button
var progress = progressWrapper.append("path")
	.datum({startAngle: 0,endAngle: 2*Math.PI})
	.attr("class", "playCircle")
	.style("fill", "white")
	.style("opacity", 0)
	.attr("d", arc);
 
};

function startCircle(time) {

	//Stop click event
	d3.select(".progressWrapper")
		.style("pointer-events", "none");
		
	//Dim the play button
	d3.selectAll(".play")
		.transition().delay(0).duration(500)
		.style("opacity", 1)
		.style("fill","#3B3B3B")
		.transition().delay(700 * time)
		.style("fill","white")
		;

	//Run the circle and at the end 
	d3.selectAll(".playCircle")
		.style("opacity", 1)
		.transition().duration(700 * time).ease("linear")
		.attrTween("d", function(d) {
		   var i = d3.interpolate(d.startAngle, d.endAngle);
		   return function(t) {
				d.endAngle = i(t);
				return arc(d);
		   }//return
		})
		.call(endall, function() {
			d3.select(".progressWrapper")
				.style("pointer-events", "auto");
		});
};



///////////////////////////////////////////////////////////////////////////
/////////////////////////////// Legend ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


function createLegend() {
    var legendRectSize = 7;
    var legendSpacing = 20;

    var stellarClass = [
        { "sClassName": 'A [7500K - 10000K]', "sClass": "A", "color": "#AADBEA" },
        { "sClassName": 'F [6000K - 7500K]', "sClass": "F", "color": "#F6F3D0" },
        { "sClassName": 'G [5200K - 6000K]', "sClass": "G", "color": "#F9F862" },
        { "sClassName": 'K [3700K - 5200K]', "sClass": "K", "color": "#FBA10D" },
    ];

    //Initiate container around Legend
    console.log(y);
    var legendContainer = svg.append("g").attr("class","legendContainer")
        .attr("transform", "translate(" + 30 + "," + (y - 90) + ")");
    //Create title of Legend
    var legendTitle = legendContainer.append('text')
        .attr('x', 0)
        .attr('y', legendRectSize - legendSpacing)
        .attr("dy", "1em")
        .attr('class', 'legendTitle')
        .attr('transform', function() {
            var height = legendRectSize + legendSpacing;
            var offset =  height * stellarClass.length / 2;
            var horz = -2 * legendRectSize;
            var vert = -2.3 * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
        })
        .text("Stellar class of the star around which the planet orbits")
        .call(wrap, 200);

    //Create container per circle/text pair
    var legend = legendContainer
        .selectAll('.legend')
        .data(stellarClass)
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
            var height = legendRectSize + legendSpacing;
            var offset =  height * stellarClass.length / 2;
            var horz = -2 * legendRectSize;
            var vert = i * height - offset;
            return 'translate(' + horz + ',' + vert + ')';
        })
        .on("mouseover", classSelect(0.02))
        .on("mouseout", classSelect(0.6));
    //Append circles to Legend
    legend.append('circle')
        .attr('r', legendRectSize)
        .attr('cx', 4)
        .attr('cy', legendRectSize/2 - legendSpacing)
        .attr("opacity", 0.5)
        .style('fill', function(d) {return d.color;});
    //Append text to Legend
    legend.append('text')
        .attr('x', legendRectSize + legendSpacing/2)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) { return d.sClassName; });

};//function createLegend

///////////////////////////////////////////////////////////////////////////
/////////////////////// Gradients per asteroid or Total /////////////////////
///////////////////////////////////////////////////////////////////////////
function createGradients() {

    //Just for fun a gradient that runs over all asteroids in a rainbow patterns
    var gradientLinear = svg
        .append("linearGradient")
        .attr("id", "gradientLinear")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("y1", "0")
        .attr("y2", "0")
        .attr("x1", "0")
        .attr("x2", "30%")
        .attr("spreadMethod", "reflect")
        .selectAll("stop")
        .data([
            {offset: "0%", color: "#6363FF"},
            {offset: "6.16%", color: "#6373FF"},
            {offset: "12.4%", color: "#63A3FF"},
            {offset: "18.7%", color: "#63E3FF"},
            {offset: "24.9%", color: "#63FFFB"},
            {offset: "31.2%", color: "#63FFCB"},
            {offset: "37.5%", color: "#63FF9B"},
            {offset: "43.7%", color: "#63FF6B"},
            {offset: "50%", color: "#7BFF63"},
            {offset: "56.3%", color: "#BBFF63"},
            {offset: "62.5%", color: "#DBFF63"},
            {offset: "68.8%", color: "#FBFF63"},
            {offset: "75%", color: "#FFD363"},
            {offset: "81.3%", color: "#FFB363"},
            {offset: "87.6%", color: "#FF8363"},
            {offset: "93.8%", color: "#FF7363"},
            {offset: "100%", color: "#FF6364"}
        ])
        .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });

    //Radial gradient with the center at one end of the circle, as if illuminated from the side
    //A gradient is created for each asteroid and colored to the temperature of its star
    var gradientContainer = container.append("g").attr("class","gradientContainer");

    var gradientRadial = gradientContainer
        .selectAll("radialGradient").data(asteroids).enter()
        .append("radialGradient")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%")
        .attr("fx", "0%")
        .attr("gradientUnits", "objectBoundingBox")
        .attr('id', function(d){return "gradientRadial-"+d.ID})

    gradientRadial.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", function(d) {return d3.rgb(colorScale(d.temp)).brighter(1);});

    gradientRadial.append("stop")
        .attr("offset", "40%")
        .attr("stop-color", function(d) {return colorScale(d.temp);});

    gradientRadial.append("stop")
        .attr("offset",  "100%")
        .attr("stop-color", function(d) {return d3.rgb(colorScale(d.temp)).darker(1.75);});

};



///////////////////////////////////////////////////////////////////////////
//////////////////////// Show the tooltip on hover ////////////////////////
///////////////////////////////////////////////////////////////////////////

function showTooltip(d) {

    //Show how to close tooltip
    d3.select("#tooltipInfo").style("visibility", "visible");

    //Make a different offset for really small asteroids
    //var Offset = (rScale(d.Radius)/2 < 2) ? 3 : rScale(d.Radius)/2;
    var xOffset = ((10*d.Radius)/2 < 3) ? 6 : (10*d.Radius)/2;
    var yOffset = ((10*d.Radius)/2 < 3) ? 0 : (10*d.Radius)/2;
    //Set first location of tooltip and change opacity
    var xpos = d.x + x/2 - xOffset + 3;
    var ypos = d.y + y/2 - yOffset - 5;
    d3.select("#tooltip")
        .style('top',ypos+"px")
        .style('left',xpos+"px")
        .transition().duration(500)
        .style('opacity',1);
    //Keep the tooltip moving with the asteroid, until stopTooltip
    //returns true (when the user clicks)
    d3.timer(function() {
        xpos = d.x + x/2 - xOffset + 3;
        ypos = d.y + y/2 - yOffset - 5;
        //Keep changing the location of the tooltip
        d3.select("#tooltip")
            .style('top',ypos+"px")
            .style('left',xpos+"px");
        //Breaks from the timer function when stopTooltip is changed to true
        //by another function
        if (stopTooltip == true) {
            //Hide tooltip info again
            d3.select("#tooltipInfo").style("visibility", "hidden");
            //Hide tooltip
            d3.select("#tooltip").transition().duration(300)
                .style('opacity',0)
                .call(endall, function() { //Move tooltip out of the way
                    d3.select("#tooltip")
                        .style('top',0+"px")
                        .style('left',0+"px");
                });
            //Remove show how to close
            return stopTooltip;
        }
    });


    d3.select("#tooltip .tooltip-asteroid").text(d.name);
    d3.select("#tooltip .tooltip-year").html("Descubierto en: " + d.discovered);
    //d3.select("#tooltip-class").html("Temperature of star: " + d.temp + " Kelvin");
    d3.select("#tooltip-period").html("Periodo orbita: " + formatSI(d.period) + " dias");
    d3.select("#tooltip-eccen").html("Excentricidad de orbita: " + d.e);
    d3.select("#tooltip-radius").html("Radio asteroide: " + formatSI(d.Radius * 11.209 ) + " Earth radii");
    d3.select("#tooltip-dist").html("Approx. distancia a esta estrella: " + formatSI(d.major/3000) + " au");
}//showTooltip
