const data = Array.from({ length: 100 }, () => Math.round(Math.random() * 100));

Highcharts.chart('container', {
  chart: {
    type: 'line',
    zoomType: 'xy',
    events: {
      load: function () {
        this.customLabel = this.renderer.text().attr({ 'font-size': 14 }).add();
      },
      render: function () {
        const visiblePoints = this.series[0].points.filter(i => i.isInside == true);

        this.customLabel.attr({
          text: 'Visible points: ' + visiblePoints.length,
          x: this.plotLeft,
          y: 55 + this.plotHeight + this.plotTop
        });
      }
    }
  },
  series: [{ data }]
});