const chart = Highcharts.chart('container', {
  chart: {
    type: 'line',
    events: {
      load: function () {
        this.circleCursor = this.renderer.circle();
        this.circleCursor.attributes = {
          r: 6, fill: 'blue', zIndex: 3,
          stroke: 'black', 'stroke-width': 1
        };
        this.circleCursor.attr(this.circleCursor.attributes).add();
      },
      click: function (event) {
        this.renderer.circle().attr({ ...this.circleCursor.attributes,
          'x': event.chartX, 'y': event.chartY
        }).add();
      }
    }
  },
  series: [{
    data: [3, 4, 6, 7, 4, 3, 5, 3, 2]
  }]
});

Highcharts.addEvent(chart.container, 'mousemove', function (event) {
  chart.circleCursor.attr({ x: event.chartX, y: event.chartY });
});