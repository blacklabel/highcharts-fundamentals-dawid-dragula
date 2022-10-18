function onMouseMove(axis, event) {
  if (axis.axisRect.drag) {
    const offset = event.movementY;
    //axis.setExtremes(axis.min - offset, axis.max + offset, false);
  }
}

function onMouseDown(axis) {
  axis.axisRect.drag = true;
}

function onMouseUp(axis) {
  axis.axisRect.drag = false;
}

Highcharts.getJSON('https://demo-live-data.highcharts.com/aapl-c.json', data => {
  Highcharts.stockChart('container', {
    chart: {
      events: {
        load: async function () {
          const chart = this;
                yAxis = chart.yAxis[0],
                labelGroup = chart.yAxis[0].labelGroup,
                labelGroupBBox = labelGroup.getBBox();
          
          yAxis.axisRect = chart.renderer.rect().attr({ width: 20, height: yAxis.height, fill: 'transparent'}).css({ cursor: 'n-resize' }).add(labelGroup);
  
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
    series: [{
      data
    }]
  });
});
