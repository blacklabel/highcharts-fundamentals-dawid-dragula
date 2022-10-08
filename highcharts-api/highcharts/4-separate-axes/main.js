const data = Array.from({ length: 8 }, () => Math.round(Math.random() * 85) + 15);

Highcharts.chart('container', {
  chart: {
    type: 'bar',
    events: {
      load: function() {
        this.yAxis.forEach(yAxis => {
          Object.values(this.xAxis[0].ticks).forEach(tick => {
            if (tick.pos > -1) {
              if (tick.customBackground === undefined) {
                tick.customBackground = [];
              }
              tick.customBackground[yAxis.userOptions.index] = this.renderer.rect().attr({
                fill: '#A1B5C9',
                zIndex: 1.1
              }).add();
            }
          });
        });
      },
      render: function () {
        this.xAxis[0].labelGroup.translate(this.xAxis[0].labelGroup.getBBox().width, 0);
        this.yAxis.forEach(yAxis => {
          yAxis.axisTitle.translate(0, - yAxis.height - 30).attr({ 'font-size': 16 })
          Object.values(this.xAxis[0].ticks).forEach(tick => {
            if (tick.pos > -1) {
              const height = yAxis.series[0].data[tick.pos].shapeArgs.width,
                    tickY = tick.label.xy.y - height / 2 - tick.label.getBBox().height / 4,
                    yAxisX = yAxis.gridGroup.getBBox();

              tick.customBackground[yAxis.userOptions.index].attr({
                x: yAxisX.x,
                y: tickY,
                width: yAxisX.width,
                height: height
              });
            }
          });
        });
      }
    },
    marginLeft: 10,
    marginRight: 10,
    spacingTop: 40
  },
  title: '',
  xAxis: {
    categories: Array.from({ length: 4 }, (o, i) => 'Dep' + (i + 1)),
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
      name: 'Manegrial Position',
      data: data.slice(0, 4),
      dataLabels: {
        align: 'left'
      }
    }, {
      name: 'Non Manegrial Position',
      data: data.slice(4, 8),
      yAxis: 1,
      dataLabels: {
        align: 'right'
      }
  }],
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        format: '{y} %',
        inside: true
      },
      color: 'red'
    }
  }
});