// 1. --------- Visits Traffic Line Graph ------
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos();   
  d3.select('#trafficgraph svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Visits', 
      color: '#c4e6ff',
	  area: true,
	  fillOpacity: 1
    },
    {
      values: cos,
      key: 'Visitors',
      color: '#e6ccf5',
	  area: true,
	  fillOpacity: 1
	  
    }
  ];
}

// 2. -------- Conversion Graph (Lead) Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos1();   
  d3.select('#leadgraph svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos1() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Lead', 
      color: '#c8e6c9',
	  area: true,
	  fillOpacity: 1
    }
  ];
}

// 3. -------- Conversion Graph (Promo) Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos2();   
  d3.select('#promograph svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos2() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Promo', 
      color: '#ffe0b2',
	  area: true,
	  fillOpacity: 1
    }
  ];
}

// 3. -------- Conversion Graph (Share) Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos3();   
  d3.select('#sharegraph svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos3() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Share', 
      color: '#e8eaf6',
	  area: true,
	  fillOpacity: 1
    }
  ];
}


// 4. -------- Conversion Rate Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos4();   
  d3.select('#conversionrategraph svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos4() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Lead', 
      color: '#c8e6c9',
	  area: true,
	  fillOpacity: 1
    },
	{
      values: sin2,      
      key: 'Promo', 
      color: '#ffe0b2',
	  area: true,
	  fillOpacity: 1
    },
	{
      values: cos,      
      key: 'Share', 
      color: '#e8eaf6',
	  area: true,
	  fillOpacity: 1
    }
	
  ];
}


// 5. -------- Visits & Visitors Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos5();   
  d3.select('#allvisitorsgraph svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos5() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Visits', 
      color: '#c4e6ff',
	  area: true,
	  fillOpacity: 1
    },
	{
      values: sin2,      
      key: 'Visitors', 
      color: '#e6ccf5',
	  area: true,
	  fillOpacity: 1
    }
	
  ];
}


// 5. -------- Visits 1 Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(false);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos6();   
  d3.select('#allvisitorsgraph1 svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos6() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Visits', 
      color: '#c4e6ff',
	  area: true,
	  fillOpacity: 1
    }
	
  ];
}


// 7. -------- Visits 2 Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(false);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos7();   
  d3.select('#allvisitorsgraph2 svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos7() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Visits', 
      color: '#c4e6ff',
	  area: true,
	  fillOpacity: 1
    }
	
  ];
}


// 8. -------- Visits & Visitors Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos8();   
  d3.select('#allviewer svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos8() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Visits', 
      color: '#c4e6ff',
	  area: true,
	  fillOpacity: 1
    },
	{
      values: sin2,      
      key: 'Visitors', 
      color: '#e6ccf5',
	  area: true,
	  fillOpacity: 1
    }
	
  ];
}


// 9. -------- Visits & Visitors Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos9();   
  d3.select('#openclickedgraph svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos9() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Opened', 
      color: '#e8eaf6',
	  area: true,
	  fillOpacity: 1
    },
	{
      values: sin2,      
      key: 'Clicked', 
      color: '#ffe0b2',
	  area: true,
	  fillOpacity: 1
    }
	
  ];
}


// 10. -------- Visits & Visitors Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos10();   
  d3.select('#viewplay svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos10() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Visits', 
      color: '#e8eaf6',
	  area: true,
	  fillOpacity: 1
    },
	{
      values: sin2,      
      key: 'Play', 
      color: '#c8e6c9',
	  area: true,
	  fillOpacity: 1
    }
	
  ];
}

// 11. -------- Engegement  Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(false);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos11();   
  d3.select('#engagementgraph svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos11() {
  var sin = [],sin1 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin1.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Visitor', 
      color: '#ffc0c4',
	  area: true,
	  fillOpacity: 1
    }
  ];
}

// 12. -------- Engegement  Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(false);

  chart.xAxis    
    .tickFormat(d3.format(',r'));
	chart.showXAxis(false);

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos12();   
  d3.select('#heatmapgraph svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.

	  nv.utils.windowResize(function() { d3.select('#heatmapgraph svg').call(chart) });
 $(document).on('click', '.heatmap-icon', function() { 
	
		d3.select('#heatmapgraph svg').call(chart);
	
	})
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos12() {
  var sin = [],sin1 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin1.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Visitor', 
      color: '#fd605f',
	  area: true,
	  fillOpacity: 1
    }
  ];
}


