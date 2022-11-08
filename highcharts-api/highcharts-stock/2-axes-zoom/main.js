function centerZoom(axis, strength) {
  let zoomOffset = (axis.max - axis.min) / 2;
  let center = axis.min + zoomOffset;

  zoomOffset += strength * axis.toValue(1);

  if (zoomOffset < 0) {
    zoomOffset = 0;
  }

  axis.setExtremes(center - zoomOffset, center + zoomOffset, false);
  axis.chart.redraw(false);
}

function onMouseMove(yAxes, event) {
  yAxes.forEach(yAxis => {
    if (yAxis.drag) {
      centerZoom(yAxis, event.movementY * 0.001);
    }
  })
}

function onMouseUp(yAxes) {
  yAxes.forEach(yAxis => yAxis.drag = false);
}

function onWheel(xAxis, event) {
  if (xAxis.scaleMode === 'max') {
    let zoomOffset = event.deltaY * xAxis.toValue(1) * 0.000001;
    const firstX = Math.min(...xAxis.series.map(s => s.data[0].x));

    if (xAxis.min + zoomOffset < firstX) {
      zoomOffset = firstX - xAxis.min;
    }

    xAxis.setExtremes(xAxis.min + zoomOffset, xAxis.max, false);
    xAxis.chart.redraw(false);
  } else if (xAxis.scaleMode === 'center') {
    centerZoom(xAxis, -event.deltaY * 0.000002);
  }
}

Highcharts.getJSON('https://demo-live-data.highcharts.com/aapl-c.json', data => {
  Highcharts.stockChart('container', {
    chart: {
      events: {
        load: function () {
          const chart = this;
                yAxes = chart.yAxis.filter(p => p.userOptions.id !== 'navigator-y-axis'),
                xAxis = chart.xAxis[0];

          yAxes.forEach(yAxis => {
            yAxis.axisRect = chart.renderer.rect().attr({ width: 30, height: yAxis.height, fill: 'transparent'}).css({ cursor: 'n-resize' }).add();
  
            yAxis.axisRect.on('mousedown', () => { yAxis.drag = true; });
            yAxis.axisRect.on('mouseover', () =>  { xAxis.scaleMode = 'max'; });
            yAxis.axisRect.on('mouseout', () =>  { xAxis.scaleMode = null; });
          });

          document.addEventListener('mousemove', event => onMouseMove(yAxes, event));
          document.addEventListener('mouseup', () => onMouseUp(yAxes));
          document.addEventListener('wheel', event => onWheel(xAxis, event));


          xAxis.axisRect = chart.renderer.rect().attr({ fill: 'transparent' }).css({ cursor: 'w-resize' }).add(xAxis.labelGroup);

          yAxes.forEach(yAxis => {
            Highcharts.addEvent(yAxis.labelGroup.element, 'mouseover', () => { xAxis.scaleMode = 'center' });
            Highcharts.addEvent(yAxis.labelGroup.element, 'mouseout', () => { xAxis.scaleMode = 'center' });
          });
          xAxis.axisRect.on('mouseover', () => { xAxis.scaleMode = 'max' });
          xAxis.axisRect.on('mouseout', () => { xAxis.scaleMode = null });
        },
        render: function () {
          const chart = this,
                yAxes = chart.yAxis.filter(p => p.userOptions.id !== 'navigator-y-axis');
          
          yAxes.forEach(yAxis => {
            yAxis.axisRect.attr({ x: yAxis.width - 10, y: yAxis.top });
          });
          xAxis.axisRect.attr(xAxis.labelGroup.getBBox()).toFront();
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
