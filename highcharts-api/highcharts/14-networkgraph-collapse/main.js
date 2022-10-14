function toggleNode(node, expand = undefined) {
  if (expand === undefined) {
    toggleNode(node, node.collapsed);
    return;
  }

  const display = expand ? 'block' : 'none';
  node.linksFrom.forEach(link => {
    link.graphic.css({ display });
    link.toNode.graphic.css({ display });
    link.toNode.dataLabel.css({ display });
    if (!expand) {
      toggleNode(link.toNode, false);
    }
  });
  node.collapsed = !expand;
}

Highcharts.chart('container', {
  chart: {
    type: 'networkgraph',
    marginTop: 80,
    events: {
      load: function () {
        toggleNode(this.series[0].nodes[0], false);
      }
    }
  },
  tooltip: {
    enabled: false
  },
  series: [{
    marker: {
      radius: 13
    },
    states: {
      inactive: {
        enabled: false
      },
      hover: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: true,
      linkFormat: '',
      allowOverlap: true
    },
    data: [
      ['Mueed', 'son'],
      ['Mueed', 'spouse'],
      ['Mueed', 'Brother'],
      ['Mueed', 'Sister'],
      ['Mueed', 'Mother'],
      ['Mueed', 'Father'],
      ['Mueed', 'Brotherinlaw'],
      ['Mueed', 'motherinlaw'],
      ['Father', 'anwar'],
      ['Brotherinlaw', 'shahzob'],
      ['Brotherinlaw', 'nabeel']
    ],
    point: {
      events: {
        click: function () {
          toggleNode(this);
        }
      }
    }
  }]
});