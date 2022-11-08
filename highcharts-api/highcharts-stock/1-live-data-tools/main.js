function genRandomData() {
  const unit = 86400000,
        startDate = 1602595800000;
  return Array.from({ length: 500 }, (_, i) => [startDate + i * unit, Math.round(Math.random() * 10000) / 100]);
}

const defaultButtons = ['indicators', 'separator', 'simpleShapes', 'lines', 'crookedLines',
                        'measure', 'advanced', 'toggleAnnotations', 'separator', 'verticalLabels',
                        'flags', 'separator', 'zoomChange', 'fullScreen', 'typeChange', 'separator',
                        'currentPriceIndicator', 'saveChart'],
      customButtons = {
        definitions: {
          changeDataGrouping: {
            items: ['groupingStart', 'groupingMiddle', 'groupingEnd'],
            groupingStart: {
              className: 'd-g-start'
            },
            groupingMiddle: {
              className: 'd-g-middle'
            },
            groupingEnd: {
              className: 'd-g-end'
            }
          },
          toggleLiveData: {
            className: 'toggle-live-data'
          }
        },
        navigation: {
          bindings: {
            toggleLiveData: {
              className: 'toggle-live-data',
              init: toggleLiveData
            },
            groupingStart: {
              className: 'd-g-start',
              init(button) {
                toggleDataGrouping(button, this, 'start');
              }
            },
            groupingMiddle: {
              className: 'd-g-middle',
              init(button) {
                toggleDataGrouping(button, this, 'middle');
              }
            },
            groupingEnd: {
              className: 'd-g-end',
              init(button) {
                toggleDataGrouping(button, this, 'end');
              }
            }
          }
        }
      };

function renderCustomLabels(chart, labels) {
  if (!labels) {
    return;
  }

  const renderer = chart.renderer,
        rangeSelector = chart.rangeSelector,
        buttonGroupBBox = rangeSelector.buttonGroup.getBBox();

  if (typeof rangeSelector.customLabels !== 'object') {
    rangeSelector.customLabels = {};
  }

  const customLabels = rangeSelector.customLabels,
        y = 26,
        space = 26;

  let xCursor = buttonGroupBBox.x + buttonGroupBBox.width + space;

  function renderLabel(id, text) {
    if (labels.includes(id)) {
      if (!customLabels[id]) {
        customLabels[id] = renderer.text().add(rangeSelector.group);
      }
  
      customLabels[id].attr({
        x: xCursor, y,
        text, 'font-size': 15
      });
  
      const bBox = customLabels[id].getBBox();
      xCursor += bBox.width + space;
    } else if (customLabels[id]) {
      customLabels[id].destroy();
      customLabels[id] = undefined;
    }
  }

  renderLabel('dataGrouping', `Data Grouping Anchor: middle,`);
  renderLabel('liveMode', 'Live Mode: Off');
}

function toggleDataGrouping(button, selection, toggleTo) {
  const chart = selection.chart;

  Highcharts.fireEvent(selection, 'deselectButton', { button });
  
  chart.series[0].update({
    dataGrouping: {
      anchor: toggleTo,
    }
  });
  
  chart.rangeSelector.customLabels.dataGrouping.attr({ text: `Data Grouping Anchor: ${toggleTo},` });
}

function toggleLiveData(button) {
  const chart = this.chart;

  Highcharts.fireEvent(this, 'deselectButton', { button });

  if (!chart.liveDataMode) {
    chart.liveDataMode = true;
    chart.liveDataInterval = setInterval(() => {
      const now = new Date();
      chart.series[0].addPoint([now.getTime(), Math.round(Math.random() * 10000) / 100]);
    }, 1000);
    chart.rangeSelector.customLabels.liveMode.attr({ text: `Live Mode: On` });
    return;
  }

  chart.liveDataMode = false;
  clearInterval(chart.liveDataInterval);
  chart.rangeSelector.customLabels.liveMode.attr({ text: `Live Mode: Off` });
}

const chartA = Highcharts.stockChart('container-a', {
  chart: {
    events: {
      load: function () {
        renderCustomLabels(this, ['liveMode']);
      }
    }
  },
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
      load: function () {
        const chart = this;
        
        renderCustomLabels(this, ['dataGrouping', 'liveMode']);
      }
    }
  },
  title: {
    text: 'Chart B'
  },
  series: [{
    data: genRandomData(),
    dataGrouping: {
      anchor: 'middle',
      forced: true
    }
  }],
  stockTools: {
    gui: {
      buttons: ['changeDataGrouping', 'toggleLiveData', ...defaultButtons],
      definitions: customButtons.definitions
    }
  },
  navigation: customButtons.navigation
});