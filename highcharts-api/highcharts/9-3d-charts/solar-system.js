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

        earthXZ = chart.series[0].data[6],
        earthYZ = chart.series[0].data[7],
        earthXY = chart.series[0].data[8],

        moonXZ = chart.series[0].data[9],
        moonYZ = chart.series[0].data[10],
        moonXY = chart.series[0].data[11];
        
        eX = 5 + Math.cos(t / 16) * 3,
        eY = 5,
        eZ = 5 + Math.sin(t / 16) * 3,
        mX = eX + Math.cos(t / 3) * 0.85,
        mY = 5,
        mZ = eZ + Math.sin(t / 3) * 0.85;

  earth.update([eX, eY, eZ], false);
  moon.update([mX, mY, mZ], false);

  earthXZ.update([eX, 0, eZ], false);
  earthYZ.update([0, 5, eZ], false);
  earthXY.update([eX, 5, 10], false);

  moonXZ.update([mX, 0, mZ], false);
  moonYZ.update([0, 5, mZ], false);
  moonXY.update([mX, 5, 10], false);

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
      color: gradientColor('yellow'),
      marker: { radius: 20, symbol: 'circle' }
    }, {
      name: 'earth',
      x: 5, y: 5, z: 5,
      color: gradientColor('blue'),
      marker: { radius: 14, symbol: 'circle' }
    }, {
      name: 'moon',
      x: 5, y: 5, z: 5,
      color: gradientColor('gray'),
      marker: { radius: 7, symbol: 'circle' }
    }, {
      name: 'sun-xz',
      x: 5, y: 0, z: 5,
      color: 'yellow',
      marker: { radius: 20, symbol: 'circle' }
    }, {
      name: 'sun-yz',
      x: 0, y: 5, z: 5,
      color: 'yellow',
      marker: { radius: 20, symbol: 'circle' }
    }, {
      name: 'sun-xy',
      x: 5, y: 5, z: 10,
      color: 'yellow',
      marker: { radius: 20, symbol: 'circle' }
    }, {
      name: 'earth-xz',
      x: 5, y: 0, z: 5,
      color: 'blue',
      marker: { radius: 14, symbol: 'circle' }
    }, {
      name: 'earth-yz',
      x: 0, y: 5, z: 5,
      color: 'blue',
      marker: { radius: 14, symbol: 'circle' }
    }, {
      name: 'earth-xy',
      x: 5, y: 5, z: 10,
      color: 'blue',
      marker: { radius: 14, symbol: 'circle' }
    }, {
      name: 'moon-xz',
      x: 5, y: 0, z: 5,
      color: 'gray',
      marker: { radius: 7, symbol: 'circle' }
    }, {
      name: 'moon-yz',
      x: 0, y: 5, z: 5,
      color: 'gray',
      marker: { radius: 7, symbol: 'circle' }
    }, {
      name: 'moon-xy',
      x: 5, y: 5, z: 10,
      color: 'gray',
      marker: { radius: 7, symbol: 'circle' }
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
      }
    }
  }
});

console.log(Highcharts);