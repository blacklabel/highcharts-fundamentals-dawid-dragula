function onMouseMove(yAxes, event) {
  yAxes.forEach(yAxis => {
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
  })
}

function onMouseDown(yAxis) {
  yAxis.drag = true;
}

function onMouseUp(yAxes) {
  yAxes.forEach(yAxis => yAxis.drag = false);
}

function onWheel(xAxis, event) {
  if (xAxis.canDrag) {
    let dragOffset = event.deltaY * xAxis.toValue(1) * 0.000001;
    const firstX = Math.min(...xAxis.series.map(s => s.data[0].x));

    if (xAxis.min + dragOffset < firstX) {
      dragOffset = firstX - xAxis.min;
    }

    xAxis.setExtremes(xAxis.min + dragOffset, xAxis.max, false);
    xAxis.chart.redraw(false);
  }
}

Highcharts.getJSON('https://demo-live-data.highcharts.com/aapl-c.json', data => {
  Highcharts.stockChart('container', {
    chart: {
      events: {
        load: async function () {
          const chart = this;
                yAxes = chart.yAxis,
                xAxis = chart.xAxis[0],
                labelGroup = chart.yAxis[0].labelGroup,
                labelGroupBBox = labelGroup.getBBox();
          
          yAxes.forEach(yAxis => {
            yAxis.axisRect = chart.renderer.rect().attr({ width: 30, height: yAxis.height, fill: 'transparent'}).css({ cursor: 'n-resize' }).add(labelGroup);
  
            yAxis.axisRect.on('mousedown', () => onMouseDown(yAxis));
            yAxis.axisRect.on('mouseover', () =>  { xAxis.canDrag = true });
            yAxis.axisRect.on('mouseout', () =>  { xAxis.canDrag = false });
          });

          document.addEventListener('mousemove', event => onMouseMove(yAxes, event));
          document.addEventListener('mouseup', () => onMouseUp(yAxes));
          document.addEventListener('wheel', event => onWheel(xAxis, event));
        },
        render: async function () {
          const chart = this,
                yAxes = chart.yAxis;
          
          yAxes.forEach(yAxis => {
            yAxis.axisRect.attr({ x: yAxis.width - 10, y: yAxis.top }).toFront();
          });
        }
      }
    },
    yAxis: [{
      startOnTick: false,
      endOnTick: false,
      height: '50%'
    }, {
      startOnTick: false,
      endOnTick: false,
      height: '50%',
      top: '50%'
    }],
    xAxis: [{
      startOnTick: false,
      endOnTick: false,
      height: '50%',
      top: '50%'
    }],
    series: [{
      data
    }, {
      data: data.slice(data.length / 5, data.length),
      yAxis: 1
    }]
  });
});
