const data = Array.from({ length: 9 }, () => Math.round(Math.random() * 10)),
      dataMax = Math.max(...data);

Highcharts.chart('container', {
  chart: {
    polar: true,
    type: 'column',
    events: {
      render: function () {
        const chart = this;

        if (!chart.customCircle) {
          chart.customCircle = chart.renderer.circle().attr({
            stroke: 'blue',
            'stroke-width': 3,
            fill: 'none',
          }).add();
  
          chart.customCircle.value = Math.random();
        }

        chart.customCircle.attr({
          cx: chart.yAxis[0].center[0] + chart.plotLeft,
          cy: chart.yAxis[0].center[1] + chart.plotTop,
          r: chart.yAxis[0].toPixels(chart.customCircle.value * chart.yAxis[0].dataMax * 2, true)
        });
      }
    }
  },
  title: {
    text: ''
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar']
  },
  yAxis: {
    max: dataMax * 2,
    tickInterval: (dataMax * 2) / 5,
    plotLines: [
      {
        dashStyle: 'dash',
        width: 3,
        color: '#2a0',
        value: dataMax * 1.5
      },
      {
        width: 3,
        color: 'red',
        value: dataMax * Math.random() * 2
      }
    ],
  },
  series: [
    {
      name: 'Tokyo',
      data: data.slice(0, 3)
    },
    {
      name: 'New York',
      data: data.slice(3, 6)
    },
    {
      name: 'London',
      data: data.slice(6, 9)
    },
  ],
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        formatter: function () {
          return this.series.yAxis.dataMax == this.y ? 'max' : '';
        }
      }
    }
  }
});
