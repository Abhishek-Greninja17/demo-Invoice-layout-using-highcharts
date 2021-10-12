 //cash collected by aging bucket
 var data = crossfilter(data);
 var bucketdim = data.dimension(d => d.aging_bucket);
 var amtGroup1 = bucketdim.group().reduceSum(d => d.collected_amount);

 //cash collected by activity 
 var activitydim = data.dimension(d => d.type);
 var amtGroup2 = activitydim.group().reduceSum(d => d.collected_amount);

 //top collectors
 var analystdim = data.dimension(d => d.analyst_name);
 var amtGroup3 = analystdim.group().reduceSum(d => d.collected_amount);

//top 10 customer
var custdim = data.dimension(d => d.customer_name);
var amtGroup4 = custdim.group().reduceSum(d => d.collected_amount);

function prepareDataForHighcharts(groups) {
    var categories = [];
    var data = [];
    var gdata = groups.top(Infinity);
    gdata.forEach(d => {
        categories.push(d.key);
        data.push(d.value);
    });
    return {
        categories: categories,
        data: data
    }
}
function prepareDataForHighcharts1(groups) {
    var categories = [];
    var data = [];
    var gdata = groups.top(10);
    gdata.forEach(d => {
        categories.push(d.key);
        data.push(d.value);
    });
    return {
        categories: categories,
        data: data
    }
}
var tempObject1 = prepareDataForHighcharts(amtGroup1);
var tempObject2 = prepareDataForHighcharts(amtGroup2);
var tempObject3 = prepareDataForHighcharts(amtGroup3);
var tempObject4 = prepareDataForHighcharts1(amtGroup4);

var options1 = {
    chart: {
        renderTo: 'aging',
        type: 'column'
    },
    setOptions: {
        colors: ['#15aff0']
    },
    title: {
        text: 'Cash Collected by Aging Bucket'
    },
    xAxis: {
        type: 'aging bucket type',
        categories: tempObject1.categories,
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        title: {
            text: 'Collected Amount'
        }
    },
    plotOptions: {
        series: {
            point: {
                events: {
                    click: function () {
                        this.select(null, true);
                        var selectedPoints = this.series.chart.getSelectedPoints();
                        var filteredPoints = [];
                        for (let index = 0; index < selectedPoints.length; index++) {
                            filteredPoints.push(selectedPoints[index].category);
                        }
                        function multivalue_filter(values) {
                            return function (v) {
                                return values.indexOf(v) !== -1;
                            }
                        }

                        if (filteredPoints.length > 0) {
                            bucketdim.filterFunction(multivalue_filter(filteredPoints));
                        } else {
                            bucketdim.filterAll();
                        }
                        var newData1 = prepareDataForHighcharts(amtGroup2);
                        var newData2 = prepareDataForHighcharts(amtGroup3);
                        var newData3 = prepareDataForHighcharts1(amtGroup4);

                        chart2.xAxis[0].setCategories(newData1.categories);
                        chart2.series[0].setData(newData1.data);

                        chart3.xAxis[0].setCategories(newData2.categories);
                        chart3.series[0].setData(newData2.data);

                        chart4.xAxis[0].setCategories(newData3.categories);
                        chart4.series[0].setData(newData3.data);

                    }
                }
            }
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>${point.y:.2f}</b><br/>',
        valueSuffix: 'M',
        shared: true
    },
    series: [{
        name: 'Collected',
        data: tempObject1.data,
    }]
}
var options2 = {
    chart: {
        renderTo: 'cash',
        type: 'column'
    },
    title: {
        text: 'Cash Collected by Activity'
    },
    xAxis: {
        type: 'activity type',
        categories: tempObject2.categories,
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        title: {
            text: 'Collected Amount'
        }
    },
    plotOptions: {
        series: {
            point: {
                events: {
                    click: function () {
                        this.select(null, true);
                        var selectedPoints = this.series.chart.getSelectedPoints();
                        var filteredPoints = [];
                        for (let index = 0; index < selectedPoints.length; index++) {
                            filteredPoints.push(selectedPoints[index].category);
                        }
                        function multivalue_filter(values) {
                            return function (v) {
                                return values.indexOf(v) !== -1;
                            }
                        }

                        if (filteredPoints.length > 0) {
                            activitydim.filterFunction(multivalue_filter(filteredPoints));
                        } else {
                            activitydim.filterAll();
                        }
                        var newData1 = prepareDataForHighcharts(amtGroup1);
                        var newData2 = prepareDataForHighcharts(amtGroup3);
                        var newData3 = prepareDataForHighcharts1(amtGroup4);

                        chart1.xAxis[0].setCategories(newData1.categories);
                        chart1.series[0].setData(newData1.data);

                        chart3.xAxis[0].setCategories(newData2.categories);
                        chart3.series[0].setData(newData2.data);

                        chart4.xAxis[0].setCategories(newData3.categories);
                        chart4.series[0].setData(newData3.data);

                    }
                }
            }
        }
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Collected',
        data: [{
            y: tempObject2.data[0],
            color: '#f75454'
        },
        {
            y: tempObject2.data[1],
            colors: '#8ed162'
        }]
    }]
}

