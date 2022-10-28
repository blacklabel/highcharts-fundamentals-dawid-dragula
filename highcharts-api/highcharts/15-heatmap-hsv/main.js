let val = 0.8;
let vParam = false;

const valueLabel = document.getElementById('parameter-value'),
      slider = document.getElementById('slider'),
      sRadio = document.getElementById('s-radio'),
      vRadio = document.getElementById('v-radio');

function hsvToRgb(h, s, v) {
  const i = Math.floor(h * 6),
        f = h * 6 - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s);

  let r, g, b;
  
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return [ Math.round(r * 255),Math.round(g * 255), Math.round(b * 255) ];
}

function genSeries(width, height) {
  let data = []
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const H = j / (width - 1),
            S = i / (height - 1),
            rgb = `rgb(${hsvToRgb(H, vParam ? val : S, vParam ? S : val).join(', ')})`;
      data.push({
        x: H * 360, y: S,
        value: 1,
        color: rgb
      });
    }
  }
  return {
    colsize: 360 / (width - 1),
    rowsize: 1 / (height - 1),
    data: data
  };
}

const chart = Highcharts.chart('container', {
  chart: {
    type: 'heatmap',
    events: {
      load: function() {
        const chart = this;
        chart.addSeries(genSeries(30, 30));
      }
    },
    height: 721,
    width: 700
  },
  title: {
    text: 'Heatmap colors in HSV'
  },
  tooltip: {
    enabled: false
  },
  legend: {
    enabled: false
  },
  xAxis: {
    title: {
      text: 'H'
    }
  },
  yAxis: {
    title: {
      text: 'S'
    }
  }
});

function chartUpdate() {
  chart.series[0].update(genSeries(30, 30), false);
  chart.redraw(false);
}

slider.addEventListener('input', () => {
  val = slider.value / 100.0;
  valueLabel.innerHTML = val;
});

slider.addEventListener('change', () => chartUpdate());
  

sRadio.addEventListener('change', () => {
  vParam = false;
  chartUpdate();
});

vRadio.addEventListener('change', () => {
  vParam = true;
  chartUpdate();
});