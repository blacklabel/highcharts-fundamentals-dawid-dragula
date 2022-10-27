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

function findOppositePoint(point) {
  return point.series.chart.series[Number(!point.series.index)].points[point.index];
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
                  oppositePoint = findOppositePoint(point);


            if (!chart.tooltip2) {
              chart.tooltip2 = new Highcharts.Tooltip(chart, chart.tooltip.options);
            }

            oppositePoint.setState('hover');
            chart.tooltip2.refresh(oppositePoint);
          },
          mouseOut: function () {
            this.series.chart.tooltip2.hide();
          },
          legendItemClick: function () {
            const point = this,
                  oppositePoint = findOppositePoint(point);
            
            oppositePoint.setVisible(!point.visible);
          }
        }
      },
      states: {
        hover: {
          brightness: 0
        },
        inactive: {
          enabled: false
        }
      }
    }
  }
});