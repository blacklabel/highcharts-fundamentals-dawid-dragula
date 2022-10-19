const gradientColor = (color) => {
  return {
    radialGradient: {
        cx: 0.4,
        cy: 0.3,
        r: 0.5
    },
    stops: [
        [0, 'white'],
        [1, color]
    ]
  }
}

function frame(chart, t) {
  const earth = chart.series[0].data[1],
        moon = chart.series[0].data[2],
        
        eX = 5 + Math.cos(t / 16) * 2,
        eY = 5,
        eZ = 5 + Math.sin(t / 16) * 2,
        mX = eX + Math.cos(t / 5) * 0.85,
        mY = 5,
        mZ = eZ + Math.sin(t / 5) * 0.85;

  earth.update([eX, eY, eZ], false);
  moon.update([mX, mY, mZ], false);

  chart.redraw(false);
}

Highcharts.chart('solar-system', {
  chart: {
    type: 'scatter3d',
    backgroundColor: 'black',
    options3d: {
      enabled: true,
      alpha: 6,
      beta: 65,
      depth: 400,
      viewDistance: 5,
      fitToPlot: false,
    },
    events: {
      load: function () {
        let tick = 0;
        console.log()
        setInterval(() => {
          frame(this, tick);
          tick++;
        }, 40);
      }
    }
  },
  title: null,
  plotOptions: {
    scatter: {
      width: 10,
      height: 10,
      depth: 10
    }
  },
  yAxis: { min: 0, max: 10, title: null },
  xAxis: { min: 0, max: 10, gridLineWidth: 1 },
  zAxis: { min: 0, max: 10, showFirstLabel: false },
  legend: { enabled: false },
  tooltip: { enabled: false },
  series: [{
    name: 'Solar System',
    animation: {
      duration: 10
    },
    data: [{
      name: 'sun',
      x: 5, y: 5, z: 5,
      color: '#dddd33',
      marker: { radius: 20, symbol: 'circle', fillColor: gradientColor('yellow') }
    }, {
      name: 'earth',
      x: 5, y: 5, z: 5,
      color: '#3333dd',
      marker: { radius: 14, symbol: 'circle', fillColor: gradientColor('blue') }
    }, {
      name: 'moon',
      x: 5, y: 5, z: 5,
      color: '#666666',
      marker: { radius: 7, symbol: 'circle', fillColor: gradientColor('gray') }
    }]
  }],
  plotOptions: {
    series: {
      states: {
        inactive: {
          enabled: false
        },
        hover: {
          enabled: false
        }
      },
      planeProjection: {
        enabled: true,
        byPoint: true
      }
    }
  }
});

console.log(Highcharts);