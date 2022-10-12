function nodeExpand(node) {
  node.linksFrom.forEach(link => {
    link.graphic.css({ display: 'block' });
    link.toNode.graphic.css({ display: 'block' });
    link.toNode.dataLabel.css({ display: 'block' });
  });
  node.collapsed = false;
}

function nodeCollapse(node) {
  node.linksFrom.forEach(link => {
    link.graphic.css({ display: 'none' });
    link.toNode.graphic.css({ display: 'none' });
    link.toNode.dataLabel.css({ display: 'none' });
    link.toNode.collapsed = true;
    nodeCollapse(link.toNode);
  });
  node.collapsed = true;
}

function toggleNode(node) {
  node.collapsed ? nodeExpand(node) : nodeCollapse(node);
}

Highcharts.chart('container', {
  chart: {
    type: 'networkgraph',
    marginTop: 80,
    events: {
      load: function () {
        nodeCollapse(this.series[0].nodes[0]);
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