const data = Array.from({ length: 100 }, () => Math.round(Math.random() * 100));

Highcharts.chart('container', {
  chart: {
    type: 'line',
    zoomType: 'xy',
    events: {
      load: function () {
        const chart = this;

        chart.customLabel = chart.renderer.text().attr({ 'font-size': 13 }).add();
        chart.maxPointLabels = [];
        chart.xAxisPoints = [];
      },
      render: function () {
        const chart = this,
              visiblePoints = chart.series[0].points.filter(i => i.isInside == true),
              maxVisibleY = Math.max(...visiblePoints.map(i => i.y)),
              maxVisiblePoints = visiblePoints.filter(i => i.y == maxVisibleY);

        chart.maxPointLabels.forEach(i => i.destroy());
        chart.maxPointLabels.length = 0;

        chart.xAxisPoints.forEach(i => i.destroy());
        chart.xAxisPoints.length = 0;

        chart.customLabel.attr({
          text: 'Visible points: ' + visiblePoints.length,
          x: chart.plotLeft,
          y: 55 + chart.plotHeight + chart.plotTop
        });

        maxVisiblePoints.forEach(point => {
          chart.maxPointLabels.push(
            chart.renderer
              .text(point.y, point.plotX + chart.plotLeft, point.plotY + chart.plotTop - 10)
              .attr({
                'text-anchor': 'middle',
                'fill': 'red',
                'font-weight': 'bold',
                zIndex: 1
              }).add()
          );
          chart.xAxisPoints.push(
            chart.renderer
              .circle(point.plotX + chart.plotLeft, chart.plotTop + chart.plotHeight, 4)
              .attr({ 'fill': 'red', zIndex: 2 }).add()
          );
        });
      }
    }
  },
  series: [{ data }],
});