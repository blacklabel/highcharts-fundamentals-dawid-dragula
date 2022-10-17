function genRandomData() {
  const unit = 86400000;
  const startDate = 1602595800000;
  return Array.from({ length: 500 }, (_, i) => [startDate + i * unit, Math.round(Math.random() * 10000) / 100]);
}

const defaultButtons = ['indicators', 'separator', 'simpleShapes', 'lines', 'crookedLines',
                        'measure', 'advanced', 'toggleAnnotations', 'separator', 'verticalLabels',
                        'flags', 'separator', 'zoomChange', 'fullScreen', 'typeChange', 'separator',
                        'currentPriceIndicator', 'saveChart'],
      dataGroupingAnchors = ['start', 'middle', 'end'],
      customButtons = {
        definitions: {
          changeDataGrouping: {
            className: 'change-data-grouping'
          },
          toggleLiveData: {
            className: 'toggle-live-data'
          }
        },
        navigation: {
          bindings: {
            changeDataGrouping: {
              className: 'change-data-grouping',
              init: function() {
                console.log(this);
              }
            },
            toggleLiveData: {
              className: 'toggle-live-data',
              init: function() {
                console.log('toggle');
              }
            }
          }
        }
      };

const chartA = Highcharts.stockChart('container-a', {
  title: {
    text: 'Chart A'
  },
  yAxis: [{
    height: '33.3%'
  }, {
    height: '33.3%',
    top: '33.3%'
  }, {
    height: '33.3%',
    top: '66.6%'
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
    yAxis: 2,
    dataGrouping: {
      anchor: 'end',
      forced: true
    }
  }],
  stockTools: {
    gui: {
      buttons: ['toggleLiveData', ...defaultButtons],
      definitions: customButtons.definitions
    }
  },
  navigation: customButtons.navigation
});

const chartB = Highcharts.stockChart('container-b', {
  chart: {
    events: {
      render: function () {
        console.log(this);
        //this.groupDataLabel = this.renderer.text()
      }
    }
  },
  title: {
    text: 'Chart B'
  },
  series: [{
    data: genRandomData()
  }],
  stockTools: {
    gui: {
      buttons: ['changeDataGrouping', 'toggleLiveData', ...defaultButtons],
      definitions: customButtons.definitions
    }
  },
  navigation: customButtons.navigation
});