// 13. --------  All Subscribers and UnSubscribers  Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos13();   
  d3.select('#allsubscribergraph svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos13() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'All', 
      color: '#c4e6ff',
	  area: true,
	  fillOpacity: 1
    },
	{
      values: sin2,      
      key: 'Subscribers', 
      color: '#d3f2c0',
	  area: true,
	  fillOpacity: 1
    },
	{
      values: cos,      
      key: 'Unsubscribers', 
      color: '#ffc0c4',
	  area: true,
	  fillOpacity: 1
    }
	
  ];
}


// 14. --------Opened & Closed Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos14();   
  d3.select('#openclosedgraph svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos14() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Opened', 
      color: '#e8eaf6',
	  area: true,
	  fillOpacity: 1
    },
	{
      values: sin2,      
      key: 'Closed', 
      color: '#ffe0b2',
	  area: true,
	  fillOpacity: 1
    }
	
  ];
}

// 15. -------- Conversion Rate Graph (Lead) Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos1();   
  d3.select('#conversionleadgraph svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos14() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Lead', 
      color: '#c8e6c9',
	  area: true,
	  fillOpacity: 1
    }
  ];
}

// 16. --------  Sales Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos16();   
  d3.select('#salesgraph svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos16() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Sales', 
      color: '#c4e6ff',
	  area: true,
	  fillOpacity: 1
    }
  ];
}

// 17. -------- Conversion Rate Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos17();   
  d3.select('#conversionrategraph1 svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos17() {
  var sin = [],sin2 = [],sin3 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    sin3.push({x: i, y: Math.sin(i/25)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Lead', 
      color: '#c8e6c9',
	  area: true,
	  fillOpacity: 1
    },
	{
      values: sin2,      
      key: 'Promo', 
      color: '#ffe0b2',
	  area: true,
	  fillOpacity: 1
    },
	{
      values: sin3,      
      key: 'Sales', 
      color: '#e8eaf6',
	  area: true,
	  fillOpacity: 1
    },
	{
      values: cos,      
      key: 'Share', 
      color: '#c4e6ff',
	  area: true,
	  fillOpacity: 1
    }
	
  ];
}


// 18. --------Triggered & Ended Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos18();   
  d3.select('#triggeredendedgraph svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos18() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Triggered', 
      color: '#bbccf9',
	  area: true,
	  fillOpacity: 1
    },
	{
      values: sin2,      
      key: 'Ended', 
      color: '#c5e7b1',
	  area: true,
	  fillOpacity: 1
    }
	
  ];
}



// 19. -------- Contacts Analysis Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos4();   
  d3.select('#contactsanalysisgraph svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos4() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Contacts', 
      color: '#c4e6ff',
	  area: true,
	  fillOpacity: 1
    },
	{
      values: sin2,      
      key: 'Sales', 
      color: '#e6ccf5',
	  area: true,
	  fillOpacity: 1
    },
	{
      values: cos,      
      key: 'Sales Conversion', 
      color: '#ffe0b2',
	  area: true,
	  fillOpacity: 1
    }
	
  ];
}


// 20. -------- Sales Analysis Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos4();   
  d3.select('#salessanalysisgraph svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos4() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Sales', 
      color: '#c4e6ff',
	  area: true,
	  fillOpacity: 1
    },
	{
      values: sin2,      
      key: 'Orders', 
      color: '#e6ccf5',
	  area: true,
	  fillOpacity: 1
    },
	{
      values: cos,      
      key: 'Clicks', 
      color: '#ffe0b2',
	  area: true,
	  fillOpacity: 1
    }
	
  ];
}


