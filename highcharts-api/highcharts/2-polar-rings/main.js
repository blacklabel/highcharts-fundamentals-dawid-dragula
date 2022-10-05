const data = Array.from({ length: 9 }, () => Math.round(Math.random() * 10));

Highcharts.chart("container", {
  chart: {
    polar: true,
    events: {
      load: function () {
        const yAxis = this.yAxis[0];

        this.customCircle = this.renderer
          .circle()
          .attr({
            stroke: "blue",
            "stroke-width": 3,
            fill: "none",
          })
          .add();
        this.customCircle.value = Math.random();

        yAxis.update({
          max: yAxis.dataMax * 2,
          tickInterval: (yAxis.dataMax * 2) / 5,
          plotLines: [
            {
              dashStyle: "dash",
              width: 3,
              color: "#2a0",
              value: yAxis.dataMax * 1.5,
            },
          ],
        });

        yAxis.addPlotLine({
          width: 3,
          color: "red",
          value: yAxis.dataMax * Math.random() * 2,
        });
      },
      redraw: function () {
        const yAxis = this.yAxis[0];

        this.customCircle.attr({
          cx: this.plotSizeX / 2 + this.plotLeft,
          cy: this.plotSizeY / 2 + this.plotTop,
          r: yAxis.toPixels(this.customCircle.value * yAxis.dataMax * 2, true),
        });
      },
    },
  },
  title: {
    text: "",
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar"],
  },
  yAxis: {
    title: "",
  },
  series: [
    {
      type: "column",
      name: "Tokyo",
      data: data.slice(0, 3),
    },
    {
      type: "column",
      name: "New York",
      data: data.slice(3, 6),
    },
    {
      type: "column",
      name: "London",
      data: data.slice(6, 9),
    },
  ],
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        formatter: function () {
          return this.series.yAxis.dataMax == this.y ? "max" : "";
        },
      },
    },
  },
});
