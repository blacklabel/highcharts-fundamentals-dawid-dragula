const series = Array.from({ length: 50 }, () => ({
  data: Array.from({ length: 5 }, () => Math.round(Math.random() * 50 + 50))
}));

Highcharts.chart('container', {
  chart: {
    type: 'column',
  },
  title: {
    text: ''
  },
  legend: {
    enabled: false
  },
  xAxis: {
    categories: Array.from({ length: 5 }, (_, i) => `BANK ${i + 1}`)
  },
  yAxis: {
    max: 125,
    title: {
      text: ''
    }
  },
  series,
  plotOptions: {
    series: {
      borderWidth: 0,
      pointPadding: 0,
      color: 'red'
    }
  }
});