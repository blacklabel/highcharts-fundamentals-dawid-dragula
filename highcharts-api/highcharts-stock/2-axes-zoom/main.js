function onMouseMove(yAxis, event) {
  if (yAxis.drag) {
    if (yAxis.center === undefined) {
      yAxis.dragOffset = (yAxis.max - yAxis.min) / 2;
      yAxis.center = yAxis.min + yAxis.dragOffset;
    }

    yAxis.dragOffset += event.movementY * yAxis.toValue(1) * 0.001;

    if (yAxis.dragOffset < 0) {
      yAxis.dragOffset = 0;
    }

    yAxis.setExtremes(yAxis.center - yAxis.dragOffset, yAxis.center + yAxis.dragOffset, false);
    yAxis.chart.redraw(false);
  }
}

function onMouseDown(axis) {
  axis.drag = true;
}

function onMouseUp(axis) {
  axis.drag = false;
}

Highcharts.getJSON('https://demo-live-data.highcharts.com/aapl-c.json', data => {
  Highcharts.stockChart('container', {
    chart: {
      events: {
        load: async function () {
          const chart = this;
                yAxis = chart.yAxis[0],
                xAxis = chart.xAxis[0],
                labelGroup = chart.yAxis[0].labelGroup,
                labelGroupBBox = labelGroup.getBBox();
          
          yAxis.axisRect = chart.renderer.rect().attr({ width: 30, height: yAxis.height, fill: 'transparent'}).css({ cursor: 'n-resize' }).add(labelGroup);
  
          yAxis.axisRect.on('mousedown', () => onMouseDown(yAxis));
          document.addEventListener('mousemove', event => onMouseMove(yAxis, event));
          document.addEventListener('mouseup', () => onMouseUp(yAxis));
        },
        render: async function () {
          const chart = this;
                yAxis = chart.yAxis[0],
                axisRect = yAxis.axisRect;
  
          axisRect.attr({ x: yAxis.width - 10, y: yAxis.top }).toFront();
        }
      }
    },
    yAxis: {
      startOnTick: false,
      endOnTick: false
    },
    series: [{
      data
    }]
  });
});
