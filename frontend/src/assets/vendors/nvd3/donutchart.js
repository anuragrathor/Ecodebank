// ============= Location Map Donut Chart  ==================
var myColors1 = ["#0092ff", "#27a3ff", "#3babff", "#62bcff", "#62bcff", "#89cdff", "#9dd5ff", "#b1ddff", "#c4e6ff", "#d8eeff"];
var myColors2 = ["#fdc100", "#ffcb25", "#ffd039", "#ffd54c", "#ffd960", "#ffde74", "#ffe387", "#ffe79b", "#ffecaf", "#fff1c2"];
var myColors3 = ["#a54ada", "#ad5add", "#b56ae0", "#bd7be4", "#c58be7", "#cd9bea", "#d5abee", "#ddbcf1", "#e6ccf4", "#eedcf8"];
var myColors4 = ["#64c529", "#6dd42e", "#83da4f", "#9ae16f", "#a6e47f", "#b1e890", "#bceba0", "#c8efb0", "#d3f2c0", "#def5d0"];
var dummyData1 = [
      { 
        "label": "United States",
        "value" : 10
      } , 
      { 
        "label": "Malaysia",
        "value" : 16
      } , 
      { 
        "label": "India",
        "value" : 10
      } , 
      { 
        "label": "Philippines",
        "value" : 10
      } , 
      { 
        "label": "Canada",
        "value" : 10
      } , 
      { 
        "label": "Nigeria",
        "value" : 10
      }, 
      { 
        "label": "Netherlands",
        "value" : 10
      }, 
      { 
        "label": "Mexico",
        "value" : 10
      }, 
      { 
        "label": "South Africa",
        "value" : 10
      }, 
      { 
        "label": "Other",
        "value" : 10
      }
    ];

var dummyData3 = [
      { 
        "label": "United States",
        "value" : 10
      } , 
      { 
        "label": "Malaysia",
        "value" : 16
      } , 
      { 
        "label": "India",
        "value" : 10
      } , 
      { 
        "label": "Philippines",
        "value" : 10
      } , 
      { 
        "label": "Canada",
        "value" : 10
      } , 
      { 
        "label": "Nigeria",
        "value" : 10
      }, 
      { 
        "label": "Netherlands",
        "value" : 10
      }, 
      { 
        "label": "Mexico",
        "value" : 10
      }, 
      { 
        "label": "South Africa",
        "value" : 10
      }, 
      { 
        "label": "Other",
        "value" : 10
      }
    ];
function showPieChart(colorsRange, elemId, dummyData3) {
	
	
	
	nv.addGraph(function() {
		var chart = nv.models.pieChart()
		.x(function(d) { return d.label })
		.y(function(d) { return d.value })
		.color(d3.scale.ordinal().range(colorsRange).range())
		.showLabels(true)    
		.labelThreshold(.05) 
		.labelType("percent") 
		.donut(true)
		.showLegend(false)      
		.donutRatio(0.35);
		
		d3.select("#"+elemId+" svg")
		.datum(dummyData3)
		.transition().duration(350)		
		.call(chart);		
		nv.utils.windowResize(chart.update);
		return chart;		
		
	});
}


function updatePieChart(id) {
	if(id=="audiencepie"){
		showPieChart(myColors1, 'audiencepie', dummyData1);
	}
	else if(id=="conversionpie"){
		showPieChart(myColors2, 'audiencepie', dummyData3);
	}
	else if(id=="uaudiencepie"){
		showPieChart(myColors3, 'audiencepie', dummyData3);
	}
	else if(id=="conversionratepie"){
		showPieChart(myColors4, 'audiencepie', dummyData3);
	}
}
showPieChart(myColors1, 'audiencepie', dummyData1);
function resizeset(){
	for (var i = 0; i < nv.graphs.length; i++) {
		nv.graphs[i].update();
	}
}

function updatecityPieChart(id) {
	if(id=="topcitiespie"){
		showPieChart(myColors1, 'topcitiespie', dummyData1);
	}
	else if(id=="citiesconversionpie"){
		showPieChart(myColors2, 'topcitiespie', dummyData3);
	}
	else if(id=="citiesuaudiencepie"){
		showPieChart(myColors3, 'topcitiespie', dummyData3);
	}
	else if(id=="citiesconversionratepie"){
		showPieChart(myColors4, 'topcitiespie', dummyData3);
	}
}
showPieChart(myColors1, 'topcitiespie', dummyData1);
function resizeset(){
	for (var i = 0; i < nv.graphs.length; i++) {
		nv.graphs[i].update();
	}
}
// ============= Technology Report Donut Chart  ==================

