const data = Array.from(
  { length: 16 },
  () => Math.round(Math.random() * 15) * 5
);

Highcharts.chart('container', {
  chart: {
    type: 'bar',
    spacingTop: 50,
    events: {
      load: function () {
        this.customLabels = [];
        this.customLabels.push(
          this.renderer.text().attr({
              text: 'Issue',
              'font-weight': 'bold',
              'text-anchor': 'end',
              x: this.plotLeft - 12,
              y: this.spacing[0] - 16
            }).add(),
          this.renderer.text().attr({
              text: 'Record Count',
              'font-weight': 'bold',
              x: this.plotLeft,
              y: this.spacing[0] - 16
            }).add(),
          this.renderer.text().attr({
              text: 'Action',
              'font-weight': 'bold',
              x: this.yAxis[0].toPixels(300),
              y: this.spacing[0] - 16
            }).add()
        );
        
        Object.values(this.xAxis[0].ticks).forEach(tick => {
          if (tick.pos > -1) {
            tick.button = this.renderer.button('How to fix',
            null, this.xAxis[0].toPixels(tick.pos + 0.45, true),
            () => alert(`click ${tick.pos}`),
            { 'stroke': 'blue', 'stroke-width': 3 }
          ).add();
          }
        });
      },
      render: function () {
        this.customLabels[2].attr({ x: this.plotSizeY - this.xAxis[0].ticks[0].button.getBBox().x });

        Object.values(this.xAxis[0].ticks).forEach(tick => {
          if (tick.pos > -1) {
            tick.button.attr({ x: this.plotSizeY - tick.button.getBBox().x });
          }

          tick.gridLine.pathArray[0][1] = this.spacingBox.x;
          tick.gridLine.attr({
            'd': [...tick.gridLine.pathArray]
          });
        });
      }
    },
  },
  title: {
    text: ''
  },
  xAxis: {
    categories: ['Data', 'Emails', 'Duplicates', 'Support'],
    gridLineWidth: 1,
    lineWidth: 0
  },
  yAxis: {
    max: 310,
    title: {
      text: 'Amount'
    },
    stackLabels: {
      enabled: true,
      formatter: function () {
        return `${this.total} K`;
      }
    },
    gridLineWidth: 0
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      stacking: 'normal'
    },
  },
  series: [
    {
      data: data.slice(0, 4)
    },
    {
      data: data.slice(4, 8)
    },
    {
      data: data.slice(8, 12)
    },
    {
      data: data.slice(12, 16)
    }
  ]
});
