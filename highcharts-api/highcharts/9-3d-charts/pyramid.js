Highcharts.chart('pyramid', {
  chart: {
    options3d: {
      enabled: true,
      alpha: 4
    },
    height: 725
  },
  title: {
    text: 'Highcharts Funnel/pyramid3D Chart'
  },
  series: [{
    type: 'funnel3d',
    data: [40, 10, 4, 2, 2],
    height: '50%',
    center: ['50%', '75%']
  }, {
    type: 'pyramid3d',
    data: [40, 10, 4, 2, 2],
    height: '50%',
    center: ['50%', '25%']
  }],
  plotOptions: {
    series: {
      states: {
        inactive: {
          enabled: false
        },
        hover: {
          enabled: false
        }
      }
    }
  }
});