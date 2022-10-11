const genRandomData = () => Array.from({ length: 12 }, () => Math.round(Math.random() * 10));

Highcharts.chart('container', {
  chart: {
    type: 'column'
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: {
      rotation: -60,
      style: {
        fontSize: '14px'
      }
    }
  },
  yAxis: {
    max: 12
  },
  series: [{
    name: 'Tokyo',
    data: genRandomData()
  }, {
    name: 'New York',
    data: genRandomData()
  }, {
    name: 'London',
    data: genRandomData()
  }, {
    name: 'Berlin',
    data: genRandomData()
  }],
  plotOptions: {
    series: {
      point: {
        events: {
          mouseOver: function () {
            const xAxisTicks = this.series.xAxis.ticks;
            xAxisTicks[this.index].label.oldStyles = JSON.parse(JSON.stringify(xAxisTicks[this.index].label.styles));
            xAxisTicks[this.index].label.css({ 'fontSize': '18px', 'color': 'red' })
          },
          mouseOut: function () {
            const xAxisTicks = this.series.xAxis.ticks;
            xAxisTicks[this.index].label.css(xAxisTicks[this.index].label.oldStyles)
          }
        }
      }
    }
  }
});