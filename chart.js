var will = 0;
var adam;
var phil;
var avery;


$(function () { 
    $.get('dataPoints.txt', function(data) {
        data = JSON.parse(data);
        will = data.Will;
        adam = data.Adam;
        phil = data.Phil;
        avery = data.Avery;
        makeChart()
    });
    console.log(will);
});

function makeChart() {
    var myChart = Highcharts.chart('container', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Hearts'
        },
        xAxis: {
            title: {
                text: 'Rounds'
            }
        },
        yAxis: {
            title: {
                text: 'Points'
            },
            labels: {
                formatter: function() {
                    return this.value;
                }
            }
        },
        tooltip: {
            valueSuffix: ' points'
        },
        plotOptions:{
            spline: {
                lineWidth: 4,
                marker: {
                    enabled: false
                }
            }
        },
        series: [{
            name: 'Will',
            data: will
        }, {
            name: 'Adam',
            data: adam
        }, {
            name: 'Phil',
            data: phil
        }, {
            name: 'Avery',
            data: avery
        }]
    });
}