var h = 100;
var r = h/2;
var arc = d3.svg.arc().outerRadius(r);

var data = [
    {"label":"Android ", "value":16}, 
    {"label":"Macintosh", "value":16}, 
    {"label":"Windows", "value":16},
	{"label":"Linux", "value":16}, 
    {"label":"ios", "value":16}, 
    {"label":"Others", "value":16},  
];

var data1 = [
    {"label":"Google Chrome ", "value":16}, 
    {"label":"Mozilla Firefox", "value":16}, 
    {"label":"Edge", "value":16},
	{"label":"Safari", "value":16}, 
    {"label":"Opera", "value":16}, 
    {"label":"Others", "value":16},
];

var data2 = [
    {"label":"Desktop/Laptop ", "value":16}, 
    {"label":"Tablet", "value":16}, 
    {"label":"Mobile", "value":16},
	{"label":"Android Phone ", "value":16}, 
    {"label":"iPhone", "value":16}, 
    {"label":"iPad", "value":16}, 
];

var colors = [
    '#7ed647',
    '#c275ee',
    '#36d1ff',
	'#fdc100',
	'#ff7d96',
	'#cfd4d8'
]

var count = 0;
function setPiegraph(chartid, chartdata){
	nv.addGraph(function() {
		var chart = nv.models.pieChart()
		.x(function(d) { return d.label })
		.y(function(d) { return d.value })
		.color(colors)
		.showLabels(true)    
		.labelThreshold(.05) 
		.labelType("percent") 
		.donut(true)          
		.donutRatio(0.35);
		
		d3.select("#"+chartid+" svg")
		.datum(chartdata)
		.attr("fill", "red")
		.transition().duration(1200)		
		.call(chart);		
		
		return chart;		
		
	});
}

setPiegraph("os-chart", data);
setPiegraph("browserchart", data1);
setPiegraph("devices-chart", data2);


// ============= Single Segment Report Donut Chart  ==================

var h = 100;
var r = h/2;
var arc = d3.svg.arc().outerRadius(r);

var data5 = [
    {"label":"Segment ", "value":16}, 
    {"label":"Other", "value":16}, 
];


var colors5 = [
    '#64c529',
    '#ced4d8',
]

var count = 0;
function setPiegraph1(chartid1, chartdata1){
	nv.addGraph(function() {
		var chart = nv.models.pieChart()
		.x(function(d) { return d.label })
		.y(function(d) { return d.value })
		.color(colors5)
		.showLabels(true) 
		.showLegend(false)		
		.labelThreshold(.05) 
		.labelType("percent") 
		.donut(true)          
		.donutRatio(0.35);
		
		d3.select("#"+chartid1+" svg")
		.datum(chartdata1)
		.attr("fill", "red")
		.transition().duration(1200)		
		.call(chart);		
		
		return chart;		
		
	});
}


setPiegraph1("visitor-chart", data5);

// ============= Segment Report Donut Chart  ==================

var h = 100;
var r = h/2;
var arc = d3.svg.arc().outerRadius(r);

var data6 = [
    {"label":"Contacts in this group ", "value":16}, 
    {"label":"Other Contacts", "value":84}, 
];


var colors6 = [
    '#64c529',
    '#ced4d8',
]

var count = 0;
function setPiegraph2(chartid2, chartdata2){
	nv.addGraph(function() {
		var chart = nv.models.pieChart()
		.x(function(d) { return d.label })
		.y(function(d) { return d.value })
		.color(colors5)
		.showLabels(true) 
		.showLegend(true)		
		.labelThreshold(.05) 
		.labelType("percent") 
		.donut(true)          
		.donutRatio(0.35);
		
		d3.select("#"+chartid2+" svg")
		.datum(chartdata2)
		.attr("fill", "red")
		.transition().duration(1200)		
		.call(chart);		
		
		return chart;		
		
	});
}

setPiegraph2("segment-donut-chart", data6);
