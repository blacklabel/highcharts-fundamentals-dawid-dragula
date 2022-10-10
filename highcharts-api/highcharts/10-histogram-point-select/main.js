const data = [3, 4, 5, 3, 2, 3, 2, 3, 4, 5, 3, 6, 3, 2, 4, 5, 5, 6, 6, 1, 6, 6, 2, 1, 3, 5, 6];

Highcharts.chart('container', {
  xAxis: [{
    title: { text: 'Values' }
  }, {
    title: { text: 'Histogram' },
    opposite: true
  }],
  yAxis: [{
    title: { text: 'Values' }
  }, {
    title: { text: 'Histogram' },
    opposite: true
  }],
  series: [{
    type: 'histogram',
    xAxis: 1,
    yAxis: 1,
    baseSeries: 1,
    allowPointSelect: true,
    states: {
      inactive: {
          enabled: false
      }
    },
    point: {
      events: {
        select: function () {
          
        },
        unselect: function () {

        }
      }
    }
  }, {
    type: 'scatter',
    data
  }]
});