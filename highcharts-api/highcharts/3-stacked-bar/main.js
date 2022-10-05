const data = Array.from(
  { length: 16 },
  () => Math.round(Math.random() * 15) * 5
);

Highcharts.chart("container", {
  chart: {
    type: "bar",
    spacingTop: 50,
    events: {
      load: function () {
        this.customLabels = [];
        this.customLabels.push(
          this.renderer
            .text()
            .attr({
              text: "Issue",
              "font-weight": "bold",
              x: 10,
              y: this.spacing[0] - 16,
            })
            .add(),

          this.renderer
            .text()
            .attr({
              text: "Record Count",
              "font-weight": "bold",
              x: this.plotLeft + 10,
              y: this.spacing[0] - 16,
            })
            .add(),

          this.renderer
            .text()
            .attr({
              text: "Action",
              "font-weight": "bold",
              x: this.plotLeft + 200,
              y: this.spacing[0] - 16,
            })
            .add()
        );
      },
      redraw: function () {
        console.log("redraw");
      },
    },
  },
  title: {
    text: "",
  },
  xAxis: {
    categories: ["Data", "Emails", "Duplicates", "Support"],
    gridLineWidth: 1,
    lineWidth: 0,
  },
  yAxis: {
    title: {
      text: "Amount",
    },
    stackLabels: {
      enabled: true,
      formatter: function () {
        return `${this.total} K`;
      },
    },
    gridLineWidth: 0,
    events: {
      setExtremes: function () {
        console.log("set extremes");
      },
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      stacking: "normal",
    },
  },
  series: [
    {
      data: data.slice(0, 4),
    },
    {
      data: data.slice(4, 8),
    },
    {
      data: data.slice(8, 12),
    },
    {
      data: data.slice(12, 16),
    },
  ],
});
