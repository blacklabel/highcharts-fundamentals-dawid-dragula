const data = [{
  name: 'Commerce', y: 74.3,
}, {
  name: 'Engineering', y: 32.3
}, {
  name: 'Financial Services', y: 18.8
}, {
  name: 'Logistics, Aviation & Shipping', y: 5.5
}, {
  name: 'Seafood & Marine', y: 9.2
}, {
  name: 'Corporate Services & others', y: 1.2
}];

function findOppositeSeries(series) {
  return series.chart.series[Number(!series.index)];
}

Highcharts.chart('container', {
  chart: {
    type: 'pie'
  },
  tooltip: {
    followPointer: false
  },
  series: [{
    data,
    center: ['30%'],
    showInLegend: true
  }, {
    data,
    center: ['70%']
  }],
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: false
      },
      point: {
        events: {
          mouseOver: function () {
            const point = this,
                  chart = point.series.chart,
                  oppositeSeries = findOppositeSeries(point.series);

            oppositeSeries.points[point.index].setState('hover');

            if (!chart.tooltip2) {
              chart.tooltip2 = new Highcharts.Tooltip(chart, chart.tooltip.options);
            }

            chart.tooltip2.refresh(oppositeSeries.data[point.index]);
          },
          mouseOut: function () {
            this.series.chart.tooltip2.hide();
          },
          legendItemClick: function () {
            const point = this,
                  oppositeSeries = findOppositeSeries(point.series);
            
            oppositeSeries.points[point.index].setVisible(!point.visible);
          }
        }
      }
    }
  }
});