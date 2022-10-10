function randomArray(min, max) {
  return Array.from({ length: 6 }, () => Math.round(Math.random() * (max - min) + min));
}

Highcharts.chart('container', {
  chart: {
    type: 'column',
    events: {
      load: function () {
        this.series.forEach(series => {
          for (let i = 0; i < series.data.length - 1; i++) {
            series.data[i].customLine = this.renderer.path().attr({ 'stroke-width': 1, zIndex: 1 }).add();
          }
        });
      },
      render: function () {
        this.series.forEach(series => {
          for (let i = 0; i < series.data.length - 1; i++) {
            const data = series.data[i];
            const nextData = series.data[i + 1];

            data.customLine.attr({
              'd': ['M', data.shapeArgs.x + data.shapeArgs.width + this.plotLeft, data.plotY + this.plotTop + 2,
                    'L', nextData.shapeArgs.x + this.plotLeft, nextData.plotY + this.plotTop + 2, 'z'],
              'stroke': data.color,
            });

            if (series.visible) {
              data.customLine.show();
            } else {
              data.customLine.hide();
            }
          }
        });
      }
    }
  },
  series: [{
    data: randomArray(10, 16)
  }, {
    data: randomArray(4, 12)
  }],
  plotOptions: {
    column: {
      borderWidth: 0
    }
  }
});