// 21. -------- Revenue Analysis Line Graph ------>
nv.addGraph(function() {
	var chart = nv.models.lineChart()               
	.useInteractiveGuideline(true)           
	.showLegend(true);

  chart.xAxis    
    .tickFormat(d3.format(',r'));

  chart.yAxis
    .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos1();   
  d3.select('#revenueanalysisgraph svg')    
      .datum(myData)        
      .call(chart);          

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos1() {
  var sin = [],sin2 = [],
      cos = [];

  //Data is represented as an array of {x,y} pairs.
  for (var i = 0; i < 10; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    sin2.push({x: i, y: Math.sin(i/15)});
    cos.push({x: i, y: Math.sin(i/45)});
  }

  return [
    {
      values: sin,      
      key: 'Revenue', 
      color: '#c8e6c9',
	  area: true,
	  fillOpacity: 1
    }
  ];
}

// 1. --------- Bar Graph-- ==============================================================

nv.addGraph(function() {
    var chart = nv.models.multiBarChart()
      .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
      .rotateLabels(0)      //Angle to rotate x-axis labels.
      .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
      .groupSpacing(0.1)    //Distance between each group of bars.
    ;

    chart.xAxis
        .tickFormat(d3.format(',f'));

    chart.yAxis
        .tickFormat(d3.format(',.1f'));

    d3.select('#bargraph svg')
        .datum(exampleData())
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
});

//Generate some nice data.
function exampleData() {
  return stream_layers(3,10+Math.random()*100,.1).map(function(data, i) {
    return {
      key: 'Stream ' + i,
      values: data
    };
  });
}

// 2. --------- Promo Bar Graph--


nv.addGraph(function() {
    var chart = nv.models.multiBarChart()
      .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
      .rotateLabels(0)      //Angle to rotate x-axis labels.
      .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
      .groupSpacing(0.1)    //Distance between each group of bars.
    ;

    chart.xAxis
        .tickFormat(d3.format(',f'));

    chart.yAxis
        .tickFormat(d3.format(',.1f'));

    d3.select('#graphpromobar svg')
        .datum(exampleData1())
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
});

//Generate some nice data.
function exampleData1() {
  return stream_layers(3,10+Math.random()*100,.1).map(function(data, i) {
    return {
      key: 'Stream ' + i,
      values: data
    };
  });
}

// 3. --------- Share Bar Graph--


nv.addGraph(function() {
    var chart = nv.models.multiBarChart()
      .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
      .rotateLabels(0)      //Angle to rotate x-axis labels.
      .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
      .groupSpacing(0.1)    //Distance between each group of bars.
    ;

    chart.xAxis
        .tickFormat(d3.format(',f'));

    chart.yAxis
        .tickFormat(d3.format(',.1f'));

    d3.select('#graphsharebar svg')
        .datum(exampleData2())
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
});

//Generate some nice data.
function exampleData2() {
  return stream_layers(3,10+Math.random()*100,.1).map(function(data, i) {
    return {
      key: 'Stream ' + i,
      values: data
    };
  });
}

// 4. --------- Conversion Rate Bar Graph--

nv.addGraph(function() {
    var chart = nv.models.multiBarChart()
      .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
      .rotateLabels(0)      //Angle to rotate x-axis labels.
      .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
      .groupSpacing(0.1)    //Distance between each group of bars.
    ;

    chart.xAxis
        .tickFormat(d3.format(',f'));

    chart.yAxis
        .tickFormat(d3.format(',.1f'));

    d3.select('#conversionrategraphbar svg')
        .datum(exampleData3())
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
});

//Generate some nice data.
function exampleData3() {
  return stream_layers(3,10+Math.random()*100,.1).map(function(data, i) {
    return {
      key: 'Stream ' + i,
      values: data
    };
  });
}


// 5. --------- engagement Bar Graph--

nv.addGraph(function() {
    var chart = nv.models.multiBarChart()
      .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
      .rotateLabels(0)      //Angle to rotate x-axis labels.
      .showControls(true)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
      .groupSpacing(0.1)    //Distance between each group of bars.
    ;

    chart.xAxis
        .tickFormat(d3.format(',f'));

    chart.yAxis
        .tickFormat(d3.format(',.1f'));

    d3.select('#engagementgraphbar svg')
        .datum(exampleData4())
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
});

//Generate some nice data.
function exampleData4() {
  return stream_layers(3,10+Math.random()*100,.1).map(function(data, i) {
    return {
      key: 'Stream ' + i,
      values: data
    };
  });
}