var options3 = {
    chart: {
        renderTo: 'topc',
        type: 'bar'
    },
    colors: ['#15aff0'],
    title: {
        text: 'Top Collectors'
    },
    xAxis: {
        type: 'activity type',
        categories: tempObject3.categories,
        labels: {
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        title: {
            text: 'Collected Amount'
        }
    },
    plotOptions: {
        series: {
            point: {
                events: {
                    click: function () {
                        this.select(null, true);
                        var selectedPoints = this.series.chart.getSelectedPoints();
                        var filteredPoints = [];
                        for (let index = 0; index < selectedPoints.length; index++) {
                            filteredPoints.push(selectedPoints[index].category);
                        }
                        function multivalue_filter(values) {
                            return function (v) {
                                return values.indexOf(v) !== -1;
                            }
                        }

                        if (filteredPoints.length > 0) {
                            analystdim.filterFunction(multivalue_filter(filteredPoints));
                        } else {
                            analystdim.filterAll();
                        }
                        var newData1 = prepareDataForHighcharts(amtGroup1);
                        var newData2 = prepareDataForHighcharts(amtGroup2);
                        var newData3 = prepareDataForHighcharts1(amtGroup4);

                        chart1.xAxis[0].setCategories(newData1.categories);
                        chart1.series[0].setData(newData1.data);

                        chart2.xAxis[0].setCategories(newData2.categories);
                        chart2.series[0].setData(newData2.data);

                        chart4.xAxis[0].setCategories(newData3.categories);
                        chart4.series[0].setData(newData3.data);

                    }
                }
            }
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>${point.y:.2f}</b><br/>',
        valueSuffix: 'M',
        shared: true
    },
    series: [{
        name: 'Collected',
        data: tempObject3.data,
    }]
}

var options4 = {
    chart: {
        renderTo: 'top10',
        type: 'bar'
    },
    colors: ['#fc7500'],
    title: {
        text: 'Top 10 Customers'
    },
    xAxis: {
        type: 'activity type',
        categories: tempObject4.categories,
        labels: {
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        title: {
            text: 'Collected Amount'
        }
    },
    plotOptions: {
        series: {
            point: {
                events: {
                    click: function () {
                        this.select(null, true);
                        var selectedPoints = this.series.chart.getSelectedPoints();
                        var filteredPoints = [];
                        for (let index = 0; index < selectedPoints.length; index++) {
                            filteredPoints.push(selectedPoints[index].category);
                        }
                        function multivalue_filter(values) {
                            return function (v) {
                                return values.indexOf(v) !== -1;
                            }
                        }

                        if (filteredPoints.length > 0) {
                            custdim.filterFunction(multivalue_filter(filteredPoints));
                        } else {
                            custdim.filterAll();
                        }
                        var newData1 = prepareDataForHighcharts(amtGroup1);
                        var newData2 = prepareDataForHighcharts(amtGroup2);
                        var newData3 = prepareDataForHighcharts(amtGroup3);

                        chart1.xAxis[0].setCategories(newData1.categories);
                        chart1.series[0].setData(newData1.data);

                        chart2.xAxis[0].setCategories(newData2.categories);
                        chart2.series[0].setData(newData2.data);

                        chart3.xAxis[0].setCategories(newData3.categories);
                        chart3.series[0].setData(newData3.data);


                    }
                }
            }
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>${point.y:.2f}</b><br/>',
        valueSuffix: 'M',
        shared: true
    },
    series: [{
        name: 'Collected',
        data: tempObject4.data,
    }]
}

var chart1 = new Highcharts.chart(options1);
var chart2 = new Highcharts.chart(options2);
var chart3 = new Highcharts.chart(options3);
var chart4 = new Highcharts.chart(options4);