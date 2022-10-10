const data = Array.from({ length: 8 }, () => Math.round(Math.random() * 85) + 15);

Highcharts.chart('container', {
  chart: {
    type: 'bar',
    events: {
      render: function () {
        this.xAxis[0].labelGroup.translate(this.xAxis[0].labelGroup.getBBox().width, 0);
        this.yAxis.forEach(yAxis => {
          yAxis.axisTitle.translate(0, - yAxis.height - 30).attr({ 'font-size': 16 })
        });
      }
    },
    marginLeft: 10,
    marginRight: 10,
    spacingTop: 40
  },
  title: '',
  xAxis: {
    categories: Array.from({ length: 4 }, (_, i) => 'Dep' + (i + 1)),
    left: '50%',
    lineWidth: 0
  },
  yAxis: [{
      width: '45%',
      min: 0,
      max: 100,
      reversed: true,
      title: {
        text: "Manegrial Position",
        offset: 0
      }
    }, {
      left: '55%',
      width: '45%',
      min: 0,
      max: 100,
      offset: 0,
      title: {
        text: "Non Manegrial Position",
        offset: 0
      }
  }],
  series: [{
      data: Array.from({ length: 4 }, () => 100),
      color: '#A1B5C9',
      enableMouseTracking: false,
    }, {
      data: Array.from({ length: 4 }, () => 100),
      color: '#A1B5C9',
      enableMouseTracking: false,
      yAxis: 1
    }, {
        name: 'Manegrial Position',
        data: data.slice(0, 4),
        dataLabels: {
        enabled: true,
        align: 'left'
      }
    }, {
      name: 'Non Manegrial Position',
      data: data.slice(4, 8),
      yAxis: 1,
      dataLabels: {
        enabled: true,
        align: 'right'
      }
    }],
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      dataLabels: {
        format: '{y} %',
        inside: true
      },
      borderWidth: 0,
      color: 'red',
      grouping: false
    }
  }
});