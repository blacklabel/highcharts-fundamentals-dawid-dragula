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
        const chart = this,
              customLabelsData = ['Issue', 'Record Count', 'Action'];

        chart.customLabels = [];
        customLabelsData.forEach(text => {
          chart.customLabels.push(chart.renderer.text().attr({
            text, 'font-weight': 'bold', y: chart.spacing[0] - 16
          }).add());
        });

        chart.customLabels[0].attr({ x: chart.plotLeft - 12, 'text-anchor': 'end' });
        chart.customLabels[1].attr({ x: chart.plotLeft });
        chart.customLabels[2].attr({ x: chart.yAxis[0].toPixels(300), y: chart.spacing[0] - 16 })
        
        Object.values(chart.xAxis[0].ticks).forEach(tick => {
          if (tick.pos > -1) {
            tick.button = chart.renderer.button('How to fix',
              null, chart.xAxis[0].toPixels(tick.pos + 0.45, true),
              () => alert(`click ${tick.pos}`),
              { 'stroke': 'blue', 'stroke-width': 3 }
            ).add();
          }
        });
      },
      render: function () {
        const chart = this,
              firstButtonBBox = chart.xAxis[0].ticks[0].button.getBBox();

        chart.customLabels[2].attr({ x: chart.plotSizeY - firstButtonBBox.x });

        Object.values(chart.xAxis[0].ticks).forEach(tick => {
          if (tick.pos > -1) {
            const buttonBBox = tick.button.getBBox();
            tick.button.attr({ x: chart.plotSizeY - buttonBBox.x });
          }

          tick.gridLine.pathArray[0][1] = chart.spacingBox.x;
          tick.gridLine.attr({
            'd': tick.gridLine.pathArray
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
      format: '{total} K'
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
