function genRandomData() {
  const unit = 86400000;
  const startDate = 1602595800000;
  return Array.from({ length: 500 }, (_, i) => [startDate + i * unit, Math.round(Math.random() * 10000) / 100]);
}

const chartA = Highcharts.stockChart('container-a', {
  title: {
    text: 'Chart A'
  },
  yAxis: [{
    height: '50%'
  }, {
    height: '50%',
    top: '50%'
  }],
  series: [{
    id: 'main',
    data: genRandomData()
  }, {
    type: 'sma',
    linkedTo: 'main',
    params: {
      period: 30
    },
    yAxis: 1,
    dataGrouping: {
      anchor: 'middle',
      forced: true
    }
  }, {
    type: 'ema',
    linkedTo: 'main',
    params: {
      period: 30
    },
    yAxis: 1,
    dataGrouping: {
      anchor: 'end',
      forced: true
    }
  }]
});

const chartB = Highcharts.stockChart('container-b', {
  title: {
    text: 'Chart B'
  },
  series: [{
    data: genRandomData()
  }],
  stockTools: {
    gui: {
      buttons: ['customButton'],
      definitions: {
        customButton: {
          className: 'custom-btn',
        }
      }
    }
  },
  navigation: {
    bindings: {
      customButton: {
        className: 'custom-btn',
        init() {
          console.log(this);
        }
      }
    }
  }
});