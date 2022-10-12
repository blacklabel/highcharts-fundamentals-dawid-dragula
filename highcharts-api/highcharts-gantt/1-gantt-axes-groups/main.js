Highcharts.ganttChart('container', {
    xAxis: [{
        visible: false
    }, {
        labels: {
            format: '{value:%A, %d %b, %Y}'
        },
        tickInterval: 432000000
    }],
    yAxis: {
        categories: ['Main', 'First', 'Second']
    },
    series: [{
        name: 'Project 1',
        data: [{
            y: 0,
            pointWidth: 0
        }, {
            y: 1,
            start: 1560902400000,
            end: 1561075200000,
        }, {
            y: 2,
            start: 1560902400000,
            end: 1561075200000
        }, {
            y: 2,
            start: 1561507200000,
            end: 1561680000000
        }]
    }]

});
