const data = Array.from({ length: 100 }, () => Math.round(Math.random() * 100));

Highcharts.chart('container', {
  chart: {
    type: 'line',
    zoomType: 'xy',
    events: {
      load: function () {
        this.customLabel = this.renderer.text().attr({ 'font-size': 13 }).add();
        this.maxPointLabels = [];
        this.xAxisPoints = [];
      },
      render: function () {
        const visiblePoints = this.series[0].points.filter(i => i.isInside == true),
              maxVisibleY = Math.max(...visiblePoints.map(i => i.y)),
              maxVisiblePoints = visiblePoints.filter(i => i.y == maxVisibleY);

        this.maxPointLabels.forEach(i => i.destroy());
        this.maxPointLabels.length = 0;

        this.xAxisPoints.forEach(i => i.destroy());
        this.xAxisPoints.length = 0;

        this.customLabel.attr({
          text: 'Visible points: ' + visiblePoints.length,
          x: this.plotLeft,
          y: 55 + this.plotHeight + this.plotTop
        });

        maxVisiblePoints.forEach(point => {
          this.maxPointLabels.push(
            this.renderer
              .text(point.y, point.plotX + this.plotLeft, point.plotY + this.plotTop - 10)
              .attr({
                'text-anchor': 'middle',
                'fill': 'red',
                'font-weight': 'bold',
                zIndex: 1
              }).add()
          );
          this.xAxisPoints.push(
            this.renderer
              .circle(point.plotX + this.plotLeft, this.plotTop + this.plotHeight, 4)
              .attr({ 'fill': 'red' }).add()
          );
        });
      }
    }
  },
  series: [{ data }],
});