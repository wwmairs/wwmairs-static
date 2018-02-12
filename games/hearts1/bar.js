var willMoons;
var willZeros;
var adamMoons;
var adamZeros;
var philMoons;
var philZeros;
var averyMoons;
var averyZeros;


$(function () { 
    $.get('players.txt', function(data) {
        data = JSON.parse(data);
        players = data.players
        for (var i = players.length - 1; i >= 0; i--) {
            switch(players[i].name) {
                case "Will":
                    willMoons = players[i].moons;
                    willZeros = players[i].zeros;
                case "Adam":
                    adamMoons = players[i].moons;
                    adamZeros = players[i].zeros;
                case "Phil":
                    philMoons = players[i].moons;
                    philZeros = players[i].zeros;
                case "Avery":
                    averyMoons = players[i].moons;
                    averyZeros = players[i].zeros;
            }
        }  
        makeChart();
    });
});

function makeChart() {
    var myChart = Highcharts.chart('container', {
        chart: {
            type: 'bar',
            backgroundColor: '#f2f2f2'
        },
        title: {
            text: 'Hearts'
        },
        xAxis: {
            categories: ['Will', 'Adam', 'Phil', 'Avery'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rounds'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' rounds'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 40,
            floating: true,
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            shadow: false
        },
        series: [{
            name: 'Moons',
            data: [willMoons, adamMoons, philMoons, averyMoons]
        }, {
            name: 'Zeros',
            data: [willZeros, adamZeros, philZeros, averyZeros]
        }]
    });
}