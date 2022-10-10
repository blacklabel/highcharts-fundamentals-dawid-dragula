function randomArray(min, max) {
  return Array.from({ length: 6 }, () => Math.round(Math.random() * (max - min) + min));
}

Highcharts.chart('container', {
  chart: {
    type: 'column',
    events: {
      load: function () {

      },
      render: function () {

      }
    }
  },
  series: [{
    data: randomArray(10, 16)
  }, {
    data: randomArray(4, 12)
  